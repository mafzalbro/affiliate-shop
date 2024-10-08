import { fetchProductDetails } from '@/app/lib/db';
import ProductDetails from '@/app/components/ProductDetails';
import RelatedProducts from '@/app/components/RelatedProducts';
import HeroSection from '@/app/components/HeroSection';
import Link from 'next/link';
import { TfiControlBackward } from "react-icons/tfi";
import { notFound } from 'next/navigation';

// Function to fetch product details and return metadata
export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = await fetchProductDetails(slug);
  if(product){
    return {
      title: `${product.title} | Product Details`,
      description: `${product.shortDescription}`,
    }
  } else {
    return {
      title: `Not Found Product Details`,
      description: `Not Found Product Details`,
    }
  }
}


export default async function ProductDetailsPage({ params }) {
  const { slug } = params
  const product = await fetchProductDetails(slug);
  if (!product) {
    notFound()
  }

  return (
  <>
      <HeroSection
        title={product.title}
        // description={`${product.shortDescription}`}
        published={`Published at ${new Date(product.created_at).toLocaleDateString()}`}
        updated={`Updated at ${new Date(product.updated_at).toLocaleDateString()}`}
        // link={{ href: '/products', text: 'View All Products' }}
        className="p-16"
        />
    <div className="container mx-auto p-4">
      <Link href="/products" className='flex items-center'><TfiControlBackward className='mr-1'/> Go to All Products</Link>
      <ProductDetails product={product} slug={slug} />
    </div>
    <RelatedProducts slug={slug} />
  </>
  );
}
