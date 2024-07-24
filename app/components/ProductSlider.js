"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';

const ProductSlider = ({ products }) => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">New Products</h2>
      <Swiper
        spaceBetween={30} // Space between slides
        pagination={{
          clickable: true, // Make bullets clickable
        }}
        autoplay={{
          delay: 3000, // Delay between slides in milliseconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        loop={true} // Infinite loop
        modules={[Pagination, Autoplay]} // Use Pagination and Autoplay modules
        className="mySwiper" // Custom class for Swiper styling
        breakpoints={{
          // Define different settings for different screen sizes
          320: {
            slidesPerView: 1, // Show 1 slide on small screens
          },
          640: {
            slidesPerView: 2, // Show 2 slides on medium screens
          },
          768: {
            slidesPerView: 3, // Show 3 slides on large screens
          },
          1024: {
            slidesPerView: 4, // Show 4 slides on extra large screens
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="p-4 mb-14">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <Link className="text-blue-600" href={`/products/${product.slug}`}>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            </Link>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-500">{product.category}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
