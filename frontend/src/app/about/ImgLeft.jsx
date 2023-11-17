import React from "react";
import { motion } from "framer-motion";

function ImgLeft() {
  return (
    <div className="py-10 lg:py-20 px-5 container lg:w-11/12 mx-auto">
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
        <div className="flex justify-end">
          <img
            alt="Girl"
            loading="lazy"
            decoding="async"
            data-nimg={1}
            className="object-cover order-last lg:order-first w-[382px] h-5/6 rounded-[20px] lg:w-full lg:rounded-2xl overflow-hidden flex justify-end"
            srcSet="https://www.plantz.com/wp-content/uploads/2019/07/decorating-with-plants-1024x682.jpeg"
            style={{ color: "transparent" }}
          />
        </div>
        <div className=" mt-10 ">
          <h2 className="text-heading-4 lg:text-heading-2 text-secondary-100">
            <p className="text-heading-4 lg:text-heading-2 mt-2 mb-7 text-4xl font-bold text-emerald-700">
              Our Goad & Mission
            </p>
          </h2>
          <div className="">
            <p className="font-sans text-gray-700 text-justify">
              At Udemy, our mission is to inspire green spaces by connecting people with plants.
              <br />
              <br />
              We believe a strong relationship with plants will lead to greener and more sustainable lifestyles.
              <br />
              <br />
              Through our nursery partners on the west coast and throughout the country, we deliver healthy, happy
              plants to you and your loved ones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImgLeft;
