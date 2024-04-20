'use client'
import { UserContext } from '@/app/context/Context'
import Card from '@/components/main/Card'
import IncomeOverViewCard from '@/components/main/IncomeOverViewCard'
import OverViewCard from '@/components/main/OverViewCard'
import RecentReferralCard from '@/components/main/RecentReferralCard'
import { useContext, useEffect } from 'react'

function Dashboard() {
  const {user, referrals, directRefs} = useContext(UserContext);
  
  if(!user){
    return <>Loading...</>
  }
  return (
    <div className='mx-6'>
      <div className='text-xl font-bold py-[1rem] mx-1 bg-[#fff] -mt-10 pl-4 rounded-sm shadow-md'>
        Dashboard
      </div>

      <div>
        <section className='mt-3 flex flex-wrap'>
          <Card title={'Earnings'} value={user?.earnings || 0} />
          <Card title={'Total Team'} value={referrals?.length || 0} />
          <Card title={'Referrals'} value={directRefs?.length || 0} />
        </section>

        <section className='flex flex-wrap w-full'>
          <div className='flex-1 md:mr-2'>
            <OverViewCard className='flex-1 ' name={user?.name} referralCode={user?.referralCode} registrationDate={user?.registeredAt} />
          </div>

          <div className='max-w-[450px] w-full md:ml-2'>
            <IncomeOverViewCard className='flex-1' />
            <RecentReferralCard className={`mb-16 flex-1`} />
          </div>
        </section>


      </div>
    </div>
  )
}

export default Dashboard