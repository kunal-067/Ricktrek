import { User } from "@/lib/models/user";
import { Withdraw } from "@/lib/models/withdraw";
import { connectDb } from "@/utils/api/dbconnect";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

await connectDb();
//get admin(all) + user withdrawls
export async function GET(req){
    // return NextResponse.json({msg:'hola hoel'}, {status:500})
    try {
        const header = headers();
        const userId = header.get('userId');

        const user = await User.findById(userId);
        if(!user) NextResponse.json({msg:'invalid user !'}, {status:404});

        let withdrawls;
        if(user.role == 'admin'){
            withdrawls = await Withdraw.find({});
        }else{
            withdrawls = await Withdraw.find({user:userId});
        }

        return NextResponse.json({msg:'successfull', withdrawls})
    } catch (error) {
        console.error('withdrawl api error', error);
        return NextResponse.json({msg:'Internal server error !'}, {status:500})
    }
}

export async function POST(req){
    try {
        const header = headers();
        const userId = header.get('userId');

        const {upi, amount} = await req.json();
        const user = await User.findById(userId);
        if(!user) NextResponse.json({msg:'Invalid user !'}, {status:404})

        const withdraw = new Withdraw({
            user:userId,
            amount,
            upi
        });
        if(amount > user.balance){
            return NextResponse.json({msg:'Insufficient ammount'}, {status:400})
        }
        user.balance -= amount;
        if(user.balance < 0){
            return NextResponse.json({msg:'Insufficient ammount'}, {status:400})
        }
        await user.save();
        await withdraw.save();

        return NextResponse.json({msg:'withdrawl request summitted.'})
    } catch (error) {
        console.error('withdrawl api error', error);
        return NextResponse.json({msg:'Internal server error !'}, {status:500})
    }
}

//admin action
export async function PUT(req){
    try {
        const header = headers();
        const userId = header.get('userId');

        const {withdrawlId, status} = await req.json();
        const user = await User.findById(userId);
        if(!user || user.role != 'admin') NextResponse.json({msg:'you are not allowed to do this.'}, {status:400})

        const withdrawl = await Withdraw.findById(withdrawlId);
        withdrawl.status = status;
        await withdrawl.save();
        
        return NextResponse.json({msg:`withdrawl status changed to ${status} successfully`})
    } catch (error) {
        console.error('withdrawl api error', error);
        return NextResponse.json({msg:'Internal server error !'}, {status:500})
    }
}