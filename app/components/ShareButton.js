'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Dynamically import SharePopup to ensure it renders on the client side
const SharePopup = dynamic(() => import('./SharePopup'), { ssr: false });

export default function ShareButton({ product }) {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const popupRef = useRef(null);

  const toggleSharePopup = () => {
    setShowSharePopup(!showSharePopup);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowSharePopup(false);
    }
  };

  useEffect(() => {
    if (showSharePopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSharePopup]);

  return (
    <>
      <button
        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        onClick={toggleSharePopup}
      >
        <FaShareAlt className="text-blue-500 text-xl" />
      </button>
      {showSharePopup && <SharePopup product={product} onClose={toggleSharePopup} popupRef={popupRef} />}
    </>
  );
}
