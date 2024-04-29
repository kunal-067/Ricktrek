import {
    couponClosing,
    matchingIncome
} from "@/lib/backendFunctions/income";
import {
    Coupon
} from "@/lib/models/coupon";
import {
    User
} from "@/lib/models/user";
import {
    connectDb
} from "@/utils/api/dbconnect";
import {
    headers
} from "next/headers";
import {
    NextResponse
} from "next/server";

await connectDb();
export async function GET(req) {
    try {
        const header = headers();
        const userId = header.get('userId');

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                msg: 'Invalid user ! might be server error.'
            }, {
                status: 404
            })
        }

        let coupons;
        if (user.role == 'admin') {
            coupons = await Coupon.find({})
        } else {
            coupons = await Coupon.find({
                user: userId,
                status: 'approved'
            });
        }

        return NextResponse.json({
            msg: 'successfull',
            coupons
        })

    } catch (error) {
        console.error('error in coupon api', error.message);
        return NextResponse.json({
            msg: 'Internal server error',
            error: error.message
        }, {
            status: 500
        })
    }
}

//buy coupon
export async function POST(req) {
    try {
        const header = headers();
        const userId = header.get('userId');

        const {
            upi,
            amount,
            quantity
        } = await req.json();
        if (amount < 0 || quantity <= 0) {
            return NextResponse.json({
                msg: 'invalid amount or quantity'
            }, {
                status: 400
            })
        }

        const coupon = new Coupon({
            user: userId,
            upi,
            amount,
            quantity,
        })

        await coupon.save();
        return NextResponse.json({
            msg: 'coupon bought successfully !'
        })

    } catch (error) {
        console.error('error in coupon api', error.message);
        return NextResponse.json({
            msg: 'Internal server error',
            error: error.message
        }, {
            status: 500
        })
    }
}

//admin action
export async function PUT(req) {
    try {
        const header = headers();
        const userId = header.get('userId');

        const user = await User.findById(userId);
        if (!user || user.role != 'admin') {
            return NextResponse.json({
                msg: 'You are not allowed to do this action.'
            }, {
                status: 401
            })
        }

        const {
            couponId,
            status
        } = await req.json();
        if (status == 'decline') {
            const coupon = Coupon.findByIdAndDelete(couponId);
            if (!coupon) NextResponse.json({
                msg: 'Invalid coupon !'
            }, {
                status: 404
            })

            return NextResponse.json({
                msg: 'coupon removed successfully'
            })
        }

        const coupon = await Coupon.findById(couponId);
        if (!coupon) NextResponse.json({
            msg: 'Invalid coupon !'
        }, {
            status: 404
        })
        if (coupon.status != 'pending') {
            return NextResponse.json({
                msg: 'coupon has already been approved'
            }, {
                status: 401
            });
        }

        coupon.status = status;

        const coupUser = await User.findById(coupon.user);
        coupUser.status = 'Active';
        await coupUser.save();

        await matchingIncome(coupon.user, coupon.quantity, coupon.amount, coupon._id, coupUser.name);
        await coupon.save();

        return NextResponse.json({
            msg: 'coupon status updated successfully !'
        })

    } catch (error) {
        console.error('error in coupon api', error.message);
        return NextResponse.json({
            msg: 'Internal server error',
            error: error.message
        }, {
            status: 500
        })
    }
}

//close coupon
export async function PATCH(req) {
    try {
        const header = headers();
        const userId = header.get('userId');

        const user = await User.findById(userId);
        if (!user || !user.role == 'admin') {
            return NextResponse.json({
                msg: 'You are not allowed to do this! stay in limit'
            }, {
                status: 401
            })
        }

        await couponClosing();

        return NextResponse.json({
            msg: 'coupons income updated successfully'
        });
    } catch (error) {
        console.error('error in coupon api', error.message);
        return NextResponse.json({
            msg: 'Internal server error',
            error: error.message
        }, {
            status: 500
        })
    }
}