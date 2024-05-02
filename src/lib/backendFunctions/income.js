import {
    Coupon
} from "../models/coupon";
import {
    User
} from "../models/user";

export const matchingIncome = async (userId, quantity, amount, couponId, refName) => {
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
            const cvIncrement = (amount, quantity) => {
                if (amount == 10000) {
                    return 50 * quantity;
                } else if (amount == 1000) {
                    return 5 * quantity;
                } else {
                    return 0; 
                }
            };

            const increaseCvBy = cvIncrement(amount, quantity);
            sponsor.leftCv += increaseCvBy;
            sponsor.leftsCoupon.push({
                user: userId,
                amount,
                couponId,
                quantity
            });

            if (cvIncrement != 0) {
                sponsor.history.push({
                    msg: `You got ${increaseCvBy} cv in your left group from ${refName}`,
                    hisType: 'cv-increment',
                    createdAt: Date.now()
                })
            }

        } else if (sponsor.rightChild?.equals(userId)) {
            const cvIncrement = (amount, quantity) => {
                if (amount == 10000) {
                    return 50 * quantity;
                } else if (amount == 1000) {
                    return 5 * quantity;
                } else {
                    return 0;
                }
            };
            const increaseCvBy = cvIncrement(amount, quantity);
            sponsor.rightCv += increaseCvBy ;
            sponsor.rightsCoupon.push({
                user: userId,
                amount,
                couponId,
                quantity
            });

            if (cvIncrement != 0) {
                sponsor.history.push({
                    msg: `You got ${increaseCvBy} cv in your right group from ${refName}`,
                    hisType: 'cv-increment',
                    createdAt: Date.now()
                })
            }
        }

        await sponsor.save();
        await matchingIncome(sponsor._id, quantity, amount, couponId, refName)

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
                user: user._id,
                status: 'approved'
            });
            const coupons1000 = userCoupons.filter(coupon => coupon.amount == 1000);
            const coupons10000 = userCoupons.filter(coupon => coupon.amount == 10000);

            const couponCount = coupons1000.reduce((acrr, curr) => {
                if (curr.royalCount >= 30) {
                    return acrr + 0
                }
                return acrr + curr.quantity;
            }, 0)

            const couponCount2nd = coupons10000.reduce((acrr, curr) => {
                if (curr.royalCount >= 30) {
                    return acrr + 0
                }
                return acrr + curr.quantity;
            }, 0)

            let royality = 0;
            if(User.find({referredBy: user.referralCode}).length >= 5){
                royality += couponCount * 1000 * 10;
            }else if (user.leftChild && user.rightChild) {
                royality += couponCount * 1000 * 0.01;
            } else {
                royality += couponCount * 1000 * 0.005;
            }

            if(User.find({referredBy: user.referralCode}).length >= 5){
                royality += couponCount2nd * 10000 * 10;
            }else if (user.leftChild && user.rightChild) {
                royality += couponCount2nd * 10000 * 0.01;
            } else {
                royality += couponCount2nd * 10000 * 0.005;
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
                if (coupon.royalCount >= 30) return;

                coupon.royalCount += 1;
                await coupon.save();
            })
            coupons10000.map(async coupon => {
                if (coupon.royalCount >= 30) return;

                coupon.royalCount += 1;
                await coupon.save();
            })

            if (user.leftsCoupon.find(coupon => coupon.amount == 10000) && user.rightsCoupon.find(coupon => coupon.amount == 10000)) {
              if (userCoupons.find(coupon => coupon.amount == 10000)) {
                    user.balance += 3000;
                    user.earnings += 3000;
                    user.history.push({
                        msg: `You got ₹3000 as Matching income`,
                        hisType: 'matching',
                        createdAt: Date.now()
                    })
                } else {
                    user.history.push({
                        msg: `You missed ₹3000 , a match created in your team`,
                        hisType: 'matching-fail',
                        createdAt: Date.now()
                    })
                }
            }

            if (user.leftsCoupon.find(coupon => coupon.amount == 1000) && user.rightsCoupon.find(coupon => coupon.amount == 1000)) {
                if (userCoupons.find(coupon => coupon.amount == 10000) || userCoupons.find(coupon => coupon.amount == 1000)) {
                    user.balance += 300;
                    user.earnings += 300;
                    user.history.push({
                        msg: `You got ₹300 as Matching income`,
                        hisType: 'matching',
                        createdAt: Date.now()
                    })
                } else {
                    user.history.push({
                        msg: `You missed ₹300 , a match created in your team`,
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
                        msg: `You missed ₹100 , a match created in your team`,
                        hisType: 'matching-fail',
                        createdAt: Date.now()
                    })
                }
            }

            user.leftsCoupon = [];
            user.rightsCoupon = [];

            await user.save();
        })

    } catch (error) {
        throw new Error("Error in couponClosing function : " + error.message)
    }
}