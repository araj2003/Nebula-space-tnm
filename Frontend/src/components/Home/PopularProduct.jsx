import React, { useEffect, useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
import { API_URL } from "../../api";
import Ratings from "../product/Ratings";
import { Link } from "react-router-dom";

export default function PopularProduct({ recommended }) {
  const [slidesPerView, setSlidesPerView] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;

      // Adjust slidesPerView based on the inner width
      if (innerWidth < 768) {
        setSlidesPerView(1.2); // Mobile view
      } else if (innerWidth < 1280) {
        setSlidesPerView(2.5); // Tablet view
      } else {
        setSlidesPerView(4); // Default view
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial state
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="w-[97.5%] sm:w-[90%] lg:w-[85%] mx-auto py-3 px-8 container">
      <h2 className="text-2xl lg:text-3xl font-semibold  px-1 mb-5 text-white">
        Trending Destinations
      </h2>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        slidesPerView={slidesPerView}
        spaceBetween={30}
        navigation={true}
        virtual
        className="flex items-center bg-black"
      >
        {recommended.map((product, index) => (
          <SwiperSlide key={product._id} virtualIndex={index} className="!bg-black">
            {/* {slideContent} */}
            <Link
              to={`/product/${product._id}`}
              className="transition-all duration-200  border border-gray-800 hover:border-teal-300  flex flex-col rounded-xl overflow-hidden  px-3 py-5 gap-7 items-center bg-gray-800 "
            >
              <img
                src={product.images[0]}
                alt="img"
                className="w-3/4 aspect-square"
                loading="lazy"
              />
              <div className="space-y-3 pl-3 pr-2">
                <h2 className="text-xl font-semibold text-white line-clamp-1 capitalize">
                  {product.productTitle}
                </h2>
                <p className="text-base font-medium text-gray-50 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-base bg-teal-600  hover:bg-teal-700 active:bg-teal-800 transition-all duration-100 w-28 h-10 text-white grid place-content-center font-medium rounded-[5px]"
                  >
                    More Details
                  </Link>
                  <div className="mr-4">
                    <Ratings ratings={product} />
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
