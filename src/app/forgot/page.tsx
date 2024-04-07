'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '@/app/globals.css'
import { useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';


export default function page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [error, setError] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  //==================== send mail ( START ) ===========================     
  async function forgotPassword() {
    setLoading(true);
    setButtonDisabled(true);
    try {

      const res = await axios.post('/api/users/forgot', { email: email })
      console.log('res:::', res);
      console.log(email);
      setLoginSuccess(true);
      setLoading(false);
      setButtonDisabled(false);
      setError(false);
      toast.success('Reset Mail Sent!')

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('error:::', error);

        toast.error(error.response?.data.error, { duration: 3000 });
        setLoading(false);
        setButtonDisabled(false);
        setError(true);
      }
    }
  }
  //==================== send mail  ( END )  ===========================



  return (
    <><main className='flex flex-col justify-center items-center min-h-screen text-gray-300 bg-gray-800'>
      <div>
        <Toaster />
        <label htmlFor="email">
          Enter Email:
          <input type="email" className='m-2 p-2 rounded-sm bg-gray-700 text-gray-300 outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button onClick={forgotPassword} className='px-4 py-2 bg-green-700 text-gray-50 rounded-sm ring-0 disabled:bg-gray-600' disabled={buttonDisabled}>Send Verify Mail</button>

      </div>
      <Link className="text-green-400 hover:underline px-2" href={'/signup'}>Signup</Link>
      <Link className="text-green-400 hover:underline px-2" href={'/login'}>Login</Link>
    </main>
    </>
  )
}
