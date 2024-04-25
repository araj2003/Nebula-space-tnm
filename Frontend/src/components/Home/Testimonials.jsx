import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@mui/material";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import axios from "axios";
import { API_URL } from "../../api";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Testimonial.css";

function Testimonials() {
  const [testimonials, setTestimonials] = useState(Array.from({ length: 4 }));
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_URL}/home/testimonials`);
        setTestimonials(response.data.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchTestimonials();

    const handleResize = () => {
      const innerWidth = window.innerWidth;

      // Adjust slidesPerView based on the inner width
      if (innerWidth < 768) {
        setSlidesPerView(1.4); // Mobile view
      } else if (innerWidth < 1024) {
        setSlidesPerView(2); // Tablet view
      } else {
        setSlidesPerView(2.45); // Default view
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial state
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-[95%] sm:w-[90%] lg:w-[85%] mx-auto my-5">
      <h2 className="text-2xl text-center lg:text-3xl font-semibold text-zinc-800 mb-8 relative w-fit mx-auto">
        <div className="bg-[#FAFAFA] h-20 w-20 absolute opacity-70 top-0 left-0"></div>
        <div className="bg-[#FAFAFA] h-20 w-20 absolute opacity-70 top-0 right-0"></div>
        <span className="hidden md:inline">- - - - - -</span> - - - - - -
        Testimonials - - - - - -{" "}
        <span className="hidden md:inline">- - - - - -</span>
      </h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={slidesPerView}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        autoplay={{
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="py-2 px-0 relative testimonial"
      >
        {testimonials?.map((testimonial) => (
          <SwiperSlide
            key={Date.now() + Math.random() * 100}
            className="rounded-2xl shadow !text-gray-700 !bg-white overflow-hidden"
          >
            <div className="h-[25rem] sm:h-[22rem] lg:h-[35rem] flex flex-col items-center justify-center gap-3 py-4 lg:py-0 px-6">
              <img
                src={testimonial?.image}
                alt={`testimonial-${testimonial?.id}`}
                className="rounded-full aspect-square h-20 lg:h-[27.5%]"
              />
              <h1 className="lg:text-3xl font-semibold text-center">
                {testimonial?.name}
              </h1>
              <p className="text-sm lg:text-base">{testimonial?.designation}</p>
              {testimonial?.Rating && (
                <Rating
                  value={testimonial?.Rating}
                  readOnly
                  className="rating"
                  name="rating"
                />
              )}
              <p className="text-sm lg:text-lg text-center lg:text-left">
                {testimonial?.review}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Testimonials;
