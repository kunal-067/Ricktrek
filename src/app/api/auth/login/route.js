import {
    User
} from "@/lib/models/user";
import {
    connectDb
} from "@/utils/api/dbconnect";
import {
    matchPassword
} from "@/utils/api/hashPass.util";
import { generateToken } from "@/utils/api/jwt.utils";
import next from "next";
import { cookies } from "next/headers";
import {
    NextResponse
} from "next/server";


await connectDb()
export async function POST(req) {
    try {
        const cookieStore = cookies()
        const payload = await req.json();
        const {
            email,
            phone,
            password
        } = payload;

        let user;
        if (email) {
            user = await User.findOne({
                email
            })
        } else if (phone) {
            user = await User.findOne({
                phone
            })
        }

        if(!user){
            return NextResponse.json({msg:'it seesms, no account registered with this phone no.'},{status:404})
        }
        const isPassRight = await matchPassword(password, user.password);
        if (!isPassRight) {
            return NextResponse.json({
                msg: 'incorrect password ! try again'
            },{status:400})
        }

        
        const tokenData = generateToken({
            userId: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        })

        const days = 30 * 24 * 60 * 60 * 1000;
        cookieStore.set('jwt', tokenData, {expires: Date.now() + days });
        delete user.password;
        return NextResponse.json({
            msg: 'logged in successfully',
            user
        })

    } catch (err) {
        console.error('error in user login api', err);
        return NextResponse.json({
            msg: 'internal server error ! please try later',
            error:err.message
        }, {status:500})
    }
}