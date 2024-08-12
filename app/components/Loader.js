// components/Loader.js

import React from 'react';
// import { TbFidgetSpinner } from "react-icons/tb";
import { TbLoader3 } from "react-icons/tb";


export default function Loader({ className }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <TbLoader3 className="text-blue-500 text-5xl custom-spinner font-thin" />
    </div>
  );
}
