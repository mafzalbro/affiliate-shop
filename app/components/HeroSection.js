import Link from "next/link";
import { FaCalendarAlt, FaSyncAlt } from 'react-icons/fa';

const HeroSection = ({ title, description, link, published, updated, className }) => {
  return (
    <section className={`bg-blue-500 text-white text-center ${className} py-10`}>
      <div className="container mx-auto px-4">
        {title && (
          <h1 className="text-4xl font-bold my-2 sm:my-4">{title}</h1>
        )}
        {description && (
          <p className="text-lg my-2 sm:my-4 text-gray-200">{description}</p>
        )}
        <div className="flex justify-between items-center my-2 sm:my-4 text-sm text-gray-300">
          {published && (
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>{published}</span>
            </div>
          )}
          {updated && (
            <div className="flex items-center">
              <FaSyncAlt className="mr-2" />
              <span>{updated}</span>
            </div>
          )}
        </div>
        {link && (
          <Link href={link.href}>
            <span className="bg-white text-blue-500 inline-block py-2 px-4 rounded-lg font-bold transition-transform transform hover:scale-105">
              {link.text || 'Shop Now'}
            </span>
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
