import { fetchRelatedProducts } from "@/app/lib/db";
import Card from "./Card";
import { FaTag } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

const RelatedProducts = async ({ slug }) => {
  const relatedProducts = await fetchRelatedProducts(slug);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaTag className="text-blue-500 my-5" /> Related Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group transition-transform transform hover:scale-105">
              <Card product={relatedProduct} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center flex flex-col items-center">
            <MdError className="text-gray-500 text-6xl mb-4" />
            <p className="text-gray-600">No related products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
