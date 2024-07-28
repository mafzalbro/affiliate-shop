// components/Card.js

import React from 'react';
import Link from 'next/link';
import { FaAmazon } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

export default function Card({ product }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-6 bg-white">
        <p className="text-gray-400 text-sm mb-1">{product.category}</p>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.shortDescription}</p>
        <div className="flex gap-4">
          <Link 
            className="flex items-center justify-center gap-2 text-sm text-blue-500 bg-blue-50 hover:bg-blue-200 active:bg-blue-300 w-1/2 text-center rounded-lg py-2 transition-colors" 
            href={`/products/${product.category}/${product.slug}`}
          >
            <HiArrowRight className="text-lg" />
            Read More
          </Link>
          <Link 
            className="flex items-center justify-center gap-2 text-sm text-blue-500 bg-blue-50 hover:bg-blue-200 active:bg-blue-300 w-1/2 text-center rounded-lg py-2 transition-colors" 
            href={`${product.amazon_link}`}
          >
            <FaAmazon className="text-lg" />
            Amazon Link
          </Link>
        </div>
      </div>
    </div>
  );
}
