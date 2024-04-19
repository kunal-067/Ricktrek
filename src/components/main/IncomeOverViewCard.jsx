import { UserContext } from '@/app/context/Context'
import React, { useContext } from 'react'

function IncomeOverViewCard({className}) {
    const {user} = useContext(UserContext);
    return (
        <div className={`m-1 p-4 bg-green-100 ${className}`}>
            <h2 className="text-[#6BBFE6] font-medium text-[17px] mb-3 pb-1 border-b-[2px]">Income OverView</h2>

                <div className='flex justify-between pr-2'>Total Income - <span className='text-green-700 font-medium'>₹{user.earnings}</span> </div>
            <div className='bg-gray-100 rounded-md p-2 text-gray-500 text-sm leading-6'>
                <p>LeftCv - {user.leftCv || 0}</p>
                <p>RightCv - {user.rightCv || 0}</p>
                <p>Completed - {0}</p>
            </div>
        </div>
    )
}

export default IncomeOverViewCard