import Link from "next/link";

// components/Footer.js
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} MySite. All rights reserved.</p>
          <p>
            <Link href="/privacy" className="text-gray-400">Privacy Policy</Link> | <Link href="/terms" className="text-gray-400">Terms of Service</Link>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  