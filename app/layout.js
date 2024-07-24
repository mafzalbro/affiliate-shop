import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";



const inter = Poppins({ subsets: ["latin"], weight: ['400', '700'], display: "swap"});

export const metadata = {
  title: "Affiliate Shop",
  description: "Affiliate Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <SiteNav />
        <main>
          <ProgressBar >
              {children}
          </ProgressBar>
        </main>
        <Footer />
      </body>
    </html>
  );
}
