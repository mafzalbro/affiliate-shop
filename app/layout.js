import { Josefin_Sans, Outfit } from "next/font/google";
import "./globals.css";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";
import NetworkStatus from "./components/NetworkStatus";


const font = Outfit({ subsets: ["latin"], weight: [ '300', '400', '700'], display: "block"});

const siteName = 'Pro Shop Hunt'

export const metadata = {
  title: siteName,
  description: siteName,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      

      <body className={font.className}>
        <NetworkStatus />
        <SiteNav siteName={siteName}/>
        <main>
          <ProgressBar >
              {children}
          </ProgressBar>
        </main>
        <Footer siteName={siteName}/>
      </body>
    </html>
  );
}
