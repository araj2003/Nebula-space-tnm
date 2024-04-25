import { Link } from "react-router-dom";
import dnae from "../../assets/images/dnae.webp";
import pc from "../../assets/images/pc.webp";
import sgcl from "../../assets/images/sgcl.webp";
const OurCategories = () => {
  return (
    <section
      id="impact"
      className="w-[95%] sm:w-[90%] lg:w-[85%] mx-auto  text-2xl sm:text-3xl lg:text-4xl"
    >
      <div className="text-center font-medium  text-zinc-900 mb-3 md:my-7">
        Our <span className="text-teal-600 ">Categories</span>
      </div>

      <div className="flex justify-between flex-wrap gap-2">
        <Link
          to={"/surgicals"}
          className="bg-[#55CCC9] w-full sm:w-[32%] aspect-[4] hover:outline outline-teal-200 sm:aspect-[2.75] bg-category rounded-lg md:rounded-2xl lg:rounded-[2.25rem] p-5 sm:p-2 md:p-5 xl:p-7 flex relative"
        >
          <p className="lg:w-1/2 font-semibold text-white text-xl xl:text-2xl">
            Surgicals
          </p>
          <img
            loading="lazy"
            src={sgcl}
            alt="surgicals"
            className="absolute w-[25vw] sm:hidden lg:block lg:w-[11vw] right-10 sm:right-4 bottom-0"
          />
        </Link>
        <Link
          to={"/essential"}
          className="bg-[#55CCC9] w-full sm:w-[32%] aspect-[4] hover:outline outline-teal-200 sm:aspect-[2.75] bg-category rounded-lg md:rounded-2xl lg:rounded-[2.25rem] p-5 sm:p-2 md:p-5 xl:p-7 flex relative"
        >   <p className="lg:w-1/2 font-semibold text-white text-xl xl:text-2xl">
            Daily Needs & Essentials
          </p>
          <img
            loading="lazy"
            src={dnae}
            alt="daily-needs"
            className="absolute w-[30vw] sm:hidden lg:block lg:w-[14vw] right-10 sm:right-4 bottom-0"
          />
        </Link>
        <Link
          to={"/pharmaceuticals"}
          className="bg-[#55CCC9] w-full sm:w-[32%] aspect-[4] hover:outline outline-teal-200 sm:aspect-[2.75] bg-category rounded-lg md:rounded-2xl lg:rounded-[2.25rem] p-5 sm:p-2 md:p-5 xl:p-7 flex relative"
        >
          <p className="lg:w-1/2 font-semibold text-white text-xl xl:text-2xl">
            Pharmaceuticals
          </p>
          <img
            loading="lazy"
            src={pc}
            alt="pharmaceuticals"
            className="absolute w-[28vw] sm:hidden lg:block lg:w-[13vw] right-10 sm:right-1 bottom-0"
          />
        </Link>
      </div>
    </section>
  );
};

export default OurCategories;
