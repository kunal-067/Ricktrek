import SignUpCard from '@/components/auth/SignUpCard'
import React from 'react'

function SignUp({searchParams}) {
  return (
    <div className='flex justify-center items-center bg-gray-100 h-[100vh]'>
        <SignUpCard refC={searchParams.ref ||  null}/>
    </div>
  )
}

export default SignUp