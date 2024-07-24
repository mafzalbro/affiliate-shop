// components/CategoryTabs.js

import React from 'react';
import Link from 'next/link';

export default function CategoryTabs({ categories, currentCategory }) {
  return (
    <div className="flex gap-5 flex-wrap my-10">
      {categories.map((cat) => (
        <Link key={cat} href={`/products/${cat.split(" ").join("-").toLowerCase()}`}>
            <span
              className={`py-2 px-4 rounded-lg text-sm font-medium ${
                currentCategory === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </span>
          </Link>
      ))}
    </div>
  );
}
