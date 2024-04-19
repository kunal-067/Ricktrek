import { getTreeNodes } from "@/lib/backendFunctions/referral";
import { User } from "@/lib/models/user";
import { connectDb } from "@/utils/api/dbconnect";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

await connectDb();


export async function GET(req){
    try{
        const header = headers();
        const userId = header.get('userId');

        const user = await User.findById(userId, {_id:1, name:1, leftChild:1, rightChild:1});

        if(!user){
            return NextResponse.json({msg:'invalid user, may be server error so try later'},{status:404})
        }

        const tree = await getTreeNodes(user)
        return NextResponse.json({msg:'successfull', tree})
    }catch(err){
        console.error('error in getting referrals', err.message);
        return NextResponse.json({msg:'internal server error ! please try later', error:err.message}, {status:500})
    }
}