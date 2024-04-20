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
            sponsor.leftCv += 5;
            sponsor.leftsCoupon.push({
                user: userId,
                amount,
                couponId,
                quantity
            });

        } else if (sponsor.rightChild?.equals(userId)) {
            sponsor.rightCv += 5;
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

            if (user.leftsCoupon.find(coupon => coupon.amount == 1000) && user.rightsCoupon.find(coupon => coupon.amount == 1000)) {
                user.balance += 300;
                user.earnings += 300;
            }

            if (user.leftsCoupon.find(coupon => coupon.amount == 300) && user.rightsCoupon.find(coupon => coupon.amount == 300)) {
                user.balance += 100;
                user.earnings += 100;
            }

            user.leftsCoupon.length = 0;
            user.rightsCoupon.length = 0;

            await user.save();
        })

    } catch (error) {
        throw new Error("Error in couponClosing function : " + error.message)
    }
}