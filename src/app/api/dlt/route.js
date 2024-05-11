import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const users = await User.find({status:'Active'}, {phone:1, name:1});
        // const users = await User.find({phone:9122874046})
        return NextResponse.json({users})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went wrong", error:error})
    }
}