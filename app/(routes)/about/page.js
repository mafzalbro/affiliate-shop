// app/about/page.js

import HeroSection from '@/app/components/HeroSection';
import Link from 'next/link';
import React from 'react';
export default function AboutPage() {
  return (
<>
    <></>
    <HeroSection 
        title="About US"
        // description="Discover amazing products and deals!"
        // link={{ href: "/products", text: "Shop Now" }}
        className="py-10"
      />
    <div className="p-6 my-12 max-w-4xl mx-auto">
  <p className="text-lg mb-4">
    Welcome to your number one source for finding the best products and deals on Amazon. We're dedicated to providing you with top-notch recommendations and reviews, with a focus on dependability, customer satisfaction, and comprehensive insights.
  </p>
  {/* <p className="text-lg mb-4">
    Founded in 2022 by Jane Doe, BestDealsHub has grown from a small blog into a trusted resource for shoppers. When Jane first started, her passion for helping people find quality products at great prices drove her to research, write, and share her findings. This dedication turned her hobby into a thriving affiliate website.
  </p> */}
  <p className="text-lg mb-4">
    We now serve customers all over the world and are thrilled to be a part of the rapidly growing affiliate industry. We hope you enjoy our product recommendations and reviews as much as we enjoy offering them to you.
  </p>
  {/* <h2 className="text-2xl font-semibold mt-6 mb-2">Our Team</h2>
  <p className="text-lg mb-4">
    Our team is made up of dedicated professionals who are passionate about online shopping and product research. Meet some of the talented people behind BestDealsHub:
  </p>
  <ul className="list-disc pl-5 mb-4">
    <li className="mb-2"><strong>Jane Doe</strong> - Founder & Chief Editor</li>
    <li className="mb-2"><strong>John Smith</strong> - Senior Product Reviewer</li>
    <li className="mb-2"><strong>Emily Johnson</strong> - Marketing Specialist</li>
  </ul> */}
  <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
  <p className="text-lg mb-4">
     Have any questions or comments? Feel free to
    {/* <a href="mailto:info@bestdealshub.com" className="text-blue-500 hover:underline">email us</a> or  */}
    reach out through our 
    <Link href="/contact" className="text-blue-500 hover:underline"> contact page</Link>.
  </p>
</div>

</>
  );
}
