import { addTreeData, generateReferralCode } from "@/lib/backendFunctions/referral";
import { User } from "@/lib/models/user";
import { connectDb } from "@/utils/api/dbconnect";
import { hashPassword } from "@/utils/api/hashPass.util";
import { generateToken } from "@/utils/api/jwt.utils";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

await connectDb();

export async function GET(req){
    try{
        const header = headers();
        const userId = header.get('userId');

        const user = await User.findById(userId, {
            name:1,
            phone:1,
            email:1,
            referralCode:1,
            position:1,
            rank:1,
            balance2:1,
            balance:1,
            earnings:1,
            rightCv:1,
            leftCv:1,
            cvCycle:1,
            currentCycle:1,
            registeredAt:1,
            leftChild:1,
            rightChild:1
        });

        if(!user){
            return NextResponse.json({msg:'invalid user, may be server error so try later'},{status:404})
        }

        return NextResponse.json({msg:'successfull', user})
    }catch(err){
        console.error('error in getting user api', err);
        return NextResponse.json({msg:'internal server error ! please try later', error:err.message}, {status:500})
    }
}

export async function POST(req){
    try{
        const cookieStore = cookies()
        const payload = await req.json();
        const {name,phone,password,referredBy,position} = payload;
        if(phone){
            const user = await User.findOne({phone})
            if(user){
                return NextResponse.json({msg:'this phone no. has already registered with another account, pls login'}, {status:402})
            }
        }

        const hashedPassword = await hashPassword(password);
        const referralCode = await generateReferralCode();
        const user = new User({
            name,
            phone,
            password:hashedPassword,
            referralCode,
            referredBy,
            position: position ? position : null
        });

      
        if(referredBy){
            const sponsor = await User.findOne({referralCode:referredBy});
            if(!sponsor){
                return NextResponse.json({msg:'Sponsor not found! May be wrong referral code'}, {status:404})
            }

            await addTreeData(sponsor, position, user._id)
        }

        await user.save();
        const tokenData = generateToken({userId:user._id, name, phone})
        
        const days = 30 * 24 * 60 * 60 * 1000;
        cookieStore.set('jwt', tokenData, {expires: Date.now() + days})
        delete user.password;
        return NextResponse.json({
            msg:'signup successfull',
            user
        })

    }catch(err){
        console.error('error in posting user api', err);
        return NextResponse.json({msg:'internal server error ! please try later', error:err.message}, {status:500})
    }
}

export async function PUT(req){
    try{
        const header = headers();
        const userId = header.get('userId');

        const {data} = await req.json();

        const user = await User.findByIdAndUpdate(userId, data)

        if(!user){
            return NextResponse.json({msg:'invalid user, may be server error so try later'}, {status:404})
        }
        return NextResponse.json({msg:'profile updated successfully'})

    }catch(err){
        console.error('error in updating user api', err);
        return NextResponse.json({msg:'internal server error ! please try later', error:err.message}, {status:500})
    }
}

export async function DELETE(req){
    try{
        const header = headers();
        const userId = header.get('userId');

        const user = await User.findByIdAndDelete(userId)

        if(!user){
            return NextResponse.json({msg:'invalid user, may be server error so try later'}, {status:404})
        }

        return NextResponse.json({msg:'your account has been deleted successfully'})
    }catch(err){
        console.error('error in deleting user api', err);
        return NextResponse.json({msg:'internal server error ! please try later', error:err.message}, {status:500})
    }
}

// create patch request
