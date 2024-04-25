import React from "react";
import logoWhite from "../../assets/images/logo-white.svg";
/**
 * About component displays information about the company.
 *
 * @component
 * @returns {JSX.Element} - The About component.
 */

const About = () => {
  return (
    <section id="" className="bg-teal-600 py-4 pb-7">
      <div className="   text-white flex flex-col gap-2 items-center justify-center md:text-lg">
        <img src={logoWhite} alt="logo" />
        <h2 className="text-2xl md:text-4xl font-semibold">About Us</h2>
        <p className="w-[90%] md:w-4/5 text-center space-y-3">
          Welcome to SpaceWonders, your premier destination for space tourism
          experiences and services. We are committed to providing unparalleled
          adventures and ensuring the utmost satisfaction for our space
          travelers. With an extensive array of offerings sourced from top space
          agencies and providers, we offer innovative solutions to cater to the
          unique desires of each space tourist. Our dedicated team offers
          personalized guidance, steadfast support, and seamless logistics to
          ensure an unforgettable journey beyond Earth's atmosphere. Join us as
          we embark on extraordinary voyages and contribute to the advancement
          of space exploration and the awe-inspiring wonder of the cosmos.
        </p>
      </div>
    </section>
  );
};

export default About;
