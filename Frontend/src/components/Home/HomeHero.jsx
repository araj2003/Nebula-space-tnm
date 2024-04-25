import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const HomeHero = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  return (
    <div className="flex text-white flex-col md:pt-20 gap-7 justify-center pb-[5%] imagebg  min-h-[60vh]   lg:min-h-[calc(100vh-2rem)] w-[95%] sm:w-[90%] lg:w-[85%] mx-auto">
      <div className="relative font-bold">
        {/* <div className="text-3xl sm:text-4xl text-center lg:hidden">
          <p>
            Your Gateway to the Final Frontier
            <span className=" text-transparent  font-semibold bg-clip-text bg-gradient-to-tr from-white to-teal-600">
              Pet Wellness:
            </span>
          </p>
        </div> */}
        <div className="text-center hidden lg:block">
          <div className="flex  flex-col lg:text-6xl gap-3 justify-center">
            <span>Experience the Universe&nbsp;</span>
            <span className=" font-semibold text-teal-600 txt">
              {" "}
              to the Final Frontier
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-5 mx-auto my-5">
        <div className="flex flex-col items-center">
          <div
            id="text"
            class=" uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-violet-800 text-5xl font-black"
          >
            5k+
          </div>
          <span className="font-semibold mt-2 text-xl">Bookings</span>
        </div>
        <div className="flex flex-col items-center">
          <div class=" uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-violet-800 text-5xl font-black">
            10k+
          </div>
          <span className="font-semibold mt-2 text-xl"> Customers</span>
        </div>
      </div>
      <div className="flex justify-center gap-2 text-sm md:text-lg lg:mt-4 mx-auto">
        {!loading && !isAuthenticated && (
          <Link
            to={"/register"}
            className="text-teal-600 border z-10 bg-white border-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-md px-5 md:px-8 py-2.5  flex items-center hover:bg-teal-700 hover:text-white  "
          >
            Join Us
          </Link>
        )}
        <Link
          to={"/products"}
          className="text-white bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-md px-3 md:px-6 py-2.5  flex items-center hover:bg-teal-700"
        >
          Browse Destinations
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

      <style>
        {`
        
        .imagebg {
          background: url("https://images.unsplash.com/photo-1634176866089-b633f4aec882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80");
          background-size: cover; /* Set the size of the background image */
          background-repeat: no-repeat;
          background-position: top; /* Position the background image at the center */
          width: 100%; /* Set your desired width */}

          .txt{
            text-stroke: 1.25px white;
            // -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1.25px white;
            // -moz-text-fill-color: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default HomeHero;
