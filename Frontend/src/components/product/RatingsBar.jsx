import React from "react";

const RatingsBar = ({ reviews }) => {
  // Initialize counts for each rating category
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  // Count the number of reviews for each rating category
  reviews.forEach((review) => {
    ratingCounts[review.Rating] += 1;
  });

  // Calculate the total number of ratings
  const totalRatings = reviews.length;

  return (
    <div className="w-full lg:w-1/2">
      <div className="flex items-center mb-2"></div>

      <div className="flex items-center mt-2">
        <a
          
          className="text-sm md:text-base font-medium capitalize  w-12"
        >
          5 star
        </a>
        <div className="w-2/4 h-3.5 md:h-5 mx-2 bg-[#D9D9D9] rounded-lg overflow-hidden">
          <div
            className="h-3.5 md:h-5 bg-[#F7A617] rounded-lg "
            style={{
              width: `${(ratingCounts[5] / totalRatings) * 100}%`,
            }}
          ></div>
        </div>
        <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
          {((ratingCounts[5] / totalRatings) * 100).toFixed(2)}%
        </span>
      </div>

      <div className="flex items-center mt-2">
        <a
          
          className="text-sm md:text-base font-medium capitalize  w-12"
        >
          4 star
        </a>
        <div className="w-2/4 h-3.5 md:h-5 mx-2 bg-[#D9D9D9] rounded-lg overflow-hidden">
          <div
            className="h-3.5 md:h-5 bg-[#F7A617] rounded-lg "
            style={{
              width: `${(ratingCounts[4] / totalRatings) * 100}%`,
            }}
          ></div>
        </div>
        <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
          {((ratingCounts[4] / totalRatings) * 100).toFixed(2)}%
        </span>
      </div>

      <div className="flex items-center mt-2">
        <a
          
          className="text-sm md:text-base font-medium capitalize  w-12"
        >
          3 star
        </a>
        <div className="w-2/4 h-3.5 md:h-5 mx-2 bg-[#D9D9D9] rounded-lg overflow-hidden">
          <div
            className="h-3.5 md:h-5 bg-[#F7A617] rounded-lg "
            style={{
              width: `${(ratingCounts[3] / totalRatings) * 100}%`,
            }}
          ></div>
        </div>
        <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
          {((ratingCounts[3] / totalRatings) * 100).toFixed(2)}%
        </span>
      </div>

      <div className="flex items-center mt-2">
        <a
          
          className="text-sm md:text-base font-medium capitalize  w-12"
        >
          2 star
        </a>
        <div className="w-2/4 h-3.5 md:h-5 mx-2 bg-[#D9D9D9] rounded-lg overflow-hidden">
          <div
            className="h-3.5 md:h-5 bg-[#F7A617] rounded-lg "
            style={{
              width: `${(ratingCounts[2] / totalRatings) * 100}%`,
            }}
          ></div>
        </div>
        <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
          {((ratingCounts[2] / totalRatings) * 100).toFixed(2)}%
        </span>
      </div>

      <div className="flex items-center mt-2">
        <a
          
          className="text-sm md:text-base font-medium capitalize  w-12"
        >
          1 star
        </a>
        <div className="w-2/4 h-3.5 md:h-5 mx-2 bg-[#D9D9D9] rounded-lg overflow-hidden">
          <div
            className="h-3.5 md:h-5 bg-[#F7A617] rounded-lg "
            style={{
              width: `${(ratingCounts[1] / totalRatings) * 100}%`,
            }}
          ></div>
        </div>
        <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
          {((ratingCounts[1] / totalRatings) * 100).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default RatingsBar;
