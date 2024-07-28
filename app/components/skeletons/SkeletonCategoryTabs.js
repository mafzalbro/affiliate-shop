// components/SkeletonCategoryTabs.js
import React from 'react';
import SectionHeadingSkeleton from './SectionHeadingSkeleton';

const SkeletonCategoryTabs = () => {
  return (
    <>
    <SectionHeadingSkeleton />
    <div className="flex space-x-4 mb-6 flex-wrap gap-2">
      {/* {Array.from({ length: 10 }).map((_, index) => ( */}
        {/* <div key={index} className="bg-gray-200 animate-pulse h-9 w-24 rounded-md"></div> */}
        <div className="bg-gray-200 animate-pulse h-48 w-full mb-2"></div>
      {/* ))} */}
    </div>
    </>
  );
};

export default SkeletonCategoryTabs;
