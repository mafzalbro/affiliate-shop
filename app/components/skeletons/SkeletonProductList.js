// components/SkeletonProductList.js
import React from 'react';
import SectionHeadingSkeleton from './SectionHeadingSkeleton';

const SkeletonProductList = ({col, className}) => {
  return (
    <>
    <SectionHeadingSkeleton />
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${col} gap-6 ${className}`}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-gray-200 animate-pulse p-4 rounded-lg">
          <div className="h-48 bg-gray-300 mb-4 rounded-md"></div>
          <div className="h-4 bg-gray-300 mb-2 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
          <div className="flex my-5 gap-2">
            <div className='h-4 bg-gray-300 rounded-md w-1/3 p-4'></div>
            <div className='h-4 bg-gray-300 rounded-md w-1/3 p-4'></div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default SkeletonProductList;
