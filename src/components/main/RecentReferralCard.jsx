import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "../ui/badge"
import { useContext } from "react"
import { UserContext } from "@/app/context/Context"

function RecentReferralCard({ className }) {
    const {directRefs} = useContext(UserContext);
    if(!directRefs){
        return(
            <>Loading...</>
        )
    }
    return (
        <div className={`${className} bg-[#fff] m-1 p-4`}>
            <h2 className="text-[#6BBFE6] font-medium text-[17px] mb-3 pb-1 border-b-[2px]">Recent Referrals</h2>
            {
                directRefs.length > 0 ? (directRefs.map(ref=>{
                    return(
                        <RefCard key={ref._id} status={ref.status} name={ref.name} email={ref.phone}/>
                    )
                })) : (
                    <div className="flex justify-center items-center size-full">
                        No referrals
                    </div>
                )
            }
        </div>
    )
}

function RefCard({name, email, status}) {
    return (
        <div className="flex mb-1 bg-slate-200 p-2 rounded-sm">
            <Avatar className='size-12'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex justify-between w-full pl-4">
                <div>
                    <p>{name || 'Demo'}</p>
                    <p>{email || 'Demo@mail.com'}</p>
                </div>
                <Badge className={`float-end ${status == 'Active' ? 'bg-green-600' : 'bg-red-600'} h-fit`}>{status}</Badge>
            </div>
        </div>
    )
}
export default RecentReferralCard