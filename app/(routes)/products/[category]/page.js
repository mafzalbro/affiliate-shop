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


// Function to fetch product details and return metadata
export async function generateMetadata({ params, searchParams }) {
  const category = params.category.split("-").join(' ');
  const search = decodeURIComponent(searchParams?.q || '');
  const page = parseInt(decodeURIComponent(searchParams?.page || '1'), 10); // Default to page 1
  const { slug } = params;
  return {
    // title: `${search ? "Searched for " + search : category ? 'Category ' + category : page ? 'Page ' + page : ''} | Product Category`,
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
  const newProducts = await fetchNewProducts();

  // Fetch products with pagination
  const { products, totalPages } = await fetchProducts({ 
    category: category, 
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
        title={`${category ? category + ' | ' : ''} Product Category`}
        description={`${search ? "You searched for " + search + " from " + category : page ? 'Page ' + page : ''}`}
        // link={{ href: "/products", text: "Shop Now" }}
        className="py-10 capitalize"
      />
      <div className="p-6">
        <SearchBar search={search} />
        {/* <FilterOptionsWrapper initialFilters={filters} actionUrl={`/filters=${encodeURIComponent(selectedFilters.join(','))}`}/> */}
        <CategoryTabs categories={categories} currentCategory={category} />
        <ProductList products={products} isLoading={false} />
        <Pagination currentPage={page} totalPages={totalPages} />  
      </div>
    </>
  );
}
