"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { FaTag, FaTags } from 'react-icons/fa';
import SectionHeading from './SectionHeading';

// Component for rendering the slider
const ProductSlider = ({ products }) => {
  return (
    <div className="container mx-auto py-8">
      <SectionHeading title="New Arrivals" icon={FaTags} />
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="p-4 mb-10">
              <div className="relative w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            <Link href={`/products/${product?.category?.split(' ')?.join('-')}/${product.slug}`}>
              <h3 className="text-lg font-semibold mt-2 text-blue-500">{product.title}</h3>
            </Link>
              <p className="text-gray-600">${product.price}</p>
            <Link href={`/products/${product?.category?.split(' ')?.join('-')}`}>
              <p className="text-sm text-gray-400 hover:text-blue-500 flex items-center gap-1 mt-1">
              <FaTag className="text-sm mr-1" /> {product.category}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
