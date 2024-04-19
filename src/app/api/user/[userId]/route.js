import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const {userId} = params;
    try {
        const user = await User.findById(userId,{
            _id:1,
            name:1,
            email: 1,
            phone:1,
            rank:1
        })

        if(!user){
            return NextResponse.json({msg:'User not found pls try later'}, {status:404})
        }

        return NextResponse.json({msg:'successfull', user});
    } catch (error) {
       console.log('user err in dynamic', error) 
       return NextResponse.json({msg:'Internal server error', error:error.message}, {status:500})
    }
}