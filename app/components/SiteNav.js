// components/SiteNav.js
import Link from 'next/link';

const SiteNav = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">MySite</Link>
        <div>
          <Link href="/" className="text-white px-4">Home</Link>
          <Link href="/products" className="text-white px-4">Products</Link>
          <Link href="/about" className="text-white px-4">About</Link>
          <Link href="/contact" className="text-white px-4">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default SiteNav;
