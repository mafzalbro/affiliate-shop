"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";



export default function SearchBar({ search }) {
  const [query, setQuery] = useState(search || '');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Reset loading state when the search prop changes
    if (query === search) {
      setIsLoading(false);
    }
  }, [search, query]);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      const productsElement = document.getElementById('products');
      if (productsElement) {
        productsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

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

  const handleClearQuery = () => {
    setQuery('');
  };

  // Reset loading state if the query matches the search prop
  useEffect(() => {
    if (query === search) {
      setIsLoading(false);
    }
  }, [search, query]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row my-10 w-full mx-auto relative">
      <div className="relative flex-grow mb-2 sm:mb-0 sm:mr-2" id='search'>
        <input
          type="text"
          name="search"
          value={query}
          onChange={handleChange}
          placeholder="Search products..."
          className="border border-gray-300 rounded-lg py-2 px-4 pl-10 pr-12 w-full ring-1 ring-blue-50 focus:ring-2 focus:ring-blue-500 border-none focus:outline-none"
        />
        {query && !isLoading && (
          <button
            type="button"
            onClick={handleClearQuery}
            className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
          >
            <RxCross2 />
          </button>
        )}
        {isLoading && (
          <div className="absolute right-3 top-3 flex items-center">
            <TbLoader3 className="text-gray-400 animate-spin" />
          </div>
        )}
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 flex items-center justify-center space-x-2 transition-opacity duration-300 ${
          !query.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!query.trim() || isLoading}
      >
        <span>Search</span>
      </button>
    </form>
  );
};