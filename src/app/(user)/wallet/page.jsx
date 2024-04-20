'use client'
import { UserContext } from '@/app/context/Context';
import Loader from '@/components/common/Loader';
import Card from '@/components/main/Card';
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogTrigger, Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { formattedDateTime } from '@/utils/time';
import axios from 'axios';
import { ArrowDownCircleIcon, CircleArrowLeft, RefreshCw } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

function Withdrawls() {
    const {withdrawls, user} = useContext(UserContext);
    const [upi, setUpi] = useState('');
    const [amount, setAmount] = useState('');
    const [resetClicked, setResetClicked] = useState(false);

    const [withdrawing, setWithdrawing] = useState(false);
    // const [disableWithdraw, setDisableWithdraw] = useState(true);
    const [inSufficient, setInsufficient] = useState(false);

    const reset = () => {
        setResetClicked(true);
        setUpi('');
        setAmount('');
        setTimeout(() => setResetClicked(false), 1000);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setWithdrawing(true);
        axios.post('/api/withdraw', { upi, amount }).then(res => {
            toast({
                title: res.data.msg
            })
            setWithdrawing(false);
        }).catch(err => {
            toast({
                title: err.response?.data.msg || err.message
            })
            setWithdrawing(false);
        })
    }

    useEffect(()=>{
        if(user.amount < amount){
            setInsufficient(true)
        }else{
            setInsufficient(false)
        }
    },[amount])
    return (
        <div className='mx-3 sm:mx-4'>
            <div className='py-[1rem] bg-[#fff] -mt-10 pl-4 rounded-sm shadow-md'>
                Withdrawls
            </div>

            <main>
                <section className='bg-white shadow-md mt-4 p-2 py-6 flex flex-wrap'>
                    <WalletCard name={'2% Wallet'} balance={user?.balance2} description={'The amount can be used for buying products'}/>
                    <WalletCard name={'Balance'} balance={user?.balance} description={'This amount can be withdrawed directly through upi'}/>
                    <WalletCard name={'Earnings'} balance={user?.earnings} description={'Your total earning till now on omitrek'}/>
                </section>
                <section className='bg-[#fff] shadow-sm rounded-md p-4 mt-4'>
                    <h2>Withdraw</h2>
                    <form onSubmit={handleSubmit} >
                        <div className='flex justify-between flex-wrap'>
                            <input value={upi} onChange={e => setUpi(e.target.value)} className='flex-1 border rounded-md p-1 pl-3 m-1' type='text' name='upi' placeholder='Enter upi id' />
                            <input value={amount} onChange={e => setAmount(e.target.value)} className='flex-1 border rounded-md pl-3 p-1 m-1' type='number' name='amount' placeholder='Enter amount' />
                        </div>
                        <div className='flex justify-end p-1'>
                            {inSufficient&&<p className='float-left w-full text-[18px] text-rose-600 font-medium'>You just have ₹{user.balance} to withdraw</p>}
                            <Button type='button' onClick={reset} className='mr-2 bg-blue-700'><RefreshCw className={`size-5 mr-2 ${resetClicked ? 'rotate-[360deg]' : ''} transition-transform duration-700`} /> Reset</Button>
                            <Button type='submit' disabled={withdrawing} className='bg-green-700'>
                                {withdrawing ? <Loader size='small' /> : <ArrowDownCircleIcon className='size-5 mr-2' />}
                                {withdrawing ? 'Withdrawing' : 'Withdraw'}
                            </Button>
                        </div>
                    </form>
                </section>

                <section className='py-4'>
                    <h2 className='font-medium text-lg'>Withdrawl History</h2>
                    <div className="flex flex-wrap justify-around ">
                        {
                            withdrawls && withdrawls.map(withdrawl => {
                                const { _id, amount, status, createdAt } = withdrawl;
                                return (
                                    <WithdrawlCard key={_id} amount={amount} status={status} date={createdAt} />
                                )
                            })
                        }

                    </div>
                </section>
            </main>
        </div>
    )
}

const WithdrawlCard = ({ amount, status, date }) => {
    return (
        <div className='bg-white shadow-xl h-[100px] w-[140px] sm:h-[120px] sm:w-[200px] m-1 rounded-xl flex flex-col justify-center items-center'>
            <h1 className=' font-bold text-[21px]'>{'₹' + amount}</h1>
            <p className=' text-orange-500 -mt-1'>{status}</p>
            <p className='text-sm font-mono  text-green-700 mt-2 font-medium'>{formattedDateTime(date).date}</p>
        </div>
    )
}

const WalletCard = ({ balance, name, description }) => {
    return (
        <div className=' shadow-xl border-[2px] rounded-2xl p-2 px-5 flex-1 m-1'>
            <b className='text-[16px] font-medium'>{name}</b>
            <h2 className='text-[18px] font-bold'>₹{balance}
                <Dialog>
                    <DialogTrigger className='float-right'>
                        <span className='underline text-[14px] text-blue-700 float-right font-medium'>Info</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogDescription className='text-[21px]'>
                            {description}
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </h2>
        </div>
    )
}

export default Withdrawls