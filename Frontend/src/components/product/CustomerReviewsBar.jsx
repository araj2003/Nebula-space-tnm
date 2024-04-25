import React from "react";
import { AiFillStar } from "react-icons/ai";
import RatingsBar from "./RatingsBar";
import { Rating } from "@mui/material";

const CustomerReviewsBar = ({ avg_rating, total_no_of_reviews, reviews }) => {
  return (
    <div className="my-1 p-5 items-center md:py-7 pl-7 flex flex-col border-2 ">
      <div className="flex flex-col gap-2 lg:flex-row w-full ">
        <div className="lg:w-2/5 pt-2 md:pt-5">
          <div className="flex gap-2 items-center">
            {avg_rating && (
              <span className="text-3xl md:text-5xl">{avg_rating.toFixed(1)}</span>
            )}
            <div className="flex flex-col gap-1">
              {avg_rating && (
                <div className="flex">
                  <Rating value={avg_rating} readOnly precision={0.1} size="small"/>
                </div>
              )}
              {total_no_of_reviews && (
                <div className="text-gray-600 text-xs md:text-base ml-1">
                  {total_no_of_reviews} reviews
                </div>
              )}
            </div>
          </div>
        </div>
        {reviews && <RatingsBar reviews={reviews} />}
      </div>
    </div>
  );
};

export default CustomerReviewsBar;
