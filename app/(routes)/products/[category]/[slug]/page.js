import { fetchProductDetails } from '@/app/lib/db';
import ProductDetails from '@/app/components/ProductDetails';
import HeroSection from '@/app/components/HeroSection';
import Link from 'next/link';
import RelatedProducts from '@/app/components/RelatedProducts';

// Function to fetch product details and return metadata
export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = await fetchProductDetails(slug);
  return {
    title: `${product.title} | Product Details`,
    description: `${product.shortDescription}`,
  };
}


export default async function ProductDetailsPage({ params }) {
  const { slug }= params
  const product = await fetchProductDetails(slug);

  // console.log(product);
  return (
  <>
      <HeroSection
        title={product.title}
        description={`${product.shortDescription}`}
        published={`Published at ${new Date(product.created_at).toLocaleDateString()}`}
        updated={`Updated at ${new Date(product.updated_at).toLocaleDateString()}`}
        link={{ href: '/products', text: 'View All Products' }}
        className="p-16"
        />
    <div className="container mx-auto p-4">
      <Link href="/products">&larr; Back</Link>
      <ProductDetails product={product} />
    </div>
    <RelatedProducts slug={slug}/>
  </>
  );
}
