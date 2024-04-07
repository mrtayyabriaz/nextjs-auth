'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../globals.css";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [error, setError] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  // useEffect(() => {
  //   setButtonDisabled(false)
  // }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setButtonDisabled(true);
    console.log(user);
    try {



      const res = await axios.post('/api/users/login', user);
      if (res.status === 200) {
        console.log('res.status:::', res.status);
        console.log('res.data:::', res.data);
        setLoginSuccess(true);
        setLoading(false);
        setButtonDisabled(false);
        setError(false);
        toast.success('LogedIn Successfully!')
        e.target.reset();
      }



    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('error:::', error);
        // console.info(error.response?.data.error);
        // console.error(error.response?.status);

        toast.error(error.response?.data.error, { duration: 3000 });
        setLoading(false);
        setButtonDisabled(false);
        setError(true);
      }
    }


  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-800 text-gray-300">
      <div>
        <div><Toaster /></div>

        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl text-center">Login</h1>

          {loading && 'loading'}
          {error && error}

          <div className="flex flex-col">
            {!loginSuccess &&
              <div className="flex flex-col p-2">

                <input onChange={(e) => {
                  setUser({ ...user, email: e.target.value })
                }} className="outline-none p-2 border-1 border-gray-400 m-2 rounded-sm bg-gray-700 text-gray-200" type="email" name="Email" placeholder="Email" />

                <input onChange={(e) => {
                  setUser({ ...user, password: e.target.value })
                }} className="outline-none p-2 border-1 border-gray-400 m-2 rounded-sm bg-gray-700 text-gray-200" type="password" name="Password" placeholder="Password" />

                <button type="submit" className='px-4 py-2 bg-green-700 text-gray-50 rounded-sm ring-0 disabled:bg-gray-600' disabled={buttonDisabled}>Login</button>
              </div>
            }
            <p className="mt-3">
              do not have an account?
              <Link className="text-green-400 hover:underline px-2" href={'/signup'}>Signup</Link>
              <Link className="text-green-400 hover:underline px-2" href={'/forgot'}>Forgot</Link>
              {/* <Link className="text-green-400 hover:underline px-2" href={'/verifyemail'}>verify</Link> */}
            </p>
            {loginSuccess &&
              <p className="mt-3">
                Login Success: <Link className="text-green-400 hover:underline px-2" href={'/profile'}>Profile</Link>
              </p>}
          </div>
        </form>
      </div>
    </main>
  );
}
