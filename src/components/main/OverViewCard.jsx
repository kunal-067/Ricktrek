
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formattedDateTime } from "@/utils/time"
import { Check, CheckCheck, Copy } from 'lucide-react'
import { useState } from "react"
import QRcode from 'react-qr-code'


function OverViewCard({ className, name, referralCode, avatar, registrationDate }) {
    const [copied, setCopied] = useState('');
    async function copyText(text, i) {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(i);
            setTimeout(()=>setCopied(''), 1000)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={`bg-[#fff] m-1 p-3 px-4 ${className}`}>

            <div className="border-b-[1px] py-2 pb-4 mb-4 flex justify-between">
                <h2 className='text-[#6BBFE6] font-medium text-[17px]'>Account Overview</h2>
                <Badge className={'bg-green-600 rounded-xl px-3 py-[2.5px]'}>
                    Active
                </Badge>
            </div>

            <div>
                <div className="flex justify-between items-center mb-6 pb-1">
                    <Avatar className='size-20'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className=" flex justify-center w-full">

                        <QRcode value={'hey'} size={160} />
                    </div>
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="registration" className="text-sm font-mono font-medium text-gray-600">Registered At:</label>

                    <input disabled={true} className="pb-2 rounded-bl-md w-full" type="text" name="registration" placeholder="User Name" value={formattedDateTime(registrationDate).date || '20 Nov 2023'} />
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="registration" className="text-sm font-mono font-medium text-gray-600">Name:</label>

                    <input disabled={true} className="pb-2 rounded-bl-md w-full" type="text" name="registration" placeholder="User Name" value={name || 'Demo'} />
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="registration" className="text-sm font-mono font-medium text-gray-600">Referral Code:</label>

                    <div className="flex justify-between">
                        <input disabled={true} className="bg-gray-300 pl-2 rounded-bl-md w-full" type="text" name="registration" placeholder="Referral code" value={referralCode || 'DEMO@@3'} />
                        <span className={`${copied == 1 ? 'bg-green-600' : 'bg-blue-600'} p-2 rounded-r-md`} onClick={() => copyText(referralCode, 1)}>
                            {copied == 1 ? <CheckCheck className="text-[#fff] size-5" /> :
                                <Copy className="text-[#fff] size-5" />}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col mb-4">
                    <label htmlFor="registration" className="text-sm font-mono font-medium text-gray-600">Referral Link:</label>

                    <div className="flex justify-between">
                        <input disabled={true} className="bg-gray-300 pl-2 rounded-bl-md w-full" type="text" name="registration" placeholder="Referral Link" value={`https://omni-mlm.vercel.app/signup?ref=${referralCode || 'null'}`} />
                        <span className={`${copied == 2 ? 'bg-green-600' : 'bg-blue-600'} p-2 rounded-r-md`} onClick={() => copyText(`https://omni-mlm.vercel.app/signup?ref=${referralCode || 'null'}`, 2)}>
                            {copied == 2 ? <CheckCheck className="text-[#fff] size-5" /> :
                                <Copy className="text-[#fff] size-5" />}
                        </span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default OverViewCard