import React from 'react';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';
import ProductList from './components/ProductList';
import FilterOptionsWrapper from './components/FilterOptionsWrapper';
import { fetchCategories, fetchProducts, fetchNewProducts } from './lib/db';
import ProductSlider from './components/ProductSlider';
import Pagination from './components/Pagination';
import HeroSection from './components/HeroSection';
import Button from './components/Button';
import Link from 'next/link';

export default async function HomePage({ searchParams }) {
  // const query = decodeURIComponent(searchParams?.query || '');
  const search = decodeURIComponent(searchParams?.q || '');
  const page = parseInt(decodeURIComponent(searchParams?.page || '1'), 10); // Default to page 1
  const selectedFilters = searchParams?.filters ? searchParams.filters.split(',') : [];
  
  // Fetch categories and new products
  const categories = await fetchCategories();
  const newProducts = await fetchNewProducts();

  // Fetch products with pagination
  const { products, totalPages } = await fetchProducts({ 
    // category: query, 
    filters: selectedFilters, 
    search, 
    page 
  });

  const filters = [
    { name: 'filter1', label: 'Filter 1' },
    { name: 'filter2', label: 'Filter 2' },
    // Add more filters as needed
  ];

  return (
    <>
       <HeroSection 
        title="Welcome to MySite!"
        description="Discover amazing products and deals!"
        link={{ href: "/products", text: "Shop Now" }}
        className="py-16"
      />
    <div className='p-6'>
      <ProductSlider products={newProducts} />
      {/* <FilterOptionsWrapper actionUrl={`/filters=${encodeURIComponent(selectedFilters.join(','))}`} initialFilters={filters} /> */}
      {/* <CategoryTabs categories={categories} currentCategory={query} /> */}
      <SearchBar search={search} />
      <CategoryTabs categories={categories} />
      <ProductList products={products} />
      <div className='flex justify-center w-full p-10'>
      <Button>
        <Link href="/products" className="text-white">View All Products</Link>
      </Button>
      </div>
      {/* <Pagination currentPage={page} totalPages={totalPages} /> */}
    </div>
    </>
  );
}
