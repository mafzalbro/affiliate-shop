// components/SectionHeadingSkeleton.js
import React from 'react';

const SectionHeadingSkeleton = () => {
  return (
    <div className="flex items-center my-14">
      {/* Skeleton for the icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 mr-4 animate-pulse"></div>
      {/* Skeleton for the text */}
      <div className="w-48 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
};

export default SectionHeadingSkeleton;
