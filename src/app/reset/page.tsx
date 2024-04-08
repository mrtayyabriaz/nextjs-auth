'use client'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import '@/app/globals.css'
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Reset() {

  // const [mailSent, setMailSent] = useState(false)
  const [error, setError] = useState(false)
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('')
  // const params = useSearchParams()
  const router = useRouter()


  //================== reset password ( START ) ===================
  // reset password
  async function resetPassword() {
    setError(false)
    try {
      const res = await axios.post('/api/users/reset', { token: token, password: password })
      console.log('res:::', res.data.status);
      toast.success('Password Updated!', { duration: 4000 })
      if (res.data.status === true) {
        router.push('/login')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('error:::', error);
        console.info(error.response?.data.message);
        setError(error.response?.data.message)
        // console.error(error.response?.status);
        toast.error('Something went wrong!', { duration: 4000 })
      }
      console.info('error:::', error);
    }
  }
  useEffect(() => {
    // get token from params 
    // const t = params.get('token')
    const t = window.location.href.split('=')[1]
    if (t) {
      setToken(t)
    }
  }, [])

  //================== reset password  ( END )  ===================

  return (

    <><main className='flex flex-col justify-center items-center min-h-screen text-gray-300 bg-gray-800'>
      <div>
        {error && <div> <div className="text-red-400 text-2xl">{error} or expired
        </div>
          <p> Retry <Link className="text-green-500 hover:underline" href="/forgot">Forgot</Link></p>
        </div>
        }
        <label htmlFor="email">
          Enter Password:
          <input type="text" className='m-2 p-2 rounded-sm bg-gray-700 text-gray-300 outline-none' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={resetPassword} className='px-2 py-2 bg-green-600 text-gray-300'>Update Password</button>
      </div>

    </main>
    </>
  )
}
