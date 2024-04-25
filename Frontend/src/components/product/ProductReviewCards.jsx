import { Rating } from "@mui/material";
import React from "react";

import { AiFillStar } from "react-icons/ai";
const ProductReviewCard = ({ reviews }) => {
  return (
    <div className=" flex flex-col gap-5">
      {reviews.map((review) => (
        <div key={review._id} className="border-2 p-4 flex flex-col">
          <h2 className="md:text-[18px] font-semibold">{review.name}</h2>
          <p className="text-xs text-gray-600 mb-1">{review.designation}</p>
          {review.Rating && (
            <Rating
              name="simple-controlled"
              value={review.Rating}
              readOnly
              className="mb-5"
              size="small"
              precision={0.1}
            />
          )}
          
          <span className="capitalize font-semibold text-sm md:text-base text-gray-800">
            "{review.Title}"
          </span>
          <p className="text-xs my-1.5 text-gray-600">{review.Review}</p>
          <p className="mt-4 text-[10px] text-gray-500">
            {review.date}, {review.country}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviewCard;
