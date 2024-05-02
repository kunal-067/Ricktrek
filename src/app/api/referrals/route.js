import { getTreeNodes } from "@/lib/backendFunctions/referral";
import { User } from "@/lib/models/user";
import { connectDb } from "@/utils/api/dbconnect";
import { headers } from "next/headers";
// import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

await connectDb();


export async function GET(req){
    try{
        // const para = useSearchParams();
        const url = new URL(req.url);
        const query = new URLSearchParams(url.searchParams)
      
        const header = headers();
        let userId ;
        const queryU = query.get('userId') ;
        if(queryU && queryU != 'null'){
            userId = queryU;
        }else {
            userId = header.get('userId');
        }
        
        const user = await User.findById(userId, {_id:1, phone:1, name:1, leftChild:1, rightChild:1});
        if(!user){
            return NextResponse.json({msg:'invalid user, may be server error so try later'},{status:404})
        }

        const tree = await getTreeNodes(user)
        return NextResponse.json({msg:'successfull', tree, lastPage: tree.length < 21, length:tree.length})
    }catch(err){
        console.error('error in getting referrals', err);
        return NextResponse.json({msg:'internal server error ! please try later', error:err.message}, {status:500})
    }
}