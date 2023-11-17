"use client";

import React, { useLayoutEffect, useRef, useEffect, useState, useContext } from "react";
import OurBlog from "./OurBlog";
import axios from "axios";

const BlogDetail = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const blogID = parseInt(params.BlogDetail);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${process.env.DOMAIN}/blog/${blogID}`);
        const data = response.data;
        const dataBlog = data[0];
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

  function BlogContent({ data_log }) {
    return (
      Object.keys(data_log).map((keys) => (
        <div className="my-10" key={keys}>
          <h3 className="mx-auto w-10/12 text-2xl text-center font-medium" > {keys} </h3>
          <p className="my-5"> {data_log[keys]} </p>
        </div>
      ))
    );
  }

    return (
      <div className="relative pb-10 pt-28 lg:pb-20 lg:pt-20 px-5">
        <div className="flex space-x-2 text-2xl font-bold">
          <h4 className="text-caption-2 lg:text-caption-1 space-x-2 text-secondary-50">
            <a className="hover:text-primary-100 hover:underline" href="/">
              Home
            </a>
            <span>/</span>
            <a className="hover:text-primary-100 hover:underline" href="/blog">
              Blog
            </a>
          </h4>
          <h4 className="text-caption-2 lg:text-caption-1 w-2/5 truncate text-primary-100 text-emerald-700">
            / {blog.blog_name}
          </h4>
        </div>
        <div className="text-center mx-auto pt-16 lg:w-4/5">
          <h2 className="text-4xl lg:text-4xl font-semibold text-gray-600">{blog.blog_name}</h2>
          <div className="mt-4 flex items-center justify-center space-x-3">
            <img
              alt="avatar"
              loading="lazy"
              width={96}
              height={96}
              decoding="async"
              data-nimg={1}
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src={blog.image_avt}
              style={{ color: "transparent" }}
            />
            <div className="space-y-1.5 text-start">
              <span className="text-body-3-bold block text-gray-700">
                By <span>{blog.name_person}</span>
              </span>
              <span className="text-body-3-bold block text-gray-700">27/07/2023</span>
            </div>
          </div>
          <div className="mx-auto lg:w-[75%]">
            <div
              className="mt-4 h-[240px] rounded-2xl bg-cover bg-center lg:h-[430px]"
              style={{
                backgroundImage: `url("${blog.image_content}")`,
              }}
            />
            <div className="text-left mt-8 font-semibold text-xl">{blog.content_0}</div>
            <div className="mt-8 leading-8 text-justify text-gray-600 font-sans">
              <BlogContent  data_log={JSON.parse(blog.content_1)} />
              <div className="mt-8 rounded-3xl bg-emerald-200 px-6 py-6">
                <p className="text-body-2-regular text-secondary-50">
                  Need help?
                  <br />
                  {blog.conclusion}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center space-y-3">
            <span className="text-heading-6 text-2xl font-semibold font-sans">Share</span>
            <div className="flex space-x-5">
              <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 transition duration-200 hover:bg-emerald-600">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white transition text-2xl font-semibold font-sans duration-200 group-hover:text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fillRule="nonzero"
                      d="M10.076 11c.6 0 1.086.45 1.075 1 0 .55-.474 1-1.075 1C9.486 13 9 12.55 9 12s.475-1 1.076-1zm3.848 0c.601 0 1.076.45 1.076 1s-.475 1-1.076 1c-.59 0-1.075-.45-1.075-1s.474-1 1.075-1zm4.967-9C20.054 2 21 2.966 21 4.163V23l-2.211-1.995-1.245-1.176-1.317-1.25.546 1.943H5.109C3.946 20.522 3 19.556 3 18.359V4.163C3 2.966 3.946 2 5.109 2H18.89zm-3.97 13.713c2.273-.073 3.148-1.596 3.148-1.596 0-3.381-1.482-6.122-1.482-6.122-1.48-1.133-2.89-1.102-2.89-1.102l-.144.168c1.749.546 2.561 1.334 2.561 1.334a8.263 8.263 0 0 0-3.096-1.008 8.527 8.527 0 0 0-2.077.02c-.062 0-.114.011-.175.021-.36.032-1.235.168-2.335.662-.38.178-.607.305-.607.305s.854-.83 2.705-1.376l-.103-.126s-1.409-.031-2.89 1.103c0 0-1.481 2.74-1.481 6.121 0 0 .864 1.522 3.137 1.596 0 0 .38-.472.69-.871-1.307-.4-1.8-1.24-1.8-1.24s.102.074.287.179c.01.01.02.021.041.031.031.022.062.032.093.053.257.147.514.262.75.357.422.168.926.336 1.513.452a7.06 7.06 0 0 0 2.664.01 6.666 6.666 0 0 0 1.491-.451c.36-.137.761-.337 1.183-.62 0 0-.514.861-1.862 1.25.309.399.68.85.68.85z"
                    />
                  </g>
                </svg>
              </button>
              <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 transition duration-200 hover:bg-emerald-600">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white transition text-2xl font-semibold font-sans duration-200 group-hover:text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                  </g>
                </svg>
              </button>
              <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 transition duration-200 hover:bg-emerald-600">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 448 512"
                  className="h-5 w-5 text-white transition text-2xl font-semibold font-sans duration-200 group-hover:text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z" />
                </svg>
              </button>
              <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 transition duration-200 hover:bg-emerald-600">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white transition text-2xl font-semibold font-sans duration-200 group-hover:text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fillRule="nonzero"
                      d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <OurBlog />
      </div>
    );
};

export default BlogDetail;
