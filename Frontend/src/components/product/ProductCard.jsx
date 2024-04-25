import React from "react";
import Ratings from "./Ratings";
import { Link } from "react-router-dom";
import { BiCartAdd } from "react-icons/bi";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="product-card-link max-w-[400px]  lg:max-w-[290px]  p-4  shadow lg:shadow-none rounded-md transition-all duration-200 hover:ring-[2px] ring-teal-300 bg-white "
    >
      <div
        className="min-h-fit flex flex-col items-center  gap-1.5"
        key={product._id}
      >
        <figure className="w-full lg:shadow-md  flex justify-center items-center rounded-xl p-2">
          <img
            src={product.images[0]}
            alt="img"
            className=" object-cover w-full aspect-square"
            loading="lazy"
          />
        </figure>
        <div className="flex flex-col justify-between mt-2 md:mt-4 w-full">
          <h2 className="w-full  truncate  capitalize md:text-left text-center sm:text-lg  md:text-xl font-medium text-zinc-800">
            {product?.productTitle.toLowerCase()} &nbsp;
            {product?.weight_of_the_commodity}
          </h2>
        </div>
        <div className="line-clamp-2 md:line-clamp-3 text-[0.95rem] text-[#797979] font-medium">
          {product?.description}
        </div>
        <div className="flex items-center justify-between  w-full flex-col-reverse gap-1 md:flex-row">
          <button className="bg-teal-600 px-4 font-medium  justify-center text-sm text-center md:text-base text-white py-1.5 sm:py-2 hover:bg-teal-700 active:bg-teal-800 transition-all duration-100 rounded-lg  w-full md:w-fit flex sm:gap-2 items-center">
            <p className="whitespace-nowrap">More Details</p>
          </button>
          <div className="lg:mr-4">{product && <Ratings ratings={product} />}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
