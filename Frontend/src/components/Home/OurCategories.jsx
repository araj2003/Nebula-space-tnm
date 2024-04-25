import { Link } from "react-router-dom";
import dnae from "../../assets/images/left.png";
import pc from "../../assets/images/right.png";
import sgcl from "../../assets/images/mleft.png";
const OurCategories = () => {
  return (
    <section
      id="impact"
      className="w-[95%] sm:w-[90%] lg:w-[85%] mx-auto  text-2xl sm:text-3xl lg:text-4xl"
    >
      <div className="text-center font-medium  text-white mb-3 md:my-7">
        Our <span className="text-purple-600 ">Packages</span>
      </div>

      <div className="flex justify-between flex-wrap gap-2">
        <Link
          to={"/products"}
          className="bg-teal-700 w-full sm:w-[32%] aspect-[4] hover:outline outline-teal-200 sm:aspect-[2.75] bg-category2 rounded-lg md:rounded-2xl lg:rounded-[2.25rem] p-5 sm:p-2 md:p-5 xl:p-7 flex relative"
        >
          <p className="lg:w-1/2 font-medium text-white text-xl xl:text-2xl">
            Planets
          </p>
          <img
            loading="lazy"
            src={sgcl}
            alt="surgicals"
            className="absolute w-[25vw] sm:hidden lg:block lg:w-[11vw] right-10 sm:right-4 bottom-0"products/>
        </Link>
        <Link
          to={"/products"}
          className="bg-teal-700 w-full sm:w-[32%] aspect-[4] hover:outline outline-teal-200 sm:aspect-[2.75] bg-category2 rounded-lg md:rounded-2xl lg:rounded-[2.25rem] p-5 sm:p-2 md:p-5 xl:p-7 flex relative"
        >   <p className="lg:w-1/2 font-medium text-white text-xl xl:text-2xl">
            Moons & Stars
          </p>
          <img
            loading="lazy"
            src={dnae}
            alt="daily-needs"
            className="absolute w-[30vw] sm:hidden lg:block lg:w-[12vw] right-8 sm:right-4 bottom-0"products/>
        </Link>
        <Link
          to={"/products"}
          className="bg-teal-700 w-full sm:w-[32%] aspect-[4] hover:outline outline-teal-200 sm:aspect-[2.75] bg-category2 rounded-lg md:rounded-2xl lg:rounded-[2.25rem] p-5 sm:p-2 md:p-5 xl:p-7 flex relative"
        >
          <p className="lg:w-1/2 font-medium text-white text-xl xl:text-2xl">
            Galaxies
          </p>
          <img
            loading="lazy"
            src={pc}
            alt="pharmaceuticals"
            className="absolute w-[28vw] sm:hidden lg:block lg:w-[12vw] right-8 sm:right-1 bottom-0"products/>
        </Link>
      </div>
    </section>
  );
};

export default OurCategories;
