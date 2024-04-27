'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { toast } from '../ui/use-toast';

function LoginCard() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    
    const [disableSubmit, setDisableSubmit] = useState(false);

    const validateForm = () => {
        const errors = {}

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

        setErrors(errors);
        setDisableSubmit( Object.keys(errors).length !== 0);

    }
    useEffect(validateForm, [phone, password]);

    function handleSubmit(e) {
        e.preventDefault();
        setDisableSubmit(true);
        axios.post('/api/auth/login', {phone, password}).then(res=>{
            console.log(res)
            toast({
                title:res.data.msg
            })
            setDisableSubmit(false);
            localStorage.setItem('user', JSON.stringify({loogedIn:true}));
            window.location.href = '/dashboard';
        }).catch(err=>{
            console.error(err);
            toast({
                title:err.response?.data.msg || err.message
            });
            setDisableSubmit(false); 
        })
    }
    return (
        <div className='bg-white shadow-md p-4 rounded-md w-[95vw] max-w-[450px] '>
            <div className='border-b-[1px] border-slate-100 p-4 pt-2 flex justify-center items-center' >
                {/* <Image className='mx-auto' src={'/omilogo.png'} alt='Logo' width={160} height={100} /> */}
                <h2 className=' text-[32px] font-bold '>Richtrek</h2>
            </div>
            <div>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            name='phone'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            placeholder='Please enter your email'
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
                        />
                        {errors.password && <p className='text-red-700 text-sm'>{errors.password}</p>}
                    </div>
                    <Link
                        href="/forget"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Forget Password?
                    </Link>
                    <div className="mt-2">
                        <button
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            style={{ opacity: !disableSubmit ? 1 : 0.5 }}
                            disabled={disableSubmit}
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                    <div className="absolute px-5 bg-white">Or</div>
                </div>

                <p className="mt-4 text-sm text-center text-gray-700">
                    Donot have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginCard