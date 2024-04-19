import { User } from "@/lib/models/user";
import { connectDb } from "@/utils/api/dbconnect";
import { NextResponse } from "next/server";
await connectDb()

export async function GET(){
    const us = await User.findByIdAndDelete('hfhfsj2123')

    console.log(us)
}


export async function PUT(req){
    try {
        const payload = await req.json();
        const {userId, modifiedData} = payload;
        const user = await User.findByIdAndUpdate(userId, modifiedData);

        if(!user){
            return NextResponse.json({msg:"invalid attempt! user doesn't exists"})
        }

        return NextResponse.json({msg:'user data modified successfully'})
    } catch (error) {
        console.error('admin profile error', error);
        return NextResponse.json({msg:'internal server error! try later', error:error.message})
    }
};

export async function DELETE(req){
    try {
        const payload = await req.json();
        const {userId} = payload;
        const user = await User.findByIdAndDelete(userId);

        if(!user){
            return NextResponse.json({msg:"invalid attempt! user doesn't exists"})
        }

        return NextResponse.json({msg:'user data modified successfully'})
    } catch (error) {
        console.error('admin profile error', error);
        return NextResponse.json({msg:'internal server error! try later', error:error.message})
    }
}
