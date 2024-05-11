'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from 'axios'
import { toast } from '../ui/use-toast'


function SignUpCard({refC}) {
    const [referralCode, setReferralCode] = useState(refC || '');
    const [position, setPosition] = useState('left');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [conformPassword, setConformPassword] = useState('');
    const [errors, setErrors] = useState({});

    const [disableSubmit, setDisableSubmit] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setDisableSubmit(true);
        axios.post('/api/user', {
            name,
            phone,
            position,
            referredBy: referralCode,
            password
        }).then(res => {
            console.log(res);
            setDisableSubmit(false);
            toast({
                title: res.data.msg
            })
            localStorage.setItem('user', JSON.stringify({loogedIn:true}));
            window.location.href = '/dashboard';
        }).catch(err => {
            console.error(err);
            setDisableSubmit(false);
            toast({
                title: err.response?.data.msg || err.message
            })
        })
    }

    const validateForm = () => {
        const errors = {}
        if (referralCode && referralCode.length < 12) {
            errors.referral = 'Invalid referral code'
        }

        if (!phone) {
            errors.phone = 'Phone number is required.';
        } else if (!(phone.match('[0-9]{10}'))) {
            errors.phone = 'Phone number is invalid.';
        }

        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        if (!conformPassword) {
            errors.conformPassword = ''
        } else if (conformPassword != password) {
            errors.conformPassword = "Password donesn't match"
        }

        setErrors(errors);
        setDisableSubmit( Object.keys(errors).length !== 0);

    }
    useEffect(validateForm, [referralCode, phone, name, password, conformPassword])
    useEffect(()=>{console.log(position)}, [position])
    return (
        <div className='bg-white shadow-md p-4 rounded-md w-[95vw] md:max-w-[500px] max-w-[450px] md:px-10'>
            <div className='border-b-[1px] border-slate-100 p-4 pt-2 flex justify-center items-center' >
                {/* <Image className='mx-auto' src={'/omilogo.png'} alt='Logo' width={100} height={100} /> */}
                <h2 className=' text-[32px] font-bold '>Richtrek</h2>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="referralCode" className="block text-sm font-semibold text-gray-800">Referral code</label>
                        <input
                            type="text"
                            name='referralcode'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Enter referral code (optional)'
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value)}
                        />
                        {errors.referral && <p className='text-red-700 text-sm'>{errors.referral}</p>}
                    </div>
                    {referralCode != '' && (
                        <div className="mb-4">
                            <Label>Position</Label>
                            <RadioGroup defaultValue="left" className='flex'>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="left" onClick={() => setPosition('left')} id="option-one" />
                                    <Label htmlFor="option-one" className='text-gray-500'>Left</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem onClick={() => setPosition('right')} disabled id="option-two" />
                                    <Label htmlFor="option-two" className='text-gray-500'>Right</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    )}
                    <div className="mb-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Name</label>
                        <input
                            type="name"
                            name='name'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className='text-red-700 text-sm'>{errors.name}</p>}
                    </div>

                    <div className="mb-2">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            name='phone'
                            placeholder='Please enter your phone no.'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <p className='text-red-700 text-sm'>{errors.phone}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {errors.password && <p className='text-red-700 text-sm'>{errors.password}</p>}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="conformPassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Conform Password
                        </label>
                        <input
                            type="text"
                            name='conformPassword'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter password'
                            value={conformPassword}
                            onChange={(e) => setConformPassword(e.target.value)}
                            required
                        />
                        {errors.conformPassword && <p className='text-red-700 text-sm'>{errors.conformPassword}</p>}
                    </div>

                    <div className="mt-2">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            style={{ opacity: !disableSubmit ? 1 : 0.5 }}
                            disabled={disableSubmit}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>


                <p className="mt-4 text-sm text-center text-gray-700">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpCard