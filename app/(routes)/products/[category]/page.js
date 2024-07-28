import Head from 'next/head';
import React from 'react';
import SearchBar from '@/app/components/SearchBar';
import CategoryTabs from '@/app/components/CategoryTabs';
import ProductList from '@/app/components/ProductList';
import FilterOptionsWrapper from '@/app/components/FilterOptionsWrapper';
import { fetchCategories, fetchProducts, fetchNewProducts } from '@/app/lib/db';
import ProductSlider from '@/app/components/ProductSlider';
import Pagination from '@/app/components/Pagination';
import HeroSection from '@/app/components/HeroSection';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

export async function generateMetadata({ params, searchParams }) {
  const category = params.category.split("-").join(' ');
  const search = decodeURIComponent(searchParams?.q || '');
  const page = parseInt(decodeURIComponent(searchParams?.page || '1'), 10); // Default to page 1
  return {
    title: `${search ? "Searched for " + search + " from " + category : category + ' | Page ' + page } | Product Category`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const category = params.category.split("-").join(' ');
  const search = decodeURIComponent(searchParams?.q || '');
  const page = parseInt(decodeURIComponent(searchParams?.page || '1'), 10); // Default to page 1
  const selectedFilters = searchParams?.filters ? searchParams.filters.split(',') : [];
  
  // Fetch categories and new products
  const categories = await fetchCategories();
  // const newProducts = await fetchNewProducts();

  // Fetch products with pagination
  const { products, totalPages } = await fetchProducts({ 
    category: category, 
    filters: selectedFilters, 
    search, 
    page 
  });

  const categoryExists = categories.some(cat => cat === category.split('-').join(' '));

  return (
    <>
      <HeroSection
        title={`${category ? category + ' | ' : ''} Product Category`}
        description={`${search ? "You searched for " + search + " from " + category : page ? 'Page ' + page : ''}`}
        className="py-10 capitalize"
        link={{ href: '/products', text: 'View All Products' }}

      />
      <div className="p-6">
        <SearchBar search={search} />

        {!categoryExists ? (
          <div className="mb-8 py-8 px-4 border border-yellow-300 rounded-lg bg-yellow-50 flex flex-col items-center">
            <FaExclamationTriangle className="text-yellow-500 w-12 h-12 mb-4" />
            <p className="text-2xl font-semibold text-gray-800 mb-4">This category does not exist.</p>
            <p className="text-lg text-gray-700">But we have the following available categories:</p>
            <CategoryTabs categories={categories} noHead/>
          </div>
        ) : (
          <>
            {/* Uncomment if filters are needed */}
            {/* <FilterOptionsWrapper initialFilters={filters} actionUrl={`/filters=${encodeURIComponent(selectedFilters.join(','))}`}/> */}
            <CategoryTabs categories={categories} currentCategory={category} />
            <ProductList products={products} isLoading={false} />
            <Pagination currentPage={page} totalPages={totalPages} />
          </>
        )}
      </div>
    </>
  );
}
