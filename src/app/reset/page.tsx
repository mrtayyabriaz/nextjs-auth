'use client'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import '@/app/globals.css'
import toast from 'react-hot-toast';

export default function page() {

  const [mailSent, setMailSent] = useState(false)
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('')
  const router = useRouter()

  const params = useSearchParams()

  //================== reset password ( START ) ===================
  // reset password
  async function resetPassword() {
    try {
      const res = await axios.post('/api/users/reset', { token: token, password: password })
      console.log('res:::', res.data.status);
      toast.success('Password Updated!', { duration: 4000 })
      if (res.data.status === true) {
        router.push('/login')
      }
    } catch (error) {
      console.info('error:::', error);

    }
  }
  useEffect(() => {
    // get token from params 
    const t = params.get('token')
    if (t) {
      setToken(t)
    }
  }, [])

  //================== reset password  ( END )  ===================

  return (

    <><main className='flex flex-col justify-center items-center min-h-screen text-gray-300 bg-gray-800'>

      <label htmlFor="email">
        Enter Password:
        <input type="text" className='m-2 p-2 rounded-sm bg-gray-700 text-gray-300 outline-none' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={resetPassword} className='px-2 py-2 bg-green-600 text-gray-300'>Update Password</button>

    </main>
    </>
  )
}
