// components/SkeletonHeroSection.js
import React from 'react';

const SkeletonHeroSection = ({ className, button, desc }) => {
  return (
    <section className={`bg-blue-50 text-white text-center ${className}`}>
      <div className="container mx-auto py-8">
        <div className="bg-gray-200 animate-pulse h-10 w-3/4 mx-auto my-4"></div>
        {desc && <div className="bg-gray-200 animate-pulse h-6 w-2/4 mx-auto my-4"></div>}
        {button && <div className="bg-gray-200 animate-pulse h-10 w-32 mx-auto my-4 rounded-lg"></div>}
      </div>
    </section>
  );
};

export default SkeletonHeroSection;
