// components/SkeletonSearchBar.js
import React from 'react';

const SkeletonSearchBar = () => {
  return (
    <div className="w-full max-w-full mx-auto mb-10">
      <div className="bg-gray-200 animate-pulse h-10 rounded-md"></div>
    </div>
  );
};

export default SkeletonSearchBar;
