import { Link } from "react-router-dom";
import img from "../assets/images/404.png";

const Error = () => {
  return (
    <div className="fixed inset-0 w-screen min-h-screen bg-white flex justify-center items-center  px-4 z-50 ">
      <div className="flex flex-col md:flex-row md:w-4/5 justify-center items-center gap-5">
        <img src={img} alt="img" className="w-2/5 lg:w-1/3 " />
        <div className="md:w-3/5 flex flex-col gap-5 items-center md:items-start">
          <h2 className="text-3xl md:text-6xl font-semibold mb-2 text-teal-700">
            Oops, Product Missing!
          </h2>
          <div className="text-base md:text-lg space-y-2">
            <p>
              We regret to inform you that the product you're searching for is
              currently unavailable with us. For personalized assistance and to
              explore alternative solutions, kindly reach out to our dedicated
              support team.
            </p>
            <p>
              Contact us via email at{" "}
              <a
                href="mailto:support@Space Wonders.com"
                className="text-teal-700 italic hover:underline"
              >
                support@Space Wonders.com
              </a>
              , and our team will respond to your inquiries within 72 hours. For
              immediate assistance and expedited services, you can also reach us
              by phone at{" "}
              <a
                href="tel:+919773727759"
                className="text-teal-700 italic hover:underline"
              >
                +91-9773727759
              </a>
              .
            </p>
            <p>
              Thank you for your understanding, and we look forward to serving
              you with the best possible solutions for your needs.
            </p>
          </div>
          <Link
            to={"/"}
            className="mt-4 py-2.5 px-6 bg-teal-600  hover:bg-teal-700 active:bg-teal-800 transition-all duration-100 rounded-md flex w-fit uppercase text-base font-medium text-white items-center gap-1.5"
          >
            <span>Homepage</span>
            <svg
              className="h-4 mb-1 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
