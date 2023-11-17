import React, { useState } from "react";
import useCountdownTimer from "./useCountdownTimer";
import Link from "next/link";

const FlashSale = ({ products, endTime }) => {
  const timeLeft = useCountdownTimer(endTime);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  const slidesPerView = 5;
  const slidesPerGroup = 10;
  const totalSlides = products.length;
  const totalGroups = Math.ceil(totalSlides / slidesPerGroup);

  const handleNextSlide = () => {
    const nextSlideIndex = activeSlideIndex + slidesPerView;
    if (nextSlideIndex < totalSlides) {
      setActiveSlideIndex(nextSlideIndex);
    } else if (nextSlideIndex >= totalSlides && activeSlideIndex < totalSlides - slidesPerView) {
      setActiveSlideIndex(totalSlides - slidesPerView);
    }
  };

  const handlePrevSlide = () => {
    const prevSlideIndex = activeSlideIndex - slidesPerView;
    if (prevSlideIndex >= 0) {
      setActiveSlideIndex(prevSlideIndex);
    } else if (prevSlideIndex < 0 && activeSlideIndex > 0) {
      setActiveSlideIndex(0);
    }
  };

  const renderSlides = () => {
    const slides = [];
    for (let i = activeSlideIndex; i < activeSlideIndex + slidesPerGroup; i++) {
      if (i < totalSlides) {
        const product = products[i];
        const sale = Math.floor(Math.random() * 100);

        slides.push(
          <li
            key={i}
            className="relative flex flex-col bg- ml-2 rounded cursor-pointer border  border-emerald-500 hover:bg-emerald-200 shadow-md bo hover:shadow-lg"
          >
            <Link href={`/products/${product.product_id}`}>
              <img
                className="max-w-[100px] aspect-square rounded-3xl p-2 object-scale-down filter brightness-110 saturate-100"
                src={product.thumb_image_url}
                alt=""
              />
            </Link>
            <p className=" text-rose-500 font-semibold text-sm mx-auto p-2">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format((product.price * (100 - sale)) / 100)}
            </p>
            <div className="p-0.5 text-xs font-medium absolute top-2 left-2 text-red-600 rounded bg-red-100">
              {sale}%
            </div>
          </li>,
        );
      }
    }
    return slides;
  };

  return (
    <>
      <div className="rounded bg-white shadow-md p-3 w-full container mt-2">
        <div className="flex justify-between items-center">
          <div className="p-4 rounded-lg ">
            <img
              className="inline max-w-[100px] mr-2"
              src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_flashSale_home_white_new.png"
              alt=""
            />
            <span className="bg-red-600 text-white rounded p-2 ">{timeLeft.hours.toString().padStart(2, "0")}</span>
            <span className="text-xl">:</span>
            <span className="bg-red-600 text-white rounded p-2">{timeLeft.minutes.toString().padStart(2, "0")}</span>
            <span className="text-xl">:</span>
            <span className="bg-red-600 text-white rounded p-2 ">{timeLeft.seconds.toString().padStart(2, "0")}</span>
          </div>
          <Link href="/products">
            <div className="text-red-600 font-semibold flex items-center">
              <span>Xem Thêm</span>
              <svg className="fill-red-600 ml-1 " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </svg>
            </div>
          </Link>
        </div>

        <div className="overflow-hidden relative">
          <ul className="flex overflow-x-auto ">{renderSlides()}</ul>
          <button onClick={handlePrevSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              className="absolute top-1/4 rotate-180 text-3xl left-0 fill-emerald-300 hover:fill-emerald-500"
            >
              <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
            </svg>
          </button>
          <button onClick={handleNextSlide}>
            <svg
              className="absolute top-1/4 right-0 text-3xl fill-emerald-300 hover:fill-emerald-500"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default FlashSale;
