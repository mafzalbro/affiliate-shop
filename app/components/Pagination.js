"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const [pageNumbers, setPageNumbers] = useState([]);

  // Function to generate page numbers
  const generatePageNumbers = () => {
    let pages = [];

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage < 4) {
        pages = [1, 2, 3, 4, 5, '...', totalPages];
      } else if (currentPage > totalPages - 3) {
        pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return pages;
  };

  // Recalculate page numbers when currentPage or totalPages changes
  useEffect(() => {
    setPageNumbers(generatePageNumbers());
  }, [currentPage, totalPages]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber === '...') return; // Ignore ellipses
    router.push(`?page=${pageNumber}`);
  };

  return (
    <div className="flex flex-col items-center gap-4 my-10">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Previous Button */}
        {currentPage > 1 && (
          <span
            onClick={() => handlePageChange(currentPage - 1)}
            className={`py-2 px-4 flex items-center gap-2 rounded-lg text-sm font-medium transition-colors duration-300 cursor-pointer ${
              currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-50 text-blue-500 hover:bg-blue-200 active:bg-blue-300'
            }`}
          >
            <FaChevronLeft />
            {/* Previous */}
          </span>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span key={index} className="py-2 px-4 text-sm font-medium text-blue-500">...</span>
          ) : (
            <span
              key={`page-${page}`} // Ensure unique key
              onClick={() => handlePageChange(page)}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 cursor-pointer ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-50 text-blue-500 hover:bg-blue-200 active:bg-blue-300'
              }`}
            >
              {page}
            </span>
          )
        )}

        {/* Next Button */}
        {currentPage < totalPages && (
          <span
            onClick={() => handlePageChange(currentPage + 1)}
            className={`py-2 px-4 flex items-center gap-2 rounded-lg text-sm font-medium transition-colors duration-300 cursor-pointer ${
              currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-50 text-blue-500 hover:bg-blue-200 active:bg-blue-300'
            }`}
          >
            {/* Next */}
            <FaChevronRight />
          </span>
        )}
      </div>
    </div>
  );
}
