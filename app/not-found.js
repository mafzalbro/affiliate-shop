import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <div className="flex space-x-4">
        <Link href="/" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
            <FaHome className="mr-2" />
            Go Home
        </Link>
        <Link href="/products#search" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
            <FaSearch className="mr-2" />
            Search
        </Link>
      </div>
      <div className="mt-8 text-gray-600">
        <p>Here are some helpful links instead:</p>
        <ul className="list-disc list-inside">
          <li>
            <Link href="/products" className="text-blue-600 hover:underline">Products
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-blue-600 hover:underline">About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-blue-600 hover:underline">Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
