import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../api";
const SmallAds = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [smallBanners, setSmallBanners] = useState([]);

  const fetchBigBanner = async () => {
    try {
      const response = await axios.get(`${API_URL}/home/banner/small`);
      setSmallBanners(response.data.data.smallBanner);
      // console.log(response.data.data.smallBanner);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchBigBanner();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % smallBanners.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [smallBanners.length]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(true);
    setCurrentImage((prevImage) => (prevImage + 1) % smallBanners.length);
  };

  return (
    <div
      className="max-w-[140px] sm:max-w-none sm:w-60 lg:h-72 lg:w-72 object-cover"
      
    >
      {smallBanners.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="Adsshort"
          className={`ad-image-item ${index === currentImage ? "active" : ""}`}
          style={{
            display: index === currentImage ? "block" : "none",
            width: "100%", // Set a fixed height to maintain image dimensions
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ))}
    </div>
  );
};

export default SmallAds;
