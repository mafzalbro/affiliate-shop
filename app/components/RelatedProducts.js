import { fetchRelatedProducts } from "@/app/lib/db";
import Card from "./Card";

const RelatedProducts = async ({ slug }) => {
  const relatedProducts = await fetchRelatedProducts(slug);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {relatedProducts.map((relatedProduct) => <Card product={relatedProduct} key={relatedProduct.id}/>)}  
      </div>
    </div>
  );
};

export default RelatedProducts;
