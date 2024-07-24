// components/SkeletonPagination.js
import React from 'react';

const SkeletonPagination = () => {
  return (
    <div className="flex justify-center mt-6">
      <div className="bg-gray-200 animate-pulse h-8 w-24 rounded-md"></div>
    </div>
  );
};

export default SkeletonPagination;
