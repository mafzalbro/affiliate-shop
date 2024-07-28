import React from 'react';
import Image from 'next/image';
import { FaHeart, FaShareAlt, FaCartPlus, FaRegHeart } from 'react-icons/fa';
import RelatedProducts from './RelatedProducts';

export default function ProductDetails({ product, slug }) {

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="relative mb-6">
          <img
            src={product.image}
            alt={product.title}
            width={1200}
            height={800}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <FaHeart className="text-red-500 text-xl" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <FaShareAlt className="text-blue-500 text-xl" />
            </button>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-gray-800 mb-4">{`$${product.price}`}</p>
        <div className="flex justify-between items-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors flex items-center gap-2">
            <FaCartPlus />
            Add to Cart
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition-colors flex items-center gap-2">
            <FaRegHeart />
            Wishlist
          </button>
        </div>
      </div>
      <RelatedProducts slug={slug} />
    </>
  );
}
