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
          Welcome to Vetmedman, your trusted partner in providing top-quality
          medical equipment and supplies for veterinary doctors and hospitals.
          We are passionate about delivering excellence and ensuring customer
          satisfaction. With a comprehensive range of products sourced from
          leading manufacturers, we offer innovative solutions to meet the
          unique needs of each customer. Our dedicated team provides
          personalized assistance, reliable after-sales support, and prompt
          delivery. Together, let's contribute to the advancement of animal care
          and the well-being of our beloved companions
        </p>
      </div>
    </section>
  );
};

export default About;
