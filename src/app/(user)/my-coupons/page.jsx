'use client'
import React, { useContext, useState } from 'react'
import { CircleHelp } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from '@/components/ui/use-toast'
import { UserContext } from '@/app/context/Context'



function Coupons() {
    const {coupons} = useContext(UserContext);
    
    if(!coupons){
        return(
            <>Loading...</>
        )
    }
    return (
        <div className='px-6'>
            <div className='text-xl font-bold py-[1rem] mx-1 bg-[#fff] -mt-10 pl-4 rounded-sm shadow-md'>
                Coupons
            </div>
            <div className='mt-3 mx-1 flex flex-wrap mb-`'>
                {
                    coupons.map(coupon=>{
                        return(
                            <CouponCard key={coupon._id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

function CouponCard() {
    const handleSubmit = (e) => {
        e.preventDefault()
        toast({
            title: 'comming soon ...'
        })
    }
    return (
        <div className='m-1 flex flex-1 bg-[#fff] rounded-sm p-2'>
            <div className='flex size-[100px] w-[120px] justify-center items-center bg-gray-200 mr-2 p-2'>
                <img src="omilogo.png" alt="kl" className='w-full' />
            </div>
            <div className='w-full'>
                <b>Coupon</b>
                <p>₹1200</p>
                <div className='flex items-center justify-end w-full'>

                    <Dialog>
                        <DialogTrigger className='flex justify-center items-center text-white size-9 bg-purple-700 p-2 rounded-xl float-right mr-2'>
                            <CircleHelp />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Reedem Coupon</DialogTitle>
                                <DialogDescription>
                                    You can reedem the amount of coupon in your wallet that can be used in buying products.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>



                    <AlertDialog>
                        <AlertDialogTrigger className='bg-green-700 rounded-sm flex justify-center items-center text-white px-3 py-[5px]'> Use </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle className='text-center'>Convert Reedem Coupon</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action is not reversiable You can use this coin further for buying products.
                            </AlertDialogDescription>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleSubmit}>Convert</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>


                </div>
            </div>
        </div>
    )
}

export default Coupons