"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaSpinner } from 'react-icons/fa';

export default function SearchBar({ search }) {
  const [query, setQuery] = useState(search || '');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Reset loading state when the search prop changes
    if (query === search) {
      setIsLoading(false);
    }
  }, [search, query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() && query !== search) {
      setIsLoading(true);
      router.push(`?q=${encodeURIComponent(query)}`);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Reset loading state if the query matches the search prop
  useEffect(() => {
    if (query === search) {
      setIsLoading(false);
    }
  }, [search, query]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mb-6 w-full mx-auto relative">
      <div className="relative flex-grow mb-2 sm:mb-0 sm:mr-2">
        <input
          type="text"
          name="search"
          value={query}
          onChange={handleChange}
          placeholder="Search products..."
          className="border border-gray-300 rounded-lg py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-3 flex items-center">
            <FaSpinner className="text-gray-400 animate-spin" />
          </div>
        )}
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 flex items-center justify-center space-x-2 ${
          !query.trim() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!query.trim() || isLoading}
      >
        {/* {isLoading ? (
          <FaSpinner className="animate-spin" />
        ) : ( */}
          <span>Search</span>
        {/* )} */}
      </button>
    </form>
  );
}
