import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function SlideImage({ images, urlDefault }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imgProduct, setImgProduct] = useState(urlDefault);
  const [hoverImgIndex, setHoverImgIndex] = useState(0);

  const handleImageClick = (index) => {
    setHoverImgIndex(index);
    setIsOpen(true);
    console.log(hoverImgIndex);
    console.log("Click image !!");
  };

  if (images.length === 0) {
    return <div className="text-center text-xl">Không có ảnh để hiển thị.</div>;
  }

  return (
    <div className="">
      <div className="relative group cursor-pointer ">
        <img
          onClick={() => handleImageClick(hoverImgIndex)}
          src={imgProduct ? imgProduct : images[0]}
          className="w-[540px] h-[405px] mx-auto mb-12"
        />
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={5}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="rounded p-1 w-[70px] h-[70px] hover:border-[3px] border-emerald-500"
              onMouseOver={(e) => {
                setHoverImgIndex(index);
                setImgProduct(e.target.src);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
