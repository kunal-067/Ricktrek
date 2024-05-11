import { connectDb } from "@/utils/api/dbconnect";
import mongoose from "mongoose";

await connectDb();
const withdrawSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'approved', 'declined'],
        default:'pending'
    },
    upi:{
        type:String,
        required:true
    },

    approvedAt:Date,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const Withdraw = mongoose.models.Withdraw || mongoose.model('Withdraw', withdrawSchema)
