'use client'
import React, { useContext, useEffect } from 'react'
import NavBar from '@/components/main/NavBar'
import { UserContextProvider } from '../context/ContextProvider'
import { UserContext } from '../context/Context'
import axios from 'axios'
import FetchUser from '@/components/main/fetchdata/FetchUser'


function Laybout({ children }) {
  
  return (
    <>
      <NavBar />
      <main>
        <UserContextProvider>
          <FetchUser/>
          {children}
        </UserContextProvider>
      </main>
    </>
  )
}


export default Laybout