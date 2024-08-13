'use client';

import { useRouter } from 'next-nprogress-bar';
import { useEffect } from 'react';
import { FaExclamationTriangle, FaRedo, FaHome, FaPhone } from 'react-icons/fa';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-red-100 to-red-50 text-center p-6">
      <div className="md:flex md:flex-row md:space-x-6 md:w-full md:justify-center">
        <div className="p-8 rounded-lg w-full md:w-3/4 mx-auto flex flex-col items-center justify-center gap-4">
          <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
          <h2 className="text-3xl font-bold text-red-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-700 mb-6">
            We're sorry, but an unexpected error has occurred. Please try one of the options below.
          </p>
        <div className="flex flex-col items-center justify-center flex-wrap gap-2 w-full space-y-3 md:space-y-0 md:flex-row md:space-x-3 mt-4 md:mt-0">
          <button
            onClick={() => router.push('/')}
            className="bg-yellow-50 hover:bg-yellow-100 text-yellow-900 rounded-lg py-2 px-4 flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
          >
            <FaHome className="text-yellow-900" />
            <span>Go to Homepage</span>
          </button>
          <button
            onClick={() => router.push('/contact')}
            className="bg-purple-50 hover:bg-purple-100 text-purple-500 rounded-lg py-2 px-4 flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
          >
            <FaPhone className="text-purple-500" />
            <span>Contact Support</span>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center flex-wrap gap-2 w-full space-y-3 md:space-y-0 md:flex-row md:space-x-3 mt-4 md:mt-0">
          <button
            onClick={() => reset()}
            className="bg-red-50 hover:bg-red-100 text-red-500 rounded-lg py-2 px-4 flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
          >
            <FaRedo className="text-red-500" />
            <span>Try Again</span>
          </button>
          <button
            onClick={() => router.refresh()}
            className="bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-lg py-2 px-4 flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
          >
            <FaRedo className="text-blue-500" />
            <span>Refresh Page</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-50 hover:bg-green-100 text-green-500 rounded-lg py-2 px-4 flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
          >
            <FaRedo className="text-green-500" />
            <span>Full Reload</span>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
