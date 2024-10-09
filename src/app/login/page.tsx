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
        className="flex flex-col gap-4 bg-gray-800 p-8 rounded-lg"
      >
        <h1 className="text-2xl text-white">Login</h1>

        <label className="text-white">
          Enter your cookie:
          <input
            type="text"
            value={cookie}
            onChange={(e) => setCookie(e.target.value)}
            className="p-2 mt-2 w-full rounded bg-gray-700 text-white"
            placeholder="Enter cookie"
            required
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
