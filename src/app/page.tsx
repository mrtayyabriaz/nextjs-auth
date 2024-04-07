import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-800 ">
      <div className="p-2 m-4">
        <Link className="text-2xl text-green-400 hover:underline px-2" href={'/signup'}>Signup</Link><br />
      </div>
      <div className="p-2 m-4">
        <Link className="text-2xl text-green-400 hover:underline px-2" href={'/login'}>Login</Link>
      </div>
      <div className="p-2 m-4">
        <Link className="text-2xl text-green-400 hover:underline px-2" href={'/verifyemail'}>verify</Link><br />
      </div>
    </main>
  );
}
