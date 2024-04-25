import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation , Autoplay} from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../api";
import ReactHtmlParser from "react-html-parser";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_URL}/home/articles/top`);
        // console.log(response.data);
        setArticles(response.data);
      } catch (error) {
        // console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section
      id="articles"
      className="w-[95%] sm:w-[90%] lg:w-[85%] mx-auto bg-white container p-3"
    >
      <h2 className="text-2xl lg:text-3xl font-semibold  px-6 md:px-10 mb-5">
        Latest Articles
      </h2>
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        slidesPerView={1}
				autoplay={{
          disableOnInteraction: false,
          delay: 5000,
        }}  
      >
        {articles.map((article) => (
          <SwiperSlide
            className="flex  lg:flex-row pmd:py-10 px-6  lg:px-14 gap-4 sm:gap-7 lg:gap-20 lg:py-5"
            key={article._id}
          >
            <div className="relative   lg:mt-8 ">
              <img
                src={article.img}
                alt="img"
                className="w-[22vw] block  aspect-[0.6] lg:aspect-[0.75] shadow rounded-lg overflow-hidden object-cover z-20 lg:absolute -right-8 -top-8"
              />
              <div className="w-[21vw] aspect-[0.75] bg-teal-600 rounded-lg hidden lg:block" />
            </div>
            <div className="h-full self-start text-left flex flex-col gap-3 mt-2 lg:mt-5 w-3/5 lg:w-4/5">
              <h2 className="text-zinc-900 text-xl sm:text-2xl lg:text-4xl font-bold line-clamp-1 lg:line-clamp-2">
                {article.title}
              </h2>
              <p className="text-neutral-500 text-base sm:text-xl lg:text-2xl font-semibold line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">
                {article.description}
              </p>
              <div className="hidden md:block">
                {article?.content &&
                  ReactHtmlParser(article?.content.substring(0, 250) + "...")}
              </div>
              <Link
                to={`/allarticles/${article._id}`}
                className="w-fit px-3 py-1.5 sm:px-4 sm:py-2 text-white grid place-content-center text-sm lg:text-base font-medium capitalize bg-teal-600 rounded-[5px] my-2  hover:bg-teal-700 active:bg-teal-800 transition-all"
              >
                Read more
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Articles;
