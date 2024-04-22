import {
    Coupon
} from "../models/coupon";
import {
    User
} from "../models/user";

export const matchingIncome = async (userId, quantity, amount, couponId) => {
    try {
        const sponsor = await User.findOne({
            $or: [{
                leftChild: userId
            }, {
                rightChild: userId
            }]
        });

        if (!sponsor) {
            return;
        }

        if (sponsor.leftChild?.equals(userId)) {
            sponsor.leftCv += 5*quantity;
            sponsor.leftsCoupon.push({
                user: userId,
                amount,
                couponId,
                quantity
            });

        } else if (sponsor.rightChild?.equals(userId)) {
            sponsor.rightCv += 5*quantity;
            sponsor.rightsCoupon.push({
                user: userId,
                amount,
                couponId,
                quantity
            });

        }

        await sponsor.save();
        await matchingIncome(sponsor._id, quantity, amount, couponId)

    } catch (e) {
        console.log("Error in income function : " + e);
        throw new Error("Error in income function : " + e.message)
    }
}

export const couponClosing = async () => {
    try {
        const users = await User.find({});


        users.forEach(async user => {
            // console.log(user)
            const userCoupons = await Coupon.find({
                user: user._id, status: 'approved'
            });
            const coupons1000 = userCoupons.filter(coupon => coupon.amount == 1000);
           
            const couponCount = coupons1000.reduce((acrr, curr) => {
                if (curr.royalCount >= 30) {
                    return acrr + 0
                }
                return acrr + curr.quantity;
            }, 0)

            let royality;
            if (user.leftChild && user.rightChild) {
                royality = couponCount * 1000 * 0.01;
            } else {
                royality = couponCount * 1000 * 0.005;
            }
            user.balance += royality;
            user.earnings += royality;
            if (royality >= 0) {
                user.history.push({
                    msg: `You earned ₹${royality} as royality`,
                    hisType: 'royality',
                    history: Date.now()
                })
            }

            coupons1000.map(async coupon => {
                if(coupon.royalCount >= 30) return ;

                coupon.royalCount += 1;
                await coupon.save;
            })

            if (user.leftsCoupon.find(coupon => coupon.amount == 1000) && user.rightsCoupon.find(coupon => coupon.amount == 1000)) {
                if (userCoupons.find(coupon => coupon.amount == 1000)) {
                    user.balance += 300;
                    user.earnings += 300;
                    user.history.push({
                        msg: `You got ₹300 as Matching income`,
                        hisType: 'matching',
                        createdAt: Date.now()
                    })
                } else {
                    user.history.push({
                        msg: `You have ₹300 , a match created in your team`,
                        hisType: 'matching-fail',
                        createdAt: Date.now()
                    })
                }
            }

            if (user.leftsCoupon.find(coupon => coupon.amount == 300) && user.rightsCoupon.find(coupon => coupon.amount == 300)) {
                if (userCoupons.find(coupon => coupon.amount == 1000) || userCoupons.find(coupon => coupon.amount == 300)) {
                    user.balance += 100;
                    user.earnings += 100;
                    user.history.push({
                        msg: `You got ₹100 as Matching income`,
                        hisType: 'matching',
                        createdAt: Date.now()
                    })
                } else {
                    user.history.push({
                        msg: `You have ₹100 , a match created in your team`,
                        hisType: 'matching-fail',
                        createdAt: Date.now()
                    })
                }
            }

            user.leftsCoupon.length = 0;
            user.rightsCoupon.length = 0;

            await user.save();
        })

    } catch (error) {
        throw new Error("Error in couponClosing function : " + error.message)
    }
}