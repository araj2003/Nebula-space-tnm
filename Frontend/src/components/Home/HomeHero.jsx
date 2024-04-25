import React from "react";
import mid from "../../assets/images/hero-mid.webp";
import midright from "../../assets/images/hero-miid-right.webp";
import midleft from "../../assets/images/hero-mid-left.webp";
import left from "../../assets/images/left.webp";
import right from "../../assets/images/right.webp";
import Hero from "../../assets/images/hero-tag.png";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const HomeHero = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col md:pt-7 gap-6 justify-center pb-[5%]  min-h-[50vh] lg:min-h-[calc(100vh-5rem)] w-[95%] sm:w-[90%] lg:w-[85%] mx-auto">
      <div className="relative">
        <div className="text-3xl sm:text-4xl text-center lg:hidden">
          <p>
            Dedicated to{" "}
            <span className="text-teal-600 font-semibold">Pet Wellness:</span>
          </p>
          <p>Your Trusted Partner in </p>
          <p className="text-teal-600 font-semibold"> Veterinary Excellence</p>
        </div>
        <div className="text-center hidden lg:block">
          <div className="flex  lg:text-5xl justify-center">
            "Dedicated to&nbsp;
            <span className="text-teal-600 font-semibold"> Pet Wellness</span>:
            Your Trusted
          </div>
          <div className="flex lg:text-5xl justify-center">
            Partner in&nbsp;
            <span className="text-teal-600 font-semibold">
              Veterinary Excellence
            </span>
            ."
          </div>
          
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 lg:gap-4">
        <img
          src={left}
          alt="left"
          className="w-[17%] sm:w-[14%] hidden sm:block"
        />
        <img
          src={midleft}
          alt="mid"
          className="w-[25%] sm:w-[14%]"
        />
        <img src={mid} alt="mid " className="w-[25%] sm:w-[14%]" />
        <img
          src={midright}
          alt="mid"
          className="w-[25%] sm:w-[14%]"
        />
        <img
          src={right}
          alt="right"
          className="w-[17%] sm:w-[14%] hidden sm:block"
        />
      </div>
      <div className="flex justify-center gap-2 text-sm md:text-lg lg:mt-4">
        {!loading && !isAuthenticated && (
          <Link
            to={"/register"}
            className="text-teal-600 border z-10 bg-white border-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-md px-5 md:px-8 py-2.5  flex items-center uppercase"
          >
            Join Us
          </Link>
        )}
        <Link
          to={"/products"}
          className="text-white bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-md px-3 md:px-6 py-2.5  flex items-center uppercase"
        >
          Our Products
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default HomeHero;
