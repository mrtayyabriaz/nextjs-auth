'use client'
import React, { useState } from 'react'
import '../globals.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [user, setUser] = useState({ _id: '', username: '', email: '', success: false })
  const router = useRouter()
  const getUserInfo = async () => {
    const res = await axios.post('/api/users/me');
    console.log(res);
    if (res.status == 200) {
      setUser({ ...res.data.data, success: true })
      toast.success('Data Found success')
    }
  }

  const logout = async () => {
    const res = await axios.get('/api/users/logout');
    if (res.status == 200) {
      setUser({ _id: '', username: '', email: '', success: false })
      toast.success('Logout success')
      router.push('/login')
    }
  }

  return (
    <>
      <main className='flex flex-col justify-center items-center min-h-screen px-2 bg-gray-800'>
        <div className=''>
          <Toaster />
          <div className="text-gray-300 m-2 p-2">_ID: {user?._id}</div>
          <div className="text-gray-300 m-2 p-2">Name: {user?.username}</div>
          <div className="text-gray-300 m-2 p-2">Email: {user?.email} </div>
          {!user?.success && <button onClick={getUserInfo} className='mx-2 text-gray-200 bg-green-700 px-3 py-2 rounded-md'>get Data</button>}
          {user?.success && <button onClick={logout} className='text-gray-200 bg-teal-700 px-3 py-2 rounded-md'>Logout</button>}
        </div>
      </main>
    </>
  )
}
