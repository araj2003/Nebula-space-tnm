import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
export default function MobileImages({ images }) {
  return (
    <div className="w-[70vw] max-w-sm mx-auto">
      <Swiper pagination={true} modules={[Pagination]}   className="mySwiper sm:border-2 border-teal-600 sm:mb-3 rounded-lg">
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={image} className="object-cover  sm:p-3"/>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style>
        {`
        .swiper {
          width: 100%;
          height: 100%;
        }
        
        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
        
          /* Center slide text vertically */
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1;
        }
        
        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        `}
      </style>
    </div>
  );
}
