// components/CategoryTabs.js

import React from 'react';
import Link from 'next/link';
import { FaLaptop, FaCouch, FaSmile, FaBook, FaBasketballBall, FaHome, FaBlender, FaTree, FaGem, FaBaby, FaPaw, FaTshirt, FaCar, FaPuzzlePiece, FaClipboard, FaTshirt as FaFashion, FaThLarge } from 'react-icons/fa';
import SectionHeading from './SectionHeading';

const iconMap = {
  'electronics': <FaLaptop />,
  'furniture': <FaCouch />,
  'beauty': <FaSmile />,
  'books': <FaBook />,
  'sports': <FaBasketballBall />,
  'trousers': <FaTshirt />,
  'home decor': <FaHome />,
  'kitchen': <FaBlender />,
  'garden': <FaTree />,
  'jewelry': <FaGem />,
  'baby products': <FaBaby />,
  'pants': <FaTshirt />,
  'pet supplies': <FaPaw />,
  'shirts': <FaTshirt />,
  'automotive': <FaCar />,
  'toys': <FaPuzzlePiece />,
  'office supplies': <FaClipboard />,
  'fashion': <FaFashion />,
  // Add more categories and their corresponding icons here
};

export default function CategoryTabs({ categories, currentCategory, noHead }) {
  return (
    <>
      {!noHead && <SectionHeading title="Categories" icon={FaThLarge} id='categories' />}
      <div className="flex gap-4 flex-wrap my-10">
        {categories.map((cat) => (
          <Link key={cat} href={`/products/${cat.split(" ").join("-").toLowerCase()}`}>
            <span
              className={`transition duration-300 ease-in-out py-2 px-4 rounded-lg text-sm font-medium cursor-pointer flex items-center ${
                currentCategory === cat
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-blue-50 text-blue-500 hover:bg-blue-200 active:bg-blue-300'
              }`}
            >
              {iconMap[cat.toLowerCase()] && <span className="mr-2">{iconMap[cat.toLowerCase()]}</span>}
              {cat}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
