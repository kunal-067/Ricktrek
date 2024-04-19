'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

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




function Coupons() {
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [coupons, setCoupons] = useState([{}]);

    const [couponsToDisplay, setCouponsToDisplay] = useState([]);
    const [pages, setPages] = useState(1);

    const [coupType, setCoupType] = useState('');

    //function forgetting all Coupons
    useEffect(() => {
        const getCoupons = async () => {
            try {
                const res = await axios.get('/api/coupons', { withCredentials: true });
                setCoupons(res.data.coupons);
            } catch (err) {
                console.log('error in getting users', err)
                toast({
                    title: "Error:",
                    description: `error in getting all users, ${err.response?.data.msg || err.message}`,
                    variant: "destructive"
                });
            }
        };

        getCoupons();
    }, []);

    // useEffect for updating usersToDisplay
    useEffect(() => {
        const startIndex = (pageNo - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        if (coupons) {
            setCouponsToDisplay(coupons.slice(startIndex, endIndex));
        }

        //for updating pages
        setPages(Math.ceil(coupons?.length / pageSize))
    }, [coupons, pageNo, pageSize]);

    //handle next and back page
    const handleNextBackPage = (i) => {
        if (i === -1) {
            setPageNo(prev => {
                if (prev - 1 !== 0) {
                    return prev - 1
                } else {
                    return 1
                }
            })
        } else {
            setPageNo(prev => {
                if (prev + 1 < pages) {
                    return prev + 1
                } else {
                    return pages
                }
            })
        }
    }

    const searchUser = (name, id) => {
        let matchingCoupons = [];
        if (name !== '') {
            matchingCoupons = coupons.filter(user => user.name.includes(name))
        } else if (id !== '') {
            matchingCoupons = coupons.filter(user => user._id.includes(id))
        }

        if (name === '' && id === '' || !name && !id) {
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setCouponsToDisplay(coupons.slice(startIndex, endIndex));
        } else {
            setCouponsToDisplay(matchingCoupons)
        }
    }

    function sendCoupon() {
        axios.patch('/api/coupons').then(res => {
            toast({
                title: res.data.msg
            })
        }).catch(err => {
            toast({
                title: err.response?.data.msg || err.message
            })
        })
    }

    const applyFilter = (filter) => {
        if (filter == 'all') {
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setCouponsToDisplay(coupons.slice(startIndex, endIndex));
            return;
        }

        let filteredData = coupons.filter(coupon => coupon.status == filter)
        setCouponsToDisplay(filteredData);
    }

    return (
        <>
            {/* =================== searching box inputs and filters ===================== */}
            <div className="flex my-4 mt-2">
                <Input type="text" placeholder="Enter Name..." className="w-96" onChange={(e) => searchUser(e.target.value)} />
                <Input type="text" placeholder="Enter Id..." className="mx-5 w-80" onChange={(e) => searchUser('', e.target.value)} />

                <Button className='ml-5 hover:bg-gray-400' onClick={sendCoupon}>Close Coupon</Button>

                <Select onValueChange={value => applyFilter(value)}>
                    <SelectTrigger className="w-[240px] ml-5">
                        <SelectValue placeholder="60 day coupon" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Coupons</SelectItem>
                        <SelectItem value="pending">Pending Coupons</SelectItem>
                        <SelectItem value="approved">Running Coupons</SelectItem>
                    </SelectContent>
                </Select>

            </div>

            <DataTable coupons={couponsToDisplay} />

            {/* ====================== pagination contents ========================== */}
            <div className="flex items-center  mt-2">
                {/* -------------------- display number -------------- */}
                <div className="text-medium text-slate-500 mr-10">
                    {`${couponsToDisplay?.length} out of ${coupons?.length || 0} displayed`}
                </div>
                {/* ---------------------- select col numbers ----------------- */}
                <Select onValueChange={(value) => setPageSize(value)}>
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>

                {/* ------------------pagination----------------- */}
                <Pagination className="w-auto mx-0 ml-[800px]">
                    <PaginationContent>
                        <PaginationItem onClick={() => handleNextBackPage(-1)}>
                            <PaginationPrevious href="#" />
                        </PaginationItem>


                        {pages > 3 ? (
                            <>
                                {pageNo > 3 ? (
                                    <>
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <PaginationItem key={index}>
                                                <PaginationLink href="#" isActive={(pageNo - index) === pageNo} onClick={() => setPageNo(pageNo - index)}>{pageNo - index}</PaginationLink>
                                            </PaginationItem>
                                        )).reverse()}
                                        {pageNo === pages ? null : (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <PaginationItem key={index}>
                                                <PaginationLink href="#" isActive={(index + 1) === pageNo} onClick={() => setPageNo(index + 1)}>{index + 1}</PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        {pageNo === pages ? null : (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {Array.from({ length: pages }).map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink href="#" isActive={(index + 1) === pageNo} onClick={() => setPageNo(index + 1)}>{index + 1}</PaginationLink>
                                    </PaginationItem>
                                ))}
                            </>
                        )}

                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => handleNextBackPage(1)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>


            </div>
        </>
    )
}

function DataTable({ coupons = [] }) {
    const { toast } = useToast();
    const [user, setUser] = useState({});

    function approveTransaction(couponId, status) {
        console.log('a1')
        axios.put('/api/coupons', { couponId, status }).then(res => {
            toast({
                title: res.data.msg
            })
        }).catch(err => {
            console.error(err);
            toast({
                title: err.response?.data.msg || err.message
            })
        })
    }

    function appendUser(id){
        axios.get(`/api/user/${id}`).then(res=>{
            setUser(res.data.user)
        }).catch(err=>{
            console.log(err)
            toast({
                title:err.response?.data.msg || err.message
            })
        })
    }

    return (
        <div className='border-2 rounded-sm'>
            <Table>
                {/* ====================== table head data ========================= */}
                <TableHeader>
                    <TableRow className="bg-slate-50">
                        <TableHead className="w-[210px]">ID</TableHead>
                        <TableHead>User Id</TableHead>
                        <TableHead>Upi</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {/* ================= Table body data ============== */}
                <TableBody>

                    {coupons.map((coupon, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{coupon._id?.toString()}</TableCell>
                                <TableCell className='underline'>
                                <Dialog>
                                    <DialogTrigger onClick={()=>appendUser(coupon.user)}>
                                         {coupon.user} 
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>
                                            User Details:
                                        </DialogTitle>
                                        <DialogDescription>
                                            <div className='mb-4'>
                                                <Label>Id:</Label>
                                                <Input disabled value={user._id} />
                                            </div>

                                            <div className='mb-4'>
                                                <Label>Name:</Label>
                                                <Input disabled value={user.name} />
                                            </div>

                                            <div className='mb-4'>
                                                <Label>Phone:</Label>
                                                <Input disabled value={user.phone} />
                                            </div>

                                            <div className='mb-4'>
                                                <Label>Email:</Label>
                                                <Input disabled value={user.email} />
                                            </div>

                                            <div className='mb-4'>
                                                <Label>Rank:</Label>
                                                <Input disabled value={user.rank} />
                                            </div>
                                        </DialogDescription>
                                    </DialogContent>

                                </Dialog>
                                </TableCell>

                                <TableCell>{coupon.upi}</TableCell>
                                <TableCell>{coupon.amount}</TableCell>
                                <TableCell>{coupon.status}</TableCell>
                                <TableCell>{formattedDateTime(coupon.createdAt).date}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => approveTransaction(coupon._id, 'approved')} className='bg-slate-600 mr-1'>Approve</Button>
                                    <Button onClick={() => approveTransaction(coupon._id, 'declined')} variant='destructive'>
                                        Decline
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}


export default Coupons