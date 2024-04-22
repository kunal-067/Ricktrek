import React, { useContext, useEffect } from 'react'
import { UserContext } from '@/app/context/Context'
import axios from 'axios'

function FetchUser() {
    const { user, setUser, withdrawls, setWithdrawls, coupons, setCoupons,
         referrals, setReferrals, directRefs, setDirectRefs, history, setHistory } = useContext(UserContext)
    useEffect(() => {
        if (!user) {
            axios.get('/api/user').then(res => {
                setUser(res.data.user);
            }).catch(err => console.error(err))
        }

        if (!withdrawls) {
            axios.get('/api/withdraw').then(res => {
                setWithdrawls(res.data.withdrawls)
            }).catch(err => console.error(err))
        }

        if (!referrals) {
            axios.get('/api/referrals').then(res => {
                setReferrals(res.data.tree);
            }).catch(err => console.log(err))
        }

        if (!coupons) {
            axios.get('/api/coupons').then(res => {
                setCoupons(res.data.coupons)
            }).catch(err => console.error(err))
        }

        if(!directRefs){
            axios.get('/api/referrals/get-direct').then(res=>{
                console.log(res);
                setDirectRefs(res.data.referrals);
            }).catch(err=>{
                console.error(err);
            })
        }

        if(!history){
            axios.get('/api/history').then(res=>{
                console.log(res, 'klpkl oo kjk ')
                setHistory(res.data.history);
            }).catch(err=>{
                console.error(err)
            })
        }
    })
    return (
        <div></div>
    )
}

export default FetchUser