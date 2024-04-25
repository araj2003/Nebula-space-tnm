import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import SmallAds from "./SmallAds";
import { API_URL } from "../../api";

const Ads = () => {
  const [bigBanners, setBigBanners] = useState([
    "https://i.imgur.com/Gv3Wt0L.png",
  ]);

  const fetchBigBanner = async () => {
    try {
      const response = await axios.get(`${API_URL}/home/banner/big`);
      setBigBanners(response.data.data.bigBanner);
      // console.log(response.data.data.bigBanner);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchBigBanner();
  }, []);

  return (
    <div className="flex  justify-center items-center w-[95%] sm:w-[90%] lg:w-[85%] mx-auto ">
      {bigBanners?.map((item, index) => (
        <div key={index} className="max-w-full">
          <img src={item} alt={`Ad ${index + 1}`} />
        </div>
      ))}

    </div>
  );
};

export default Ads;
