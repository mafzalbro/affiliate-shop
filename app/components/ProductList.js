// components/ProductList.js

import React from 'react';
import Card from './Card';
import Loader from './Loader';
import SectionHeading from './SectionHeading';
import { FaListAlt } from 'react-icons/fa';

const NoProductsFoundIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-500 h-12 w-12 mb-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
    <path d="M6 15l6-6 6 6" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default function ProductList({ products }) {
  if (!products) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <>
    <SectionHeading title="Products" icon={FaListAlt} id='products'/>
    <div className="p-4">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <NoProductsFoundIcon />
          <p className="text-lg font-semibold text-gray-600 mb-2">No products found.</p>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
    </>
  );
}
