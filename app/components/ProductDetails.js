// components/ProductDetails.js

import React from 'react';

export default function ProductDetails({ product }) {
  if (!product) return <p className="text-center text-gray-600">Product not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-md mb-4"/>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-bold text-gray-800">{`$${product.price}`}</p>
    </div>
  );
}
