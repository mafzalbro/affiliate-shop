// components/SectionHeading.js
import React from 'react';

const SectionHeading = ({ title, icon: Icon }) => {
  return (
    <div className="flex items-center my-14">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-4 shadow-lg transition-transform transform hover:scale-105">
        <Icon className="text-blue-500 w-6 h-6" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
