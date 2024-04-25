import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';



// import required modules
import { FreeMode, Navigation, Thumbs, Pagination,Virtual } from 'swiper/modules';


export default function ProductImages({images}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className='product-images  overflow-hidden rounded-lg '>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination, Virtual]}
        virtual
        className="mySwiper2"
      > 
      {images?.map((image) => (
        <SwiperSlide>
          <img src={image} loading='lazy'/>
        </SwiperSlide>
      )
      )}
       
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper "
      >
       {images?.map((image) => (
        <SwiperSlide>
          <img src={image} />
        </SwiperSlide>
      )
      )}
      </Swiper>
      <style>
        {`
        
        .product-images{
          position: relative;
        }
        .mySwiper {
          height: 20%;
          box-sizing: border-box;
          padding: 10px 0;
        }
        
        .product-images .mySwiper .swiper-slide {
          width: 25%;
          height: 100%;
          opacity: 0.4;
        }
       
        
        .product-images .mySwiper .swiper-slide-thumb-active {
          opacity: 1;
          box-shadow: 0px 0px 2px gray;
        }
        
        .product-images .swiper-button-prev,.product-images .swiper-button-next {
          top: 40% !important;
          color: #1F2937 !important;
          scale : 0.8;
        }
        .product-images .swiper-button-prev{
          left: 2px !important;
        }
        .product-images .swiper-button-next{
          right: 2px !important;
        }
        `}
      </style>
    </div>
  );
}
