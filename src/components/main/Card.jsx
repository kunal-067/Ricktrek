import React from 'react'
// import {} from 'react-lucide'

function Card({title, value, className}) {
  return (
    <div className={'flex shadow-sm bg-[#fff] p-2 rounded-sm m-1 min-w-[260px] flex-1'+' '+className}>
        <div className='bg-blue-200 size-20 flex justify-center items-center mr-2 rounded-sm'>
            @
        </div>

        <div className='pt-2'>
            <p className='text-gray-500 font-medium'>{title || 'None'}</p>
            <b className='font-medium text-xl'>{value}</b>
        </div>
    </div>
  )
}

export default Card