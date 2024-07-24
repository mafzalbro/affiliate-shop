// app/about/page.js

import HeroSection from '@/app/components/HeroSection';
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
        Welcome to [Your Company Name], your number one source for [product or service]. 
        We're dedicated to giving you the very best of [product or service], with a focus 
        on [three characteristics, e.g., dependability, customer service, and uniqueness].
      </p>
      <p className="text-lg mb-4">
        Founded in [Year] by [Founder Name], [Your Company Name] has come a long way from 
        its beginnings in [Location]. When [Founder Name] first started out, their passion 
        for [specific goal or mission, e.g., providing eco-friendly products] drove them 
        to do intense research, quit their day job, and gave them the impetus to turn 
        hard work and inspiration into to a booming online store.
      </p>
      <p className="text-lg mb-4">
        We now serve customers all over [Location or Country], and are thrilled that we're 
        able to turn our passion into our own website. We hope you enjoy our products as 
        much as we enjoy offering them to you.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Team</h2>
      <p className="text-lg mb-4">
        Our team is made up of dedicated professionals who are passionate about [industry 
        or field]. Meet some of the talented people behind [Your Company Name]:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li className="mb-2"><strong>[Team Member Name]</strong> - [Position]</li>
        <li className="mb-2"><strong>[Team Member Name]</strong> - [Position]</li>
        <li className="mb-2"><strong>[Team Member Name]</strong> - [Position]</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="text-lg mb-4">
        Have any questions or comments? Feel free to <a href="mailto:info@yourcompany.com" className="text-blue-500 hover:underline">email us</a> or reach out through our 
        <a href="/contact" className="text-blue-500 hover:underline"> contact page</a>.
      </p>
    </div>
</>
  );
}
