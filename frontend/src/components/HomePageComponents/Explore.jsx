"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function CardCategory({ category }) {
  return (
    <div className={`transition duration-200 group rounded-3xl py-5 border hover:border-emerald-300 shadow-md `}>
      <Link className="" href={`products`}>
        <img
          alt="Food Menu"
          loading="lazy"
          decoding="async"
          data-nimg={1}
          className="group-hover:scale-95  aspect-square object-cover rounded-full mx-auto w-2/3 duration-200 -z-10 filter brightness-110 saturate-100"
          src={category.image}
          style={{ color: "transparent" }}
        />
        <div className="text-center">
          <h5 className="pt-3  text-md lg:text-2xl lg:text-heading-3 text-slate-600 hover:text-primary-100  transition duration-300 font-semibold inline-block w-full whitespace-nowrap overflow-hidden text-ellipsis px-10">
            {category.title}
          </h5>
          {/* <h5 className="lg:text-xl text-gray-600 text-center font-bold">{category.title}</h5> */}
          <h3 className="text-caption-2 pb-2 text-emerald-500  text-base font-semibold">
            {category.quantity} Products
          </h3>
        </div>
      </Link>
    </div>
  );
}

function Explore() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the products from the server
    const fetchProducts = async () => {
      try {
        const response = await fetch(process.env.DOMAIN + "/products/categories");
        const data = await response.json();
        // console.log(data)
        setData(data);
        // setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        // setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto px-5 lg:px-11 pb-10 lg:w-5/6 lg:pb-20  pt-5 lg:pt-16 ">
      <h3 className="text-caption-2 lg:text-caption-1 text-center text-primary-100 text-emerald-500 text-2xl mb-5 font-bold">
        Explore Categories
      </h3>
      <h2 className="text-heading-4 lg:text-heading-2 mt-2 text-center mb-7 text-3xl font-bold text-slate-600">
        Our Great Categories
      </h2>
      <div className="grid gap-2  lg:gap-10 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {data.map((category) => {
          return <CardCategory key={category.category_id} category={category} />;
        })}
      </div>
    </div>
  );
}

export default Explore;
