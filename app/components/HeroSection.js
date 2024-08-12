import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaSyncAlt } from 'react-icons/fa';

const HeroSection = ({ title, description, link, published, updated, image, art, className }) => {
  const hasMedia = image || art;

  return (
    <section className={`relative text-white ${className} py-16 sm:py-20 lg:py-24 md:px-20`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-50 to-blue-50"></div>
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className={`relative container mx-auto px-4 z-10 flex flex-col-reverse gap-10 ${hasMedia ? 'md:flex-row' : 'md:flex-col'} items-center justify-center`}>
        <div className={`w-full ${hasMedia ? 'md:w-3/5 text-center md:text-left' : 'md:w-full text-center'}`}>
          {title && (
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold my-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-md sm:text-lg lg:text-xl my-10 text-gray-500 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {(published || updated) && (
            <div className="flex flex-col sm:flex-row justify-center items-center my-8 text-sm sm:text-base text-gray-500 space-y-2 sm:space-y-0 sm:space-x-4">
              {published && (
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-400" />
                  <span>{published}</span>
                </div>
              )}
              {updated && (
                <div className="flex items-center">
                  <FaSyncAlt className="mr-2 text-blue-400" />
                  <span>{updated}</span>
                </div>
              )}
            </div>
          )}
          {link && (
            <Link href={link.href} className="bg-blue-600 text-white inline-block py-2 px-4 rounded-lg font-bold transition-transform transform hover:scale-105 hover:bg-blue-700">
              {link.text || 'Explore Amazing Products'}
            </Link>
          )}
        </div>
        {image && (
          <div className="w-full md:w-2/5 mt-8 md:mt-0 flex justify-center md:justify-end">
            <Image src={image} alt={title} className="rounded-lg shadow-lg" />
          </div>
        )}
        {art && (
          <div className="w-full md:w-2/5 mt-8 md:mt-0 flex justify-center md:justify-end">
            {art}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
