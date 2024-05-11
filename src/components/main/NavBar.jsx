'use client'
import React, { useContext, useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, Bell, BellDot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/context/Context';


const navLinks = [
    {
        name: 'Home',
        src: '/home'
    },
    {
        name: 'Dashboard',
        src: '/dashboard'
    },
    {
        name: 'Referrals',
        src: '/referrals'
    },
    {
        name: 'Coupon Store',
        src: '/coupons'
    },
    {
        name: 'My Coupons',
        src: '/my-coupons'
    },
    {
        name: 'Wallet',
        src: '/wallet'
    },
    {
        name: 'Profile',
        src: '/profile'
    }
]

function NavBar() {
    const { history } = useContext(UserContext);
    const router = useRouter();
    useEffect(() => {
        console.log(history)
    }, [history])
    return (
        <nav className='h-24 bg-blue-400 '>
            <div className='flex py-4 px-4 w-full justify-between'>
                <SmNav />
                <div onClick={() => router.push('/history')}>{history && (history.filter(his => his.status == 'unSeen').length > 0) ? <BellDot /> : <Bell />}</div>
            </div>
        </nav>
    )
}

function SmNav() {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const handleClick = (src) => {
        router.push(src);
        setOpen(false)
    }

    function changeOpen(e) {
        setOpen(e)
    }
    return (
        <Sheet open={open} onOpenChange={changeOpen}>
            <SheetTrigger><AlignJustify /></SheetTrigger>
            <SheetContent side='left' className='px-1'>
                <SheetHeader>
                    <SheetTitle className='border-b-[2px] pl-8 py-2'>Navigations</SheetTitle>
                    <SheetDescription className='list-none flex flex-col w-full'>
                        {
                            navLinks.map(link => (
                                <li onClick={() => handleClick(link.src)} key={link.name} className=' cursor-pointer py-4 pl-6 mb-1 font-medium text-[16px] hover:bg-gradient-to-r from-gray-100 to-gray-300 text-[#6BBFE6] shadow-sm'>
                                    <p className='float-left'>{link.name}</p>
                                </li>
                            ))
                        }
                        <a href='/complain' target='_blank' className=' cursor-pointer py-4 pl-6 mb-1 font-medium text-[16px] hover:bg-gradient-to-r from-gray-100 to-gray-300 text-[#6BBFE6] shadow-sm'>
                            <p className='float-left'>Complain</p>
                        </a>

                        <li className='bg-red-400 text-white font-medium py-3 px-4 rounded-md mx-4 mt-6'>Logout</li>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default NavBar