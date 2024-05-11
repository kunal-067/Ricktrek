'use client'
import React, { useContext } from 'react'
import { UserContext } from '../../context/Context'

function Complain() {
    const { user } = useContext(UserContext);
    return (
        <div className='flex flex-col justify-center items-center w-[100vw] h-[100vh]'>
            <h2 className='text-center font-medium text-[24px] text-[#737373] pb-4 border-b-[2px] w-96 max-w-[95%] mb-8'>Raise Your Issue</h2>
            <form action="https://formsubmit.co/ps1623065@gmail.com" method="post" className='bg-white shadow-lg p-8 w-96 max-w-[95%] rounded-md flex flex-col'>
                <label htmlFor="title" className='opacity-50'>Phone</label>
                <input name='phone' type='tel' value={user?.phone} placeholder='Enter your phone no.' className='opacity-50 border-[2px] rounded-sm p-2 pl-4 mb-4' />
                <label htmlFor="title">Title</label>
                <input name='title' type="text" placeholder='Enter a suitable title' className='border-[2px] rounded-sm p-2 pl-4' />
                <label htmlFor="message" className='mt-4'>Message</label>
                <textarea name='message' placeholder='Enter you issue' className=' border-[2px] rounded-sm p-2 pl-4 w-full'>
                </textarea>

                <button type='submit' className='bg-blue-500 text-white font-medium rounded-md float-right p-2 my-6'>Submit</button>
            </form>
        </div>
    )
}

export default Complain