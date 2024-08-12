'use client';

import { useEffect } from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-6">
      <div className="bg-red-100 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto flex items-center justify-center flex-col gap-2">
        <FaExclamationTriangle className="text-red-600 text-4xl mb-4 mx-auto" />
        <h2 className="text-2xl font-semibold text-red-800 mb-2">Something went wrong!</h2>
        <p className="text-gray-700 mb-6">We're sorry, but something went wrong. Please try again later.</p>
        <button
          onClick={() => reset()}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4 flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
        >
          <FaRedo className="text-white" />
          <span>Reload</span>
        </button>
      </div>
    </div>
  );
}
