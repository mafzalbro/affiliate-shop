import Link from "next/link";

// components/HeroSection.js
const HeroSection = ({ title, description, link, published, updated, className}) => {
  return (
    <section className={`bg-blue-500 text-white text-center ${className}`}>
      <div className="container mx-auto">
        {title && (
          <h1 className="text-4xl font-bold my-0">{title}</h1>
        )}
        {description && (
          <p className="text-lg my-4 text-gray-200">{description}</p>
        )}
        {published && (
          <p className="text-sm my-4 text-gray-300 float-left">{published}</p>
        )}
        {updated && (
          <p className="text-sm my-4 text-gray-300 float-right">{updated}</p>
        )}
        {link && (  
          <Link
            href={link.href}
            className="bg-white text-blue-500 inline-block py-2 px-4 rounded-lg font-bold"
          >
            {link.text || 'Shop Now'}
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
