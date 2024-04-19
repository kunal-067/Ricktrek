import { User } from "@/lib/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    try {
        const {from} = req.nextUrl.searchParams?.get('from') || '';
        const header = headers();
        let userId ; 
        if(from == 'params'){
            userId = params.userId 
        }else{
            userId = header.get('userId');;
        }
        const user = await User.findById(userId);

        if(!user) NextResponse.json({msg: "User not found! try later"}, {status:404});

        const referrals = await User.find({referredBy: user.referralCode}, {_id:1, phone:1, name:1, status:1});

        return NextResponse.json({msg:'successfull', referrals:referrals.reverse()});
    } catch (error) {
        console.error("Error while fetching data! referrals userId", error.message)
        return NextResponse.json({msg:'Internal Server Error', error:error.message}, {status:500})
    }
}