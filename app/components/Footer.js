import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = ({siteName}) => {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center">
          <div className="flex gap-6 mb-6 md:mb-0">
            <Link href="https://facebook.com" className="text-gray-200 hover:text-blue-500 transition-colors">
              <FaFacebook className="w-6 h-6" />
            </Link>
            <Link href="https://twitter.com" className="text-gray-200 hover:text-blue-500 transition-colors">
              <FaTwitter className="w-6 h-6" />
            </Link>
            <Link href="https://instagram.com" className="text-gray-200 hover:text-blue-500 transition-colors">
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link href="https://linkedin.com" className="text-gray-200 hover:text-blue-500 transition-colors">
              <FaLinkedin className="w-6 h-6" />
            </Link>
          </div>
          <div className="text-center md:text-left">
            <p className="text-md mb-2">&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
            <p className="text-sm">
              <Link href="/privacy" className="text-gray-200 hover:text-blue-500 transition-colors">Privacy Policy</Link>
              {" | "}
              <Link href="/terms" className="text-gray-200 hover:text-blue-500 transition-colors">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
