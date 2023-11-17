"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import useCountdownTimer from "@/app/products/useCountdownTimer";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Banner() {
  const endTime = "2023-12-30T23:59:59";
  const timeLeft1 = useCountdownTimer(endTime);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeLeft(timeLeft1);
    }
  }, [timeLeft1]);

  const images = ["/banner-1.png", "/banner-2.png", "/banner-3.png"];
  const icons = [
    {
      image: "https://salt.tikicdn.com/cache/100x100/ts/upload/cb/64/f7/0ebb0ae297f052e34a8161c9bf8efb96.png.webp",
      title: "Astra Reward",
      src: "/minigame/wheel1",
    },
    {
      image: "https://salt.tikicdn.com/cache/100x100/ts/upload/ae/72/a3/d4503c3ece932dc8c57d2d5c97cd6ffc.png.webp",
      title: "Cheap every day",
      src: "/products",
    },
    {
      image: "https://salt.tikicdn.com/cache/100x100/ts/upload/3c/ce/96/db8c083610e45b78d8f7662f0013faa8.png.webp",
      title: "Discharge",
      src: "/products",
    },
    {
      image: "https://salt.tikicdn.com/cache/100x100/ts/upload/20/68/cf/6d4adbdbcd1c35b0a438a655d9a420d0.png.webp",
      title: "Discount code",
      src: "/minigame/wheel2",
    },
    {
      image: "https://salt.tikicdn.com/cache/100x100/ts/upload/1e/27/a7/e2c0e40b6dc45a3b5b0a8e59e2536f23.png.webp",
      title: "Preferential wallet cards",
      src: "/minigame/wheel2",
    },
    {
      image: "https://salt.tikicdn.com/cache/100x100/ts/tmp/6f/4e/41/93f72f323d5b42207ab851dfa39d44fb.png.webp",
      title: "Buy in advance",
      src: "/minigame/bingo",
    },
    {
      image: "https://salt.tikicdn.com/cache/100x100/ts/upload/3c/ce/96/db8c083610e45b78d8f7662f0013faa8.png.webp",
      title: "Discharge",
      src: "/minigame/dice",
    },
  ];
  return (
    <>
      <main className="grid grid-cols-1  lg:grid-cols-5 justify-center items-center gap-2 mt-8 container px-2">
        <div className="hidden lg:block bg-white shadow-md  p-5 text-base rounded  h-full w-full    ">
          <h3 className="mb-3 font-medium text-emerald-500 hover:text-blue-500 cursor-pointer">Nổi Bật</h3>
          <ul>
            {icons.map((icon, index) => (
              <Link key={index} href={icon.src}>
                <li className="flex hover:bg-slate-200 hover:text-emerald-600 mb-1 p-3 rounded-md cursor-pointer">
                  <img className="max-w-[20px] object-scale-down mr-2 " src={icon.image} alt="" />
                  {icon.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper rounded-md shadow-md   lg:col-start-2 lg:col-end-5 lg:col-span-3 w-full"
          style={{
            "--swiper-navigation-color": "#F8F8F8",
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="" src={image} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="hidden lg:block lg:col-start-5  shadow-md  h-full cursor-pointer rounded-md  overflow-hidden relative">
          <Link href="/products">
            <img className=" h-full  object-cover  duration-500  hover:scale-110" src="/sale.png" alt="" />{" "}
          </Link>

          <div className="p-2 flex  absolute top-2 left-2 bg-white rounded-md ">
            <img
              className="inline max-w-[100px] mr-2 object-scale-down"
              src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_flashSale_home_white_new.png"
              alt=""
            />

            {timeLeft ? (
              <div>
                <span className="bg-red-600 text-white rounded p-2">{timeLeft.hours.toString().padStart(2, "0")}</span>
                <span className="text-xl">:</span>
                <span className="bg-red-600 text-white rounded p-2">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </span>
                <span className="text-xl">:</span>
                <span className="bg-red-600 text-white rounded p-2">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </span>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <Link
            className="absolute bottom-2 right-5 text-white font-medium group hover:text-emerald-500 flex items-center justify-center"
            href="/products"
          >
            <span>Xem Thêm</span>
            <svg
              className="fill-white  ml-1 group-hover:fill-emerald-500 "
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </Link>
        </div>
      </main>
    </>
  );
}
