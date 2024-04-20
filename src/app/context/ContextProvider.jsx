import React, { useState } from 'react'
import { UserContext } from './Context'

export function UserContextProvider({ children }) {
  const [user, setUser] = useState('');
  const [withdrawls, setWithdrawls] = useState('');
  const [coupons, setCoupons] = useState('');
  const [referrals, setReferrals] = useState('');
  const [directRefs, setDirectRefs] = useState('');
  const [history, setHistory] = useState('');
  return (
    <UserContext.Provider value={{ user, setUser, withdrawls, setWithdrawls, coupons, setCoupons, referrals, setReferrals,
    directRefs, setDirectRefs }}>
      {children}
    </UserContext.Provider>
  )
}
