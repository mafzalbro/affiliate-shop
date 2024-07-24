// components/SkeletonProductDetails.js
import React from 'react';

const SkeletonProductDetails = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gray-200 animate-pulse w-full h-64 rounded-md mb-4"></div>
      <div className="bg-gray-200 animate-pulse h-8 w-3/4 mb-4"></div>
      <div className="bg-gray-200 animate-pulse h-6 w-full mb-4"></div>
      <div className="bg-gray-200 animate-pulse h-6 w-full mb-4"></div>
      <div className="bg-gray-200 animate-pulse h-6 w-1/4 mb-4"></div>
    </div>
  );
};

export default SkeletonProductDetails;
