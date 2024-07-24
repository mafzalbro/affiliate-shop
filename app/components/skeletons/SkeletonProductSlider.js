// components/SkeletonProductSlider.js
import React from 'react';

const SkeletonProductSlider = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 bg-gray-200 animate-pulse h-6 w-1/4"></h2>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="swiper-slide p-4 mb-10">
              <div className="bg-gray-200 animate-pulse h-48 w-full mb-2"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-3/4 mb-2"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductSlider;
