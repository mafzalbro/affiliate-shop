"use client"

import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [online, setOnline] = useState(true); // Start with true assuming we're online
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const isOnline = () => {
      // Ensure window is defined before using it
      return typeof window !== 'undefined' && window.navigator.onLine;
    };

    const handleOnline = () => {
      setOnline(true);
      setRetrying(false);
      setShowOfflineMessage(false);
      setShowSuccessMessage(true);

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleOffline = () => {
      setOnline(false);
      setShowOfflineMessage(true);
      setRetrying(true);

      // Start retrying every 5 seconds
      const retryInterval = setInterval(() => {
        if (navigator.onLine) {
          clearInterval(retryInterval);
          handleOnline();
        } else {
          setRetrying(true);
          setShowOfflineMessage(true);
          setShowSuccessMessage(false);
        }
      }, 5000);

      // Clean up interval on component unmount
      return () => clearInterval(retryInterval);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (!isOnline()) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className='relative z-30'>
      {showOfflineMessage && (
        <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-1 text-center">
          You are offline. Please check your network connection.
        </div>
      )}
      {showSuccessMessage && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white p-1 text-center">
          You are back online.
        </div>
      )}
      {retrying && !showSuccessMessage && !showOfflineMessage && (
        <div className="fixed bottom-0 left-0 right-0 bg-yellow-600 text-white p-1 text-center">
          Retrying... Please wait.
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;
