import { connectDb } from "@/utils/api/dbconnect";
import mongoose from "mongoose" ;

await connectDb();
const couponSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount:{
        type:Number,
        required:true
    },
    upi:String,
    quantity:Number,
    status:{
        type:String,
        enum:['pending', 'approved', 'declined'],
        default:'pending'
    },
    cType:{
        type:String,
        enum:['General', 'Bounded'],
        default:'General'
    },
    royalcount:{
        type:Number,
        default:0
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
