'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import "../globals.css";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Signup() {
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)


  const VerifyUserEmail = async () => {
    setLoading(true)
    try {

      const response = await axios.post('/api/users/verifyemail', { token });
      console.log('response:::', response);
      if (response.data.status) {
        setError(false)
        setLoading(false)
        setVerified(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('error:::', error);
        console.info(error.response?.data.message);
        // console.error(error.response?.status);
        toast.error(error.response?.data.message, { duration: 4000 })
        setError(error.response?.data.message)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const t = window.location.search.split("=")[1];
    console.log(t);
    if (!t) return;
    setToken(t);
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-800 text-gray-300" >
      <h1 className="text-4xl text-center">Verify Email</h1>
      <Toaster />
      {loading && <div className="text-green-600">Loading</div>}
      {verified && <div className="text-green-600">Email verified</div>}
      {error && <div> <div className="text-red-400 text-2xl">{error} or expired
      </div>
        <p> Retry <Link className="text-green-500 hover:underline" href="/forgot">Forgot</Link></p>
        {/* resend mail */}
      </div>
      }
      <button className="bg-green-700 hover:bg-green-600 text-gray-100 px-3 py-2 rounded-md" onClick={VerifyUserEmail}>Verify</button>
    </main>
  );
}
