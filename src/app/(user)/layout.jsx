'use client'
import React, { useContext, useEffect } from 'react'
import NavBar from '@/components/main/NavBar'
import { UserContextProvider } from '../context/ContextProvider'
import { UserContext } from '../context/Context'
import axios from 'axios'
import FetchUser from '@/components/main/fetchdata/FetchUser'


function Laybout({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        return window.location.href = '/home'
      }
    }
  }, [])

  return (
    <>
     <UserContextProvider>
      <NavBar />
      <main>
          <FetchUser />
          {children}
      </main>
      </UserContextProvider>
    </>
  )
}


export default Laybout