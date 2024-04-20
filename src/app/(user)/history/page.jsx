import { UserContext } from '@/app/context/Context';
import { formattedDateTime } from '@/utils/time';
import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react'

function History() {
    const {history, setHistory} = useContext(UserContext);
    useEffect(()=>{
        axios.patch('/api/history').then(res=>{
            console.log(res);
            setHistory(res.data.history);
        }).catch(err=>{
            console.log(err);
        })
    })
    return (
        <div className='mx-2 sm:mx-6'>
            <div className='text-xl font-bold py-[1rem] mx-1 bg-[#fff] -mt-10 pl-4 rounded-sm shadow-md'>
                History
            </div>
            
            <section className='mt-4'>
                {
                    history&&history.map(elem=>(
                        <MessageCard key={elem._id} message={elem.msg} date={elem.createdAt}/>
                    ))
                }
            </section>
        </div>
    )
}

function MessageCard({message, date}){
    return(
        <div className='bg-white p-2 mx-1 mb-2 rounded-md shadow-md flex'>
            <div className='size-12 bg-slate-300 flex justify-center items-center rounded-md'>
                <Image src='/omilogo.png' alt='Omi-logo' className='w-full' width={100} height={100}/>
            </div>

            <div className='px-2 w-full h-full items-end' >
                <p className='text-base font-medium'>{message}</p>
                <p className='flex justify-between w-full font-medium text-gray-500'>Received on <span className='text-sm font-mono text-red-400'>{formattedDateTime(date).date + ', ' +formattedDateTime(date).time}</span></p>
            </div>
        </div>
    )
}
export default History;
