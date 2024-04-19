'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { formattedDateTime } from '@/utils/time';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";



function Page() {
    const {toast} = useToast();
    const [coupType, setCoupType] = useState('');
    const [coupName, setCoupName] = useState('');
    const [amount, setAmount] = useState('');
    const [period, setPeriod] = useState('');
    const [count, setCount] = useState('');

    function createCoupon(){
      toast({
        title:'comming soon ...'
      })
    }

    return (
        <>
            <div className="flex my-2">
                <Dialog>
                    <DialogTrigger className='px-6 w-52 h-9 rounded-md text-white bg-green-700 hover:bg-gray-400'>
                        Create
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='mb-2'>Create a new coupon:</DialogTitle>
                            <DialogDescription>
                                <Select className='mb-4' onValueChange={(value) => setCoupType(value)}>
                                    <SelectTrigger className="mb-4">
                                        <SelectValue placeholder="Choose a coupon type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="time">Auto Closing</SelectItem>
                                        <SelectItem value="closing">Manual Closing</SelectItem>
                                        <SelectItem value="count">Count Closing</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Label>Name:</Label>
                                <Input value={coupName} className='mb-2' onChange={e=>setCoupName(e.target.value)} placeholder='Coupon Name' />

                                <Label>Amount:</Label>
                                <Input value={amount} type='number' onChange={e=>setAmount(e.target.value)} className='mb-2' placeholder='Enter Coupon Price' />

                                {coupType == 'time' && <>
                                    <Label>Running Time:</Label>
                                    <Input value={period} type='number' onChange={e=>setPeriod(e.target.value)} className='mb-2' placeholder='Runnig time of coupon' />
                                </>}

                                {coupType == 'count' && <>
                                    <Label>Quantity:</Label>
                                    <Input value={count} type='number' onChange={e=>setCount(e.target.value)} className='mb-2' placeholder='Quantity of coupon' />
                                </>}

                                <Button onClick={createCoupon} className='hover:bg-gray-400 float-right mt-4 w-48'>Create</Button>

                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <DataTable/>
        </>


    )
}

function DataTable() {
    const [coupons, setCoupons] = useState([]);
    const { toast } = useToast()
    
    useEffect(()=>{
    },[])

    function closeCoupon(id, type){
        toast({
            title:'Comming soon...'
        })
    }
    return (
        <div className='border-2 rounded-sm'>
            <Table>
                {/* ====================== table head data ========================= */}
                <TableHeader>
                    <TableRow className="bg-slate-50">
                        <TableHead className="w-[210px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>count</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {/* ================= Table body data ============== */}
                <TableBody>

                    {coupons.map((coupon, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{coupon._id.toString()}</TableCell>
                                <TableCell>{coupon.name}</TableCell>
                                <TableCell>{coupon.type}</TableCell>
                                <TableCell>{coupon.type == 'count' ? coupon.count : 'NA'}</TableCell>
                                <TableCell >{coupon.amount}</TableCell>
                                <TableCell>{formattedDateTime(coupon.createdAt).date}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => closeCoupon(coupon._id, coupon.type)} className='bg-slate-600 mr-1'>Close</Button>
                                    <Button onClick={() => alert('comming soon')} className='bg-red-700 mr-1'>Close & delete</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default Page