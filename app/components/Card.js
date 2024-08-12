import React from 'react';
import Link from 'next/link';
import { FaAmazon } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

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

// Utility function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};

export default function Card({ product }) {
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full">
      {product.image && (
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6 bg-white">
        {product.category && (
          <p className="text-gray-400 text-sm mb-1">{product.category}</p>
        )}
        {product.title && (
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {truncateText(product.title, 80)}
            </h2>
        )}
        {product.shortDescription && (
          <p className="text-gray-600 mb-4">
            {truncateText(product.shortDescription, 80)}
          </p>
        )}
        <div className="flex gap-4">
          {product.slug && product.category && (
            <Link
              className="flex items-center justify-center gap-2 text-sm text-blue-500 bg-blue-50 hover:bg-blue-200 active:bg-blue-300 w-1/2 text-center rounded-lg py-2 transition-colors px-2"
              href={`/products/${product.category}/${product.slug}`}
            >
              <HiArrowRight className="text-lg" />
              Read More
            </Link>
          )}
          {product.amazon_link && (
            <Link
              className="flex items-center justify-center gap-2 text-sm text-blue-500 bg-blue-50 hover:bg-blue-200 active:bg-blue-300 w-1/2 text-center rounded-lg py-2 transition-colors px-2"
              href={CreateURL(product.amazon_link, 'akeditor-21') || product.amazon_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaAmazon className="text-lg" />
              Amazon Link
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
