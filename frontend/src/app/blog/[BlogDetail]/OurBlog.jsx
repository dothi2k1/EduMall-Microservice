import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FreeMode, Navigation, Thumbs, Pagination, Scrollbar, A11y } from "swiper/modules";

function CardLatestPost({ cardItem }) {
  return (
    <div>
      <div
        className="h-[250px] rounded-2xl bg-cover bg-center"
        style={{
          backgroundImage: "url(" + cardItem.image_content + ")",
        }}
      />
      <h6 className="mt-6 font-sans text-gray-700">{cardItem.blog_name}</h6>
      <div className="flex mt-6">
        <span className="text-emerald-500 hover:text-emerald-500">
          <Link href={`${cardItem.blog_id}`} className="flex items-center">
            <span className="font-bold mr-2">Read More</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 22 22"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M15.5 5H11l5 7-5 7h4.5l5-7z" />
              <path d="M8.5 5H4l5 7-5 7h4.5l5-7z" />
            </svg>
          </Link>
        </span>
      </div>
    </div>
  );
}

function OurBlog() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${process.env.DOMAIN}/blog`);
        const dataBlog = response.data;
        setBlog(dataBlog);
      } catch (error) {
        console.log("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <h3>Đang tải đợi xíu nhé...</h3>
      </div>
    );
  }
  return (
    <section id="our-blog">
      <div className="pb-10 pt-10 lg:pb-10 lg:pt-20 px-5">
        <h3 className="text-center text-emerald-500 text-2xl mb-5 font-bold">Our Blog</h3>
        <h2 className="text-center mb-7 text-3xl font-bold text-slate-600">Latest Post</h2>

        <div className="mt-10 grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:mt-16 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
          {blog.map((b, index) => {
            return <CardLatestPost key={index} cardItem={b} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default OurBlog;
