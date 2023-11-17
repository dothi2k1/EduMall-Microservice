import React from "react";
import { motion } from "framer-motion";

function ImgLeft_2() {
  return (
    <div className="py-10 lg:py-20 px-5 container lg:w-11/12 mx-auto">
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
        <div className="flex justify-end">
          <img
            alt="Girl"
            loading="lazy"
            decoding="async"
            data-nimg={1}
            className="object-cover order-last lg:order-first w-[382px] h-[215] rounded-[20px] lg:h-[315px] lg:w-full lg:rounded-2xl overflow-hidden flex justify-end"
            srcSet="https://images.squarespace-cdn.com/content/v1/60679cdd16f7bc3d0045f7eb/cd51ac1b-a602-4b38-923c-98f39fb749d4/1B.jpg"
            style={{ color: "transparent" }}
          />
        </div>
        <div className="">
          <h2 className="text-heading-4 lg:text-heading-2 text-secondary-100">
            <p className="text-heading-4 lg:text-heading-2 mt-2 mb-7 text-4xl font-bold text-emerald-700">
              Award & Exhibition
            </p>
          </h2>
          <div className="">
            <p className="font-sans text-gray-700 text-justify">
              The company&apos;s products are always cared for by skilled gardeners. They always work hard to create the
              best quality crop works.
              <br />
              <br />
              We have one of East Tennessee&apos;s largest selections of gifts and collectibles including Corinthian
              Bells, Willow Tree, Joseph&apos;s Studio by Roman, Inc. angels and inspirational keepsakes, and more.
              <br />
              <br />
              In 2023, we continue to surpass many other companies to receive Asia&apos;s top World Travel Awards for
              the 5th time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImgLeft_2;
