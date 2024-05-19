import { User } from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const users = await User.find({}, {name:1, balance: 1});
        return NextResponse.json(users)
    } catch (error) {
        console.error(error);
        return NextResponse.json('error')
    }
}