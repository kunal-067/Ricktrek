import { User } from "@/lib/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        const header = headers();
        const userId = header.get('userId');

        const user = await User.findById(userId);
        if(!user) return NextResponse.json({msg:'Invalid user'}, {status:404});

        return NextResponse.json({msg:'successfull', history:user.history});
    }catch(err){
        console.log('history api error', err.message)
        return NextResponse.json({msg:'Internal server error'}, {status:500})
    }
}

export async function PATCH(req){
    try {
        const header = headers();
        const userId = header.get('userId');

        const user = await User.findById(userId);

        user.history.map(elem=>{
            elem.status = 'seen'
        })
        
        await user.save();

        return NextResponse.json({msg:'successfull', history:user.history})
    } catch (err) {
        console.log('history api error', err.message)
        return NextResponse.json({msg:'Internal server error'}, {status:500})
    }
}