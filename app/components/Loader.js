// components/Loader.js

import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Loader({className}) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <FaSpinner className="text-blue-500 text-4xl animate-spin" />
    </div>
  );
}
