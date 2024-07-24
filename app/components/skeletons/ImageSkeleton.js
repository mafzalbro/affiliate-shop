// components/ImageSkeleton.js
import React from 'react';

const ImageSkeleton = ({ width = 'w-full', height = 'h-64', className = '' }) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse ${width} ${height} ${className}`}
    >
      {/* Optional: Add a rounded class if your image will have rounded corners */}
      <div className={`rounded-md ${className}`} />
    </div>
  );
};

export default ImageSkeleton;
