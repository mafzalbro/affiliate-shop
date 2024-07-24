// components/Card.js

import React from 'react';
import Link from 'next/link';
import Button from './Button';

export default function Card({ product }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-6 mb-4 bg-white transition-transform transform hover:scale-105">
        <span className='flex flex-col gap-2'>
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md mb-2"/>
          <p className="text-gray-400">{product.category}</p>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.title}</h2>
          <p className="text-gray-600">{product.shortDescription}</p>
          {/* <Button> */}

          <span className='flex gap-2'>
          <Link className='text-sm text-blue-500 p-2 bg-blue-50 hover:bg-blue-200 active:bg-blue-300 w-1/3 text-center rounded-lg mt-4 hover:underline-offset-1' href={`/products/${product.category}/${product.slug}`}>
            Read More
          </Link>
          <Link className='text-sm text-blue-500 p-2 bg-blue-50 hover:bg-blue-200 active:bg-blue-300 w-1/3 text-center rounded-lg mt-4 hover:underline-offset-1' href={`${product.amazon_link}`}>
            Amazon Link
          </Link>
          </span>
          {/* </Button> */}
        </span>
    </div>
  );
}
