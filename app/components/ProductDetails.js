import { FaHeart, FaRegHeart, FaAmazon } from 'react-icons/fa';
import RelatedProducts from './RelatedProducts';
import ShareButton from './ShareButton';
import Link from 'next/link';


function CreateURL(url, code){
  var ASINreg = new RegExp(/(?:\/)([A-Z0-9]{10})(?:$|\/|\?)/);
if(!url || !code) {
  return console.error(`Please provide a url and your amazon tracking code. Example: CreateURL('amazon.com/productblahblah', 'pickitly0b-20')`)
}
  var  cMatch = url.match(ASINreg);
  if(cMatch == null){
      return null;
  }
  var asin =  cMatch[1];
  var generated = `https://www.amazon.com/dp/${asin}/?tag=${code}`
return generated
}


export default function ProductDetails({ product, slug }) {
  return (
    <>
      <div className="p-6 max-w-4xl mx-auto bg- rounded-lg">
        <div className="relative mb-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-2/3 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {/* <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
              {product.favorite ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-500 text-xl" />
              )}
            </button> */}
            <ShareButton product={product} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
        <p className="text-gray-600 my-8">
          {product.description ? product.description : product.shortDescription}
        </p>
        <div className='flex justify-between items-center'>
        <p className="text-2xl font-semibold text-gray-800 mb-4">{`$${product.price}`}</p>
        <Link 
        href={CreateURL(product.amazon_link, 'akeditor-21') || product.amazon_link}
        passHref
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-yellow-400 text-gray-600 px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition-colors"
            >
            <FaAmazon className="mr-2 text-xl" />
            Buy on Amazon
        </Link>
            </div>
      </div>
      <RelatedProducts slug={slug} />
    </>
  );
}
