// components/ProductList.js

import React from 'react';
import Card from './Card';
import Loader from './Loader';

export default function ProductList({ products }) {
  if (!products) return <Loader />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <Card key={product.slug} product={product} />
        ))
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
}
