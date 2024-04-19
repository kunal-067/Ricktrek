'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Label } from '@/components/ui/label';
// import { data } from 'autoprefixer';




function Withdrawls() {
    const [loading, setLoading] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [withdrawls, setWithdrawls] = useState(data);

    const [withdrawlsToDisplay, setWithdrawlsToDisplay] = useState([]);
    const [pages, setPages] = useState(1);

    //function forgetting all withdrawls
    useEffect(() => {
        const getWithdrawls = () => {
            axios.get('/api/withdraw').then(res => {
                setWithdrawls(res.data.withdrawls);
            }).catch(err => {
                console.error(err)
            })

        };

        getWithdrawls();
    }, []);

    // useEffect for updating usersToDisplay
    useEffect(() => {
        const startIndex = (pageNo - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setWithdrawlsToDisplay(withdrawls.slice(startIndex, endIndex));

        //for updating pages
        setPages(Math.ceil(withdrawls.length / pageSize))
    }, [withdrawls, pageNo, pageSize]);

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
        let matchingWithdrawls = [];
        if (name !== '') {
            matchingWithdrawls = withdrawls.filter(user => user.name.includes(name))
        } else if (id !== '') {
            matchingWithdrawls = withdrawls.filter(user => user._id.includes(id))
        }

        if (name === '' && id === '' || !name && !id) {
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setWithdrawlsToDisplay(withdrawls.slice(startIndex, endIndex));
        } else {
            setWithdrawlsToDisplay(matchingWithdrawls)
        }
    }

    const applyFilter = (filter) => {
        if (filter == 'all') {
            const startIndex = (pageNo - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setWithdrawlsToDisplay(withdrawls.slice(startIndex, endIndex));
            return;
        }

        let filteredData = withdrawls.filter(withdrawl => withdrawl.status == filter)
        setWithdrawlsToDisplay(filteredData);
    }

    return (
        <div className='p-2'>
            {/* =================== searching box inputs and filters ===================== */}
            <div className="flex my-4 mt-6">
                <Input type="text" placeholder="Enter Name..." className="w-96" onChange={(e) => searchUser(e.target.value)} />
                <Input type="text" placeholder="Enter Id..." className="mx-5 w-80" onChange={(e) => searchUser('', e.target.value)} />

                <Select onValueChange={value => applyFilter(value)}>
                    <SelectTrigger className="w-[240px] ml-[30%]">
                        <SelectValue placeholder="All Withdrawls" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Withdrawls</SelectItem>
                        <SelectItem value="pending">Pending Withdrawls</SelectItem>
                        <SelectItem value="approved">Approved Withdrawls</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <DataTable withdrawls={withdrawlsToDisplay} />

            {/* ====================== pagination contents ========================== */}
            <div className="flex items-center  mt-2">
                {/* -------------------- display number -------------- */}
                <div className="text-medium text-slate-500 mr-10">
                    {`${withdrawlsToDisplay.length} out of ${withdrawls.length} displayed`}
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
        </div>
    )
}


function DataTable({ withdrawls = data }) {
    const { toast } = useToast();
    const [user, setUser] = useState({});

    const approveWithdrawl = (withdrawlId, status) => {
        axios.put('/api/withdraw', { withdrawlId , status }, { withCredentials: true }).then(res => {
            toast({
                title: 'Success',
                description: res.data.msg
            })
        }).catch(err => {
            console.error('something went wrong in approving', err);
            toast({
                title: 'Error:',
                description: err.response?.data.msg || err.message
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
            <Table className='bg-white'>
                {/* ====================== table head data ========================= */}
                <TableHeader>
                    <TableRow className="bg-slate-200">
                        <TableHead className="w-[210px]">ID</TableHead>
                        <TableHead>User Id</TableHead>
                        <TableHead>UPI</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {/* ================= Table body data ============== */}
                {
                    withdrawls.length > 0 ? (
                        <TableBody>

                            {
                                withdrawls.map((withdrawl, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{withdrawl._id?.toString()}</TableCell>
                                            <Dialog>
                                                <DialogTrigger onClick={() => appendUser(withdrawl.user)}>
                                                    <TableCell className='underline'> {withdrawl.user} </TableCell>
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
                                            <TableCell>{withdrawl.upi}</TableCell>
                                            <TableCell >{withdrawl.amount}</TableCell>
                                            <TableCell>{withdrawl.createdAt}</TableCell>
                                            <TableCell className="text-right">
                                                {/* Approve button with alert  */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger className='bg-slate-600 mr-1 text-white p-2 px-4 hover:bg-slate-400 font-medium rounded-md'>
                                                        {/* <Button className='bg-slate-600 mr-1'>Approve</Button> */}
                                                        Approve
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will give update the withdrawl of ₹{withdrawl.amount} of {withdrawl.name}
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel >Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => approveWithdrawl(withdrawl._id, 'approved')}>Approve</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                                {/* Decline button with alert  */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger className='p-2 px-4 rounded-md bg-red-500 hover:bg-red-300 cursor-pointer font-medium text-white'>
                                                        {/* <Button variant='destructive'>Decline</Button> */}
                                                        Decline
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will give permanently delete this request
                                                                even user have enough amount to withdraw.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel >Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => approveWithdrawl(withdrawl._id, 'declined')}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    ) : (
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={7} className='bg-green-50 text-center font-medium text-[20px] h-40' >
                                    No Withdrawls To Display
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )
                }
            </Table>
        </div>
    )
}


export default Withdrawls