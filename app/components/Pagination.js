// components/Pagination.js

import React from 'react';
import Link from 'next/link';

export default function Pagination({ currentPage, totalPages }) {
  const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start);
  
  // Create a more manageable list of page numbers
  let pages = [];
  if (totalPages <= 5) {
    pages = range(1, totalPages);
  } else if (currentPage < 4) {
    pages = range(1, 4).concat([0, totalPages]); // Show first pages, ellipses, and last page
  } else if (currentPage > totalPages - 3) {
    pages = range(totalPages - 3, totalPages); // Show last pages
  } else {
    pages = range(currentPage - 1, currentPage + 1).concat([0, totalPages]); // Show around current page
  }

  return (
    <div className="flex items-center justify-center gap-4 my-10">
      <Link href={`?page=${currentPage - 1}`} aria-disabled={currentPage === 1} className={`${currentPage === 1 ? 'hidden': 'visible'}`}>
        <span
          className={`py-2 px-4 rounded-lg text-sm font-medium ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700'}`}
        >
          &laquo; Previous
        </span>
      </Link>

      {pages.map((page, index) => 
        page === 0 ? (
          <span key={index} className="py-2 px-4 text-sm font-medium text-gray-700">...</span>
        ) : (
          <Link key={page} href={`?page=${page}`}>
            <span
              className={`py-2 px-4 rounded-lg text-sm font-medium ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {page}
            </span>
          </Link>
        )
      )}

      <Link href={`?page=${currentPage + 1}`} aria-disabled={currentPage === totalPages} className={`${currentPage === totalPages ? 'hidden': 'visible'}`}>
        <span
          className={`py-2 px-4 rounded-lg text-sm font-medium ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700'}`}
        >
          Next &raquo;
        </span>
      </Link>
    </div>
  );
}
