'use client'
import React, { useState } from 'react'
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
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'



function Coupons() {
    return (
        <div className='px-6'>
            <div className='text-xl font-bold py-[1rem] mx-1 bg-[#fff] -mt-10 pl-4 rounded-sm shadow-md'>
                Coupons
            </div>
            <div className='mt-3 mx-1 flex flex-wrap mb-`'>
            <CouponCard amount={1000} bound={true} />
                <CouponCard amount={10000} />
                <CouponCard amount={1000} />
                <CouponCard amount={300} />
                <CouponCard amount={1000} />
                <CouponCard amount={300} />
            </div>
        </div>
    )
}

function CouponCard({ amount, bound }) {
    const [quantity, setQuantity] = useState(1);
    const [upi, setUpi] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/coupons', { upi, amount, quantity, cType:bound ? 'Bounded' : 'General' }).then(res => {
            toast({
                title: res.data.msg
            })
        }).catch(err => {
            console.log(err)
            toast({
                title: err.response?.data.msg || err.message
            })
        })
    }
    return (
        <div className='m-1 flex flex-1 bg-[#fff] rounded-sm p-2'>
            <div className='flex size-[100px] w-[120px] justify-center items-center bg-gray-200 mr-2 p-2'>
                {/* <img src="omilogo.png" alt="kl" className='w-full' /> */}
                <h2 className='font-bold'>Richtrek</h2>
            </div>
            <div className='w-full'>
                <b>Coupon {bound&&(<span className='text-sm font-medium text-yellow-600 float-right'>Bounded</span>)}</b>
                <p>₹{amount}</p>
                <div className='flex items-center justify-end w-full'>

                    <Dialog>
                        <DialogTrigger className='flex justify-center items-center text-white size-9 bg-purple-700 p-2 rounded-xl float-right mr-2'>
                            <CircleHelp />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Reedem coupon</DialogTitle>
                                <DialogDescription>
                                    Buy this coupon for activating your account, this can be used for doing various things...
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>


                    <AlertDialog>
                        <AlertDialogTrigger className='bg-green-700 rounded-sm flex justify-center items-center text-white px-3 py-[5px]'> Buy </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle className='text-center'>Reedem Coupon Checkout</AlertDialogTitle>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col mb-2'>
                                    <label htmlFor="upi" className='float-left text-gray-700'>Upi:</label>
                                    <input className='bg-gray-100 font-medium p-2 rounded-sm' placeholder='Enter Upi through which you will do payment' required type="text" value={upi} onChange={(e) => setUpi(e.target.value)} />
                                </div>

                                <div className='flex flex-col mb-2'>
                                    <label htmlFor="price" className='float-left text-gray-700'>Quantity:</label>
                                    <input className='bg-gray-100 font-medium p-2 rounded-sm' placeholder='Enter quantity' requiredi type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>

                                <div className='flex flex-col mb-4'>
                                    <label htmlFor="price" className='float-left text-gray-700'>Price</label>
                                    <input disabled={true} className='bg-gray-100 font-medium p-2 rounded-sm' placeholder='amount' type="text" value={`₹${quantity * amount}`} />
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction type='submit'>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </AlertDialogContent>
                    </AlertDialog>



                </div>
            </div>
        </div>
    )
}

export default Coupons