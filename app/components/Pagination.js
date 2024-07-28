// components/Pagination.js

import React from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ currentPage, totalPages }) {
  const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start);
  
  // Create a more manageable list of page numbers
  let pages = [];
  if (totalPages <= 5) {
    pages = range(1, totalPages);
  } else if (currentPage < 3) {
    pages = range(1, 3).concat([0, totalPages]); // Show first pages, ellipses, and last page
  } else if (currentPage > totalPages - 3) {
    pages = range(totalPages - 3, totalPages); // Show last pages
  } else {
    pages = range(currentPage - 1, currentPage + 1).concat([0, totalPages]); // Show around current page
  }

  if (totalPages <= 1) {
    return null; // Hide pagination if there's only 1 or 0 pages
  }

  return (
    <div className="flex items-center justify-center gap-4 my-10">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={`?page=${currentPage - 1}`} aria-disabled={currentPage === 1}>
          <span
            className={`py-2 px-4 flex items-center gap-2 rounded-lg text-sm font-medium transition-colors duration-300 ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <FaChevronLeft />
            Previous
          </span>
        </Link>
      )}

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === 0 ? (
          <span key={index} className="py-2 px-4 text-sm font-medium text-gray-700">...</span>
        ) : (
          <Link key={page} href={`?page=${page}`}>
            <span
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </span>
          </Link>
        )
      )}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={`?page=${currentPage + 1}`} aria-disabled={currentPage === totalPages}>
          <span
            className={`py-2 px-4 flex items-center gap-2 rounded-lg text-sm font-medium transition-colors duration-300 ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Next
            <FaChevronRight />
          </span>
        </Link>
      )}
    </div>
  );
}
