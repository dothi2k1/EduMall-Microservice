"use client";

import React from "react";
import Button from "./Button";
import Star from "./Star";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const singelWord = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 3,
    },
  },
};

function Avatar({ imgAvatar }) {
  return (
    <img
      alt="avatar"
      loading="lazy"
      width={96}
      height={96}
      decoding="async"
      data-nimg={1}
      className="object-cover inline-block h-12 w-12 rounded-full ring-2 ring-white"
      style={{ color: "transparent" }}
      src={imgAvatar.url}
    />
  );
}

function HeroTitle() {
  const imgSlide = [
    {
      id: 1,
      url: "https://img.freepik.com/premium-photo/top-view-handmade-wrapped-present-boxes_47840-685.jpg",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1634801634476-2d98226094fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGFuZGljcmFmdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1560347964-838d2f63cdc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    },
    {
      id: 4,
      url: "https://media.istockphoto.com/id/1346636854/photo/craft-hobby-background-with-yarn-in-natural-colors.webp?b=1&s=170667a&w=0&k=20&c=RP48ZJny9v91kU0PmFomm1prHNvgP2gAAtbVP2MDSFE=",
    },
  ];
  const imgAvatars = [
    {
      id: 1,
      url: "https://i.pinimg.com/564x/81/c9/32/81c9320106f3c17c506814960bf6bc9d.jpg",
    },
    {
      id: 2,
      url: "https://i.pinimg.com/564x/fa/d3/cb/fad3cb3a915afbe34220db884a910e64.jpg",
    },
    {
      id: 3,
      url: "https://i.pinimg.com/564x/7c/db/ed/7cdbed1c2eb8d901655c8053206fae58.jpg",
    },
    {
      id: 4,
      url: "https://i.pinimg.com/736x/71/77/b7/7177b782f387c916d4e8c29a9a207148.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (currentIndex <= imgSlide.length - 2) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 3000);
  });
  return (
    <main className="relative bg-primary-10 lg:h-1/2 ">
      <div
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/top-view-handmade-wrapped-present-boxes_47840-685.jpg)",
          backgroundImage: "url(" + imgSlide[currentIndex].url + ")",
        }}
        className=" relative w-full bg-center bg-cover bg-no-repeat lg:absolute lg:h-1/2 duration-1000"
      >
        {/* <img
          alt="Cake"
          loading="lazy"
          width={1382}
          height={1488}
          decoding="async"
          data-nimg={1}
          className="scale-90 pt-20 lg:-ml-10 lg:origin-top-right lg:scale-[.48] lg:pt-40 2xl:scale-[.60] "
          style={{ color: "transparent" }}
          srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-cake.66640afa.png&w=1920&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-cake.66640afa.png&w=3840&q=75 2x"
          src=""
        /> */}
      </div>
      <div className="lg:flex lg:h-1/2 lg:items-center px-5 ">
        <div className="container z-10 mt-0 lg:mt-14 px-10">
          {/* <div className="z-0 w-12 absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          <div className="z-0 w-12 absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-2 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div> */}
          <h3 className="text-caption-2 lg:text-caption-1 text-primary-100 text-emerald-700 text-4xl  font-bold mb-5">
            Welcome to Venus Handicrafts
          </h3>
          <h1 className="inline-block lg:text-heading-1 text-heading-3 mt-2 leading-[46px] text-secondary-100 lg:mt-4 lg:leading-[84px] text-gray-900 text-6xl font-sans font-bold mb-5">
            <motion.span variants={singelWord} initial="initial" animate="animate" className="inline-block text-black">
              Super Impressive Products <br /> Special for You
            </motion.span>
          </h1>
          <p className="text-body-1 mt-2 text-lg lg:mt-6 text-justify text-gray-900">
            Order your favorites handicrafts products from anywhere and <br /> get delivery at your door
          </p>
          <div className="mt-2 flex space-x-4 lg:mt-2">
            <button className="bg-emerald-700 rounded-full px-5 py-3 border-2 p-1 duration-300 hover:bg-emerald-700 hover:text-white mt-6 text-white">
              <Link href="/products" className="flex items-center">
                Order Now
              </Link>
            </button>
            <button className="border-emerald-700 rounded-full px-5 py-3 border-2 p-1 duration-300 hover:bg-emerald-700 hover:text-white mt-6 text-emerald-700">
              <Link href="/about" className="flex items-center">
                Learn More
              </Link>
            </button>
          </div>
          <div className="mt-8 flex items-center space-x-4 lg:mt-10">
            <div className="flex -space-x-2 overflow-hidden">
              {imgAvatars.map((imgAvatar) => {
                return <Avatar key={imgAvatar.id} imgAvatar={imgAvatar} />;
              })}
            </div>
            <div>
              <p className="text-gray-900 font-sans font-bold">Our Happy Customers</p>
              <div className="flex items-center space-x-1">
                <Star />
                <p className="text-gray-900 font-sans font-bold">4.9</p>
                <p className="text-gray-900 font-sans font-bold">(12.8k reviews)</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pb-10 lg:mt-9 lg:pb-0">
            <p className="text-body-1 mt-2 text-lg lg:mt-6 text-justify text-gray-900 ">
              For Better Service Download Our Mobile App Now
            </p>
            <div className="mt-4 flex space-x-4">
              <a target="_blank" href="https://play.google.com/store/apps">
                <button className="w-[175px]">
                  <img
                    alt="Google Play"
                    loading="lazy"
                    width={350}
                    height={104}
                    decoding="async"
                    data-nimg={1}
                    style={{ color: "transparent" }}
                    // srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-google-play.b38a8ee1.png&w=384&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-google-play.b38a8ee1.png&w=750&q=75 2x"
                    src="https://fofood-store.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-google-play.b38a8ee1.png&w=384&q=75"
                  />
                </button>
              </a>
              <a target="_blank" href="https://www.apple.com/vn/app-store/">
                <button className="w-[175px]">
                  <img
                    alt="Apple Store"
                    loading="lazy"
                    width={346}
                    height={104}
                    decoding="async"
                    data-nimg={1}
                    style={{ color: "transparent" }}
                    // srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-app-store.5a939cd8.png&w=384&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-app-store.5a939cd8.png&w=750&q=75 2x"
                    src="https://fofood-store.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtn-app-store.5a939cd8.png&w=384&q=75"
                  />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HeroTitle;
