import { Rating } from "@mui/material";

const Ratings = ({ ratings }) => {
  return (
    <div className="flex flex-col  items-center text-[14px]  justify-between  my-1 ">
        
        <Rating
          readOnly
          value={ratings.avg_rating}
          precision={0.1}
          size="small"
          className="mb-1"
        />
      <p className=" hidden md:flex text-gray-200 font-medium ">
        {ratings.total_no_of_reviews} Reviews
      </p>
      <style>
        {`
        {
          .css-1lauo1g-MuiRating-root{
            font-size: 15px !important;
          }
        }`}
      </style>
    </div>
  );
};

export default Ratings;
