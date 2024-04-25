import logo from "../assets/images/Logo.webp";
import media from "../assets/images/media-contact.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    return () => {
      document.body.removeChild(addScript);
      delete window.googleTranslateElementInit;
    };
  }, []);
  return (
    <footer className="bg-gray-800 text-white pt-5 ">
      <div className="px-6 md:px-14">
        <div className="px-6 md:px-14">
          <div className="flex flex-col gap-5 md:flex-row justify-between">
            <div className="flex md:flex-col  w-full md:w-fit  justify-between md:justify-start gap-4 items-center">
              <div className="w-24 md:w-32">
                <img src={logo} alt="logo" className="block " />
              </div>
              <div className="footer-icons flex gap-2 justify-between items-center scale-125 z-20 ">
              <FaInstagram />
              <FaTwitter />
              <FaYoutube  />
              <FaFacebook />
              </div>
            </div>
            <div className="flex flex-wrap text-sm md:text-base md:justify-end md:gap-20 text-gray-300">
              <div className="flex flex-col gap-3 my-3 w-1/2 md:w-fit ">
                <Link
                  to={"/aboutus"}
                  className="hover:underline w-fit hover:text-teal-400 hover:cursor-pointer transition-all duration-150"
                >
                  About Us
                </Link>

                <Link
                  to={"/allarticles"}
                  className="hover:underline w-fit hover:text-teal-400 hover:cursor-pointer transition-all duration-150"
                >
                  Articles & Blogs
                </Link>
                <Link
                  to={"/faqs"}
                  className="hover:underline w-fit hover:text-teal-400 hover:cursor-pointer transition-all duration-150"
                >
                  FAQ's
                </Link>
              </div>
              <div className="flex flex-col gap-3 my-3 w-1/2 md:w-fit ">
                <Link
                  to="/shipping&return"
                  className="hover:underline hover:text-teal-400 hover:cursor-pointer transition-all duration-150"
                >
                  Shipping Information
                </Link>
                <div className="flex items-center gap-1">
                  <a
                    href="mailto:support@vetmedman.com"
                    className="hover:underline hover:text-teal-400 hover:cursor-pointer transition-all duration-150"
                  >
                    support@vetmedman
                  </a>
                  <img src={media} alt="mail" className="h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <a
                    href="tel:+919773727759"
                    className="hover:underline hover:text-teal-400 hover:cursor-pointer transition-all duration-150"
                  >
                    +91 9773727759
                  </a>
                </div>
              </div>
              <div className="flex gap-6 items-center w-full md:w-fit justify-stat mt-5">
                <a to="#" className="flex items-center">
                  <div id="google_translate_element"></div>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full  h-[1px]  opacity-40 mt-9 bg-gray-300"></div>
          <div className="text-sm md:text-base flex flex-col md:flex-row items-center py-2 justify-between ">
            <div className="flex mt-2 text-gray-400">
              &#169;2023 Vetmedman. All Rights Reserved
            </div>
            <div className="flex gap-2 md:gap-4 text-xs lg:text-base mt-2 ">
              <Link
                to={"/privacypolicy"}
                className="hover:text-teal-400 hover:cursor-pointer transition-all duration-150"
              >
                Privacy Policy
              </Link>
              <Link
                className="hover:text-teal-400 hover:cursor-pointer transition-all duration-150"
                to={"/termsandconditions"}
              >
                Terms & Conditions
              </Link>
              <Link
                to={"/legalnotice"}
                className="hover:text-teal-400 hover:cursor-pointer transition-all duration-150"
              >
                Legal Notice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
