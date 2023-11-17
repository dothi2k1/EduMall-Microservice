import React from "react";

export default function footer() {
  return (
    <>
      <footer className="bg-[url('https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg')] bg-cover px-5">
        <div className="">
          <div className="container mx-auto divide-y divide-white/40">
            <div className="flex flex-col space-y-6 pb-8 pt-12 lg:flex-row lg:justify-between lg:space-y-0 lg:pb-16 lg:pt-20">
              <h2 className="text-heading-4 lg:text-heading-2 text-center leading-none text-white text-6xl font-black">
                Newsletter Subscribe
              </h2>
              <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-5 lg:space-y-0">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="text-body-2-medium w-full rounded-[32px] border border-white bg-transparent px-10 py-5 text-white placeholder:text-white focus:outline-0 focus:ring-1 focus:ring-white lg:w-96"
                />
                <button className="btn-white-solid w-fit leading-[normal]">Subscribe Now</button>
              </div>
            </div>
            <div className="pb-14 pt-10 lg:py-16">
              <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-[120px] lg:space-y-0">
                <div className="flex flex-col space-y-8">
                  <h3 className="text-white font-semibold text-3xl">Atom Shop</h3>
                  <div className="flex items-center space-x-1.5 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <g transform="translate(2 3.5)">
                        <path
                          d="M11.314,0,7.048,3.434a2.223,2.223,0,0,1-2.746,0L0,0"
                          transform="translate(3.954 5.561)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                        <path
                          d="M4.888,0h9.428A4.957,4.957,0,0,1,17.9,1.59a5.017,5.017,0,0,1,1.326,3.7v6.528a5.017,5.017,0,0,1-1.326,3.7,4.957,4.957,0,0,1-3.58,1.59H4.888C1.968,17.116,0,14.741,0,11.822V5.294C0,2.375,1.968,0,4.888,0Z"
                          transform="translate(0 0)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                      </g>
                    </svg>
                    <p className="text-body-2-regular !leading-none">
                      <span className="font-bold">Email us</span> : example@gmail.com
                    </p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <g transform="translate(2.5 2.5)">
                        <path
                          d="M.49,2.373C.807,1.849,2.549-.056,3.793,0a1.636,1.636,0,0,1,.967.517,16.863,16.863,0,0,1,2.468,3.34C7.471,5.026,6.078,5.7,6.5,6.878a9.873,9.873,0,0,0,5.619,5.616c1.177.426,1.851-.966,3.019-.723a16.894,16.894,0,0,1,3.34,2.468,1.639,1.639,0,0,1,.517.967c.046,1.309-1.977,3.077-2.371,3.3-.93.665-2.144.654-3.624-.034C8.874,16.757,2.274,10.282.524,6-.145,4.525-.192,3.3.49,2.373Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                      </g>
                    </svg>
                    <p className="text-body-2-regular !leading-none">
                      <span className="font-bold">Call</span> : 123 45678910
                    </p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <g transform="translate(2 2)">
                        <path
                          d="M18.5,9.25A9.25,9.25,0,1,1,9.25,0,9.25,9.25,0,0,1,18.5,9.25Z"
                          transform="translate(0.75 0.751)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                        <path
                          d="M3.77,7.1,0,4.847V0"
                          transform="translate(9.661 5.847)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                      </g>
                    </svg>
                    <p className="text-body-2-regular !leading-none">
                      <span className="font-bold">Working Hours</span> : Monday - Friday, 08 am - 05 pm
                    </p>
                  </div>
                  <div className="flex space-x-5">
                    <a
                      className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:bg-white"
                      href="/"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 320 512"
                        className="text-white transition duration-300 group-hover:text-secondary-100"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                      </svg>
                    </a>
                    <a
                      className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:bg-white"
                      href="/"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 448 512"
                        className="text-white transition duration-300 group-hover:text-secondary-100"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    </a>
                    <a
                      className="group flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition duration-300 hover:bg-white"
                      href="/"
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 448 512"
                        className="text-white transition duration-300 group-hover:text-secondary-100"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-10 lg:grid-cols-3 lg:gap-x-28 lg:gap-y-0">
                  <div className="flex flex-col space-y-6">
                    <p className="font-semibold text-xl text-white">Shopping</p>
                    <a className="text-body-3 text-white hover:underline" href="/products">
                      Products
                    </a>
                    <a className="text-body-3 text-white hover:underline" href="/products/my-cart">
                      My Cart
                    </a>
                    <a className="text-body-3 text-white hover:underline" href="/products/my-oders">
                      My Course
                    </a>
                  </div>
                  <div className="flex flex-col space-y-6">
                    <p className="font-semibold text-xl text-white">Learn More</p>
                    <a className="text-body-3 text-white hover:underline" href="/blog">
                      Blogs
                    </a>
                    <a className="text-body-3 text-white hover:underline" href="/gallery">
                      Gallery
                    </a>
                    <a className="text-body-3 text-white hover:underline" href="/about">
                      About Us
                    </a>
                    <a className="text-body-3 text-white hover:underline" href="/contact">
                      Contact Us
                    </a>
                  </div>
                  <div className="col-span-2 flex flex-col space-y-6 lg:col-span-1">
                    <p className="font-semibold text-xl text-white">Download Our App</p>
                    <button className="lg:w-[145px] md:w-[120px]">
                      <img
                        alt="Google Play"
                        loading="lazy"
                        width={350}
                        height={104}
                        decoding="async"
                        data-nimg={1}
                        style={{ color: "transparent" }}
                        src="https://cn.maplesoft.com/products/MapleCalculator/images/app-store-icons-apple-app-store.png"
                      />
                    </button>
                    <button className="lg:w-[145px] md:w-[120px]">
                      <img
                        alt="Apple Store"
                        loading="lazy"
                        width={350}
                        height={104}
                        decoding="async"
                        data-nimg={1}
                        style={{ color: "transparent" }}
                        src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png?hl=vi"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6">
              <p className="text-body-2-regular text-center text-white">
                <span className="font-bold">Team Atom</span> - 2023
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
