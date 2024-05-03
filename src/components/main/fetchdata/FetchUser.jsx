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

        // if (!referrals) {
        //     const dataArry = []
        //     const getReferrals = async (id) => {
        //         try {
        //             const { data } = await axios.get(`/api/referrals?userId=${id}`);
        //             console.log(data, 'chutiya insan')
        //             dataArry.push(...data.tree);

        //             const lastUsers = data.tree.filter(elem => elem?.node == true);

        //             lastUsers.map(async user => {
        //                 if (user?.node) {
        //                     console.log('amin')
        //                     await getReferrals(user?._id);
        //                 } else {
        //                     return
        //                 }
        //             })

        //         } catch (error) {
        //             console.error('error in getting tree', error);
        //             return false;
        //         }
        //     }
        //     getReferrals(null).then(res => setReferrals(dataArry)).catch(err=>console.log(err))

            if (!referrals) {
                const getReferrals = async (id, uniqueReferrals = []) => {
                    try {
                        const { data } = await axios.get(`/api/referrals?userId=${id}`);
                        console.log(data, 'chutiya insan');
            
                        // Filter out duplicates based on _id
                        const filteredData = data.tree.filter(elem => !uniqueReferrals.some(referral => referral?._id === elem?._id));
                        uniqueReferrals.push(...filteredData);
            
                        const lastUsers = filteredData.filter(elem => elem?.node === true);
            
                        // Recursively call getReferrals for last users
                        await Promise.all(lastUsers.map(async user => {
                            if (user?.node) {
                                console.log('amin');
                                await getReferrals(user?._id, uniqueReferrals);
                            }
                        }));
            
                        return uniqueReferrals;
                    } catch (error) {
                        console.error('error in getting tree', error);
                        return false;
                    }
                };
            
                getReferrals(null)
                    .then(res => {
                        setReferrals(res); // Set state with unique referral data
                    })
                    .catch(err => console.log(err));
            }
            
        // }

        if (!coupons) {
            axios.get('/api/coupons').then(res => {
                console.log(res, 'hello js klo')
                setCoupons(res.data.coupons)
            }).catch(err => console.error(err))
        }

        if (!directRefs) {
            axios.get('/api/referrals/get-direct').then(res => {
                console.log(res, 'lap lap');
                setDirectRefs(res.data.referrals);
            }).catch(err => {
                console.error(err);
            })
        }

        if (!history) {
            axios.get('/api/history').then(res => {
                setHistory(res.data.history);
            }).catch(err => {
                console.error(err)
            })
        }
    })
    return (
        <div></div>
    )
}

export default FetchUser