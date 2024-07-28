// components/SiteNav.js
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaBox, FaInfoCircle, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const SiteNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className={`container mx-auto flex justify-between items-start lg:items-center`}>
        <Link href="/" className="text-white text-xl font-bold">
          MySite
        </Link>
        <div className={`w-full lg:flex lg:items-center lg:w-auto transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
          <div className="text-white lg:flex lg:gap-4 my-16 lg:my-0">
            <Link href="/" className="block px-4 py-2 lg:inline-block hover:text-blue-400 transition-colors duration-200">
              <FaHome className="inline-block mr-2 mb-1" /> Home
            </Link>
            <Link href="/products" className="block px-4 py-2 lg:inline-block hover:text-blue-400 transition-colors duration-200">
              <FaBox className="inline-block mr-2  mb-1" /> Products
            </Link>
            <Link href="/about" className="block px-4 py-2 lg:inline-block hover:text-blue-400 transition-colors duration-200">
              <FaInfoCircle className="inline-block mr-2  mb-1" /> About
            </Link>
            <Link href="/contact" className="block px-4 py-2 lg:inline-block hover:text-blue-400 transition-colors duration-200">
              <FaEnvelope className="inline-block mr-2  mb-1" /> Contact
            </Link>
          </div>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none transition-transform duration-200"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6 transform rotate-180" />
            ) : (
              <FaBars className="w-6 h-6 transform rotate-0" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
