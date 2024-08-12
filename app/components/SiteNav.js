// components/SiteNav.js
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaBox, FaInfoCircle, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { CgMenuRightAlt, CgClose } from "react-icons/cg";


const SiteNav = ({siteName}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-700 p-4 flex flex-row-reverse">
      <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none transition-transform duration-200"
          >
            {isOpen ? (
              <CgClose className="w-6 h-6 transform rotate-180" />
            ) : (
              <CgMenuRightAlt className="w-6 h-6 transform rotate-0" />
            )}
          </button>
        </div>
      <div className={`container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center`}>
        <Link href="/" className="text-white text-xl font-bold">
          {siteName}
        </Link>
        <div className={`w-full md:flex md:items-center md:w-auto transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
          <div className="text-white md:flex md:gap-4 my-16 md:my-0">
            <Link href="/" className="block px-4 py-2 md:inline-block hover:text-blue-400 transition-colors duration-200">
              <FaHome className="inline-block mr-2 mb-1" /> Home
            </Link>
            <Link href="/products" className="block px-4 py-2 md:inline-block hover:text-blue-400 transition-colors duration-200">
              <FaBox className="inline-block mr-2  mb-1" /> Products
            </Link>
            <Link href="/about" className="block px-4 py-2 md:inline-block hover:text-blue-400 transition-colors duration-200">
              <FaInfoCircle className="inline-block mr-2  mb-1" /> About
            </Link>
            <Link href="/contact" className="block px-4 py-2 md:inline-block hover:text-blue-400 transition-colors duration-200">
              <FaEnvelope className="inline-block mr-2  mb-1" /> Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
