import SearchBar from '@/app/components/SearchBar';
import CategoryTabs from '@/app/components/CategoryTabs';
import ProductList from '@/app/components/ProductList';
import { fetchCategories, fetchProducts } from '@/app/lib/db';
import Pagination from '@/app/components/Pagination';
import HeroSection from '@/app/components/HeroSection';

// Function to fetch product details and return metadata
export async function generateMetadata({ params, searchParams }) {
  const search = decodeURIComponent(searchParams?.q || '');
  const page = parseInt(decodeURIComponent(searchParams?.page || '1'), 10); // Default to page 1
  const { slug } = params;
  return {
    title: `${search ? "You searched for " + search : page ? 'Page ' + page : ''} | Products Page`,
  };
}

export default async function ProductsPage({ params, searchParams }) {
  const search = decodeURIComponent(searchParams?.q || '');
  const page = parseInt(decodeURIComponent(searchParams?.page || '1'), 10); // Default to page 1
  const selectedFilters = searchParams?.filters ? searchParams.filters.split(',') : [];
  const limit = 30;
  
  // Fetch categories and new products
  const categories = await fetchCategories();
  // Fetch products with pagination
  const { products, totalPages } = await fetchProducts({  
    filters: selectedFilters, 
    search,
    page,
    limit: limit
  });

  const filters = [
    { name: 'filter1', label: 'Filter 1' },
    { name: 'filter2', label: 'Filter 2' },
    // Add more filters as needed
  ];

  return (
    <>
    <HeroSection 
        title={`Products`}
        description={`${search ? "You searched for " + search : page ? 'Page ' + page : ''}`}
        // link={{ href: "/products", text: "Shop Now" }}
        className="py-10"
      />
    <div className="p-6">
      <SearchBar search={search} />
      {/* <FilterOptionsWrapper initialFilters={filters} actionUrl={`/filters=${encodeURIComponent(selectedFilters.join(','))}`}/> */}
      {/* <CategoryTabs categories={categories} currentCategory={category} /> */}
      <CategoryTabs categories={categories} />
      <ProductList products={products} isLoading={false} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
    </>
  );
}
