import React from "react";
import industry from "../../assets/images/industry.webp";
import animals from "../../assets/images/animal.webp";
import { Link } from "react-router-dom";
const IndustryAnimals = () => {
  return (
    <section
      id="indsutryanimals"
      className="text-xl sm:text-2xl xl:text-3xl w-[95%] sm:w-[90%] lg:w-[85%] mx-auto py-5"
    >
      <div className="flex justify-between flex-wrap gap-2">
        <Link
          to={"/industry"}
          className="bg-[#55CCC9] w-full  hover:outline outline-teal-200 md:w-[45%] aspect-[4] md:aspect-[2.75] lg:aspect-[3] bg-category rounded-lg md:rounded-2xl lg:rounded-[2.25rem] p-4 md:px-4 md:py-4 xl:p-7 flex relative"
        >
          <p className="md:w-1/2 font-semibold text-white ">
            Choose by Service Type
          </p>
          <img
            src={industry}
            alt="daily-needs"
            className="absolute  w-[36%] md:w-[19vw] right-[2%] md:-right-[14%] -bottom-1 md:-bottom-3"
          />
        </Link>

        <Link
          to={"/animal"}
          className="bg-[#55CCC9] w-full md:w-[45%] aspect-[4] md:aspect-[2.75] lg:aspect-[3] bg-category hover:outline outline-teal-200 rounded-lg md:rounded-2xl lg:rounded-[2.25rem] p-4 md:px-4 md:py-4 xl:p-7  flex relative"
        >
          <p className="w-1/2 font-semibold text-white ">
            Choose Product by Animals
          </p>
          <img
            src={animals}
            alt="daily-needs"
            className="absolute  w-[42%] md:w-[25vw] right-0 md:-right-[10%] -bottom-1 md:-bottom-3"
          />
        </Link>
      </div>
    </section>
  );
};

export default IndustryAnimals;
