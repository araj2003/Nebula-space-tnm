import ProductCard from "../product/ProductCard.jsx";
import { useEffect, useState } from "react";
import { API_URL } from "../../api.jsx";
import axios from "axios";

const FeaturedProducts = ({ featured }) => {
  return (
    <>
      <section className="w-[97.5%] sm:w-[90%] lg:w-[85%] mx-auto bg-white p-2 md:p-5 rounded-xl">
        <h2 className="text-2xl lg:text-3xl font-semibold  px-3 mb-5">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
          {featured &&
            featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
