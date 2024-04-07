'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import "../globals.css";

export default function Signup() {
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)


  const VerifyUserEmail = async () => {
    setLoading(true)
    const response = await axios.post('/api/users/verifyemail', { token });
    console.log('response:::', response);
    if (response.data.status) {
      setError(false)
      setLoading(false)
      setVerified(true);
    }
    if (response.status === 400) {
      setError(true)
      setLoading(false)
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
      {loading && <div className="text-green-600">Loading</div>}
      {verified && <div className="text-green-600">Email verified</div>}
      {error && <div className="text-red-600">verification failed</div>}
      <button onClick={VerifyUserEmail}>Verify</button>
    </main>
  );
}
