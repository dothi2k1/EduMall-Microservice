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
    <div className="hover:bg-slate-100 rounded-3xl p-2">
      <div
        className="h-[250px] rounded-2xl bg-cover bg-center "
        style={{
          backgroundImage: "url(" + cardItem.image_content + ")",
        }}
      />
      <h3 className="mt-6 font-semibold text-gray-700 hover:text-emerald-500">
        <Link href={`blog/${cardItem.blog_id}`}>{cardItem.blog_name}</Link>
      </h3>
      <div className="flex mt-6">
        <span className="text-emerald-500 hover:text-emerald-500">
          <Link href={`blog/${cardItem.blog_id}`} className="flex items-center">
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
  const [blog, setBlog] = useState([]);
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
        <div className="flex justify-center">
          <button className="border-emerald-500 rounded-full px-5 py-3 border-2 p-1 duration-300 hover:bg-emerald-500 hover:text-white mt-7 text-emerald-500">
            <Link href="/blog" className="flex items-center">
              See All Blog
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default OurBlog;
