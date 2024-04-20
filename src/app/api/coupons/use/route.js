import { Coupon } from "@/lib/models/coupon";
import { User } from "@/lib/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const header = headers();
        const userId = header.get('userId');
        const {amount, couponId} = await req.json();
        const user = await User.findById(userId);

        if(!user) NextResponse.json({msg:'Invalid user ! try aagain'}, {status:404});
        const coupon = await Coupon.findById(couponId);
        if(!coupon) NextResponse.json({msg:'Invalid coupon ! try later'}, {status:404});

        user.balance2 += (coupon.amount*1.2);
        await coupon.deleteOne();
        await user.save();

        return NextResponse.json({msg:'Coupon converted in balance successfully!'})
    } catch (error) {
        console.error('[POST] /api/coupons/use', error.message);
        return NextResponse.json({msg:'Something went wrong ! try again later', error:error.message}, {status:500})
    }
}