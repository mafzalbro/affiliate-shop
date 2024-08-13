import React from 'react';
import Link from 'next/link';
import { FaAmazon, FaTag } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

function CreateURL(url, code) {
  var ASINreg = new RegExp(/(?:\/)([A-Z0-9]{10})(?:$|\/|\?)/);
  if (!url || !code) {
    return console.error(`Please provide a url and your amazon tracking code. Example: CreateURL('amazon.com/productblahblah', 'pickitly0b-20')`);
  }
  var cMatch = url.match(ASINreg);
  if (cMatch == null) {
    return null;
  }
  var asin = cMatch[1];
  var generated = `https://www.amazon.com/dp/${asin}/?tag=${code}`;
  return generated;
}

// Utility function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};

export default function Card({ product, noBG, fullWidth }) {
  if (!product) {
    return null;
  }

  const { image, title, category, shortDescription, price, slug, amazon_link } = product;

  return (
    <div className={`w-full ${!fullWidth && 'md:w-1/2 lg:w-1/3 xl:w-1/4'} p-2 mb-2`}>
      <div className={`relative ${!noBG && 'bg-blue-50'} rounded-lg flex flex-col group w-full h-full`}>
        {price && (
          <span className="absolute top-4 left-4 bg-white text-blue-500 text-xs font-semibold px-2 py-1 rounded-lg mb-4 inline-block z-20">
            ${price}
          </span>
        )}
        {image && (
          <img src={image} alt={title} className="relative w-full h-64 object-contain mix-blend-multiply scale-110 group-hover:scale-125 z-10 transition-transform duration-300" />
        )}
        <div className="p-4 flex flex-col justify-between flex-1">
          {category && (
            <div className='flex items-center'>
            <FaTag className="text-sm mr-2 my-4" />
            <p className="text-gray-600 text-sm mb-1 mix-blend-multiply">{category}</p>
            </div>
          )}
          {title && (
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {truncateText(title, 80)}
            </h2>
          )}
          {/* {shortDescription && (
            <p className="text-gray-600 mb-4">
              {truncateText(shortDescription, 80)}
            </p>
          )} */}
          <div className="flex gap-4">
            {slug && category && (
              <Link
                className="flex items-center justify-center gap-1 text-sm text-blue-500 bg-white hover:bg-blue-200 active:bg-blue-300 w-1/2 text-center rounded-lg py-2 transition-colors px-2"
                href={`/products/${category}/${slug}`}
              >
                <HiArrowRight className="text-lg" />
                Details
              </Link>
            )}
            {amazon_link && (
              <Link
                className="flex items-center justify-center gap-1 text-sm text-blue-500 bg-white hover:bg-blue-200 active:bg-blue-300 w-1/2 text-center rounded-lg py-2 transition-colors px-2"
                href={CreateURL(amazon_link, 'akeditor-21') || amazon_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on
                <FaAmazon className="text-lg" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
