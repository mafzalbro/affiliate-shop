import { fetchRelatedProducts } from "@/app/lib/db";
import Card from "./Card";
import { FaTag } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import ProductList from "./ProductList";

const RelatedProducts = async ({ slug }) => {
  const relatedProducts = await fetchRelatedProducts(slug);

  return (
    <div className="p-6 w-full mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaTag className="text-blue-500 my-5" /> Related Products
      </h2>
      <>
        {relatedProducts.length > 0 ? (
          <ProductList products={relatedProducts} noHead/>
          // <div className="flex flex-wrap">
          // {relatedProducts.map((relatedProduct) => (
          //     <Card product={relatedProduct} key={relatedProduct.id}/>
          // ))}
          // </div>
        ) : (
          <div className="col-span-full text-center flex flex-col items-center">
            <MdError className="text-gray-500 text-6xl mb-4" />
            <p className="text-gray-600">No related products found.</p>
          </div>
        )}
      </>
    </div>
  );
};

export default RelatedProducts;
