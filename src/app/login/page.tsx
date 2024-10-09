"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function () {
  const [cookie, setCookie] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cookie) {
      localStorage.setItem('userCookie', cookie);
      router.push('/');
    } else {
      alert('Please provide a valid cookie.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 bg-zinc-800 p-8 rounded-lg"
      >
        <h1 className="text-2xl text-white">Login</h1>

        <input
            type="text"
            value={cookie}
            onChange={(e) => setCookie(e.target.value)}
            className="w-[500px] hover:bg-zinc-700 outline-none appearance-none text-sm rounded-lg bg-zinc-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-gray-600 px-4 py-2"
            placeholder="Cookie"
            required
          />

        <button
          type="submit"
          className="bg-zinc-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-zinc-700 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
}
