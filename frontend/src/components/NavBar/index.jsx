"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../../context/Products/cartContext";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { AuthContext } from "@/context/User/AuthProvider";
import SearchBar from "../SearchBar";
import DropDown from "./DropDown";

export default function NavBar() {
  const { isLoggedIn, username, user, handleLogout } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);
  const { cartItems, calculateTotalPrice, totalProducts, clearCartItems } = useContext(CartContext);
  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  function handleLogoutAndClearCart() {
    handleLogout();
    clearCartItems();
  }

  const handleNavBar = () => {
    setOpenNav(!openNav);
  };

  return (
    <>
      <nav
        className={`mx-auto  fixed top-0 shadow-md lg:bg-opacity-80 bg-gray-50 z-20 px-5 font-semibold text-gray-600 transition-all w-full duration-500 backdrop-blur-md  ${
          openNav ? " top-0 bg-white" : ""
        }`}
      >
        <div className="container relative mx-auto flex flex-col  justify-between py-2 lg:flex-row lg:items-center lg:space-x-10">
          {/* Start Navbar Mobile */}
          <div className="flex items-center justify-between">
            <Link href="/">
              <img
                alt="Logo"
                loading="lazy"
                className="max-w-[60px] lg:max-w-[100px]"
                decoding="async"
                data-nimg={1}
                style={{ color: "transparent" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/2560px-Udemy_logo.svg.png"
              />
            </Link>
            <div className="lg:hidden mx-5">
              <SearchBar />
            </div>
            <div className="flex items-center space-x-2 lg:hidden">
              <Link
                className="rounded-sm border border-secondary-100 p-1.5 transition duration-300 hover:border-primary-100 hover:bg-primary-100 hover:text-white"
                href="/products/my-cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  role="presentation"
                  style={{ height: 21 }}
                >
                  <g transform="translate(2 2.5)">
                    <path
                      d="M.764,0A.765.765,0,1,1,0,.765.766.766,0,0,1,.764,0Z"
                      transform="translate(4.658 17.32)"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth="1.5px"
                    />
                    <path
                      d="M.765,0A.765.765,0,1,1,0,.765.766.766,0,0,1,.765,0Z"
                      transform="translate(15.91 17.32)"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth="1.5px"
                    />
                    <path
                      d="M0,0,2.08.36l.963,11.473a1.8,1.8,0,0,0,1.8,1.653H15.752a1.8,1.8,0,0,0,1.785-1.546l.949-6.558a1.341,1.341,0,0,0-1.327-1.533H2.414"
                      transform="translate(0.75 0.75)"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth="1.5px"
                    />
                    <path
                      d="M0,.5H2.773"
                      transform="translate(12.125 7.795)"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth="1.5px"
                    />
                  </g>
                </svg>
              </Link>
              <button
                onClick={handleNavBar}
                className="rounded-sm border border-secondary-100 px-3 py-1.5 transition duration-300 hover:border-primary-100 hover:bg-primary-100 "
              >
                {openNav ? (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="21px"
                    width="21px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 16 16"
                    height="21px"
                    width="21px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 5H0V4h16v1zm0 8H0v-1h16v1zm0-4.008H0V8h16v.992z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* End Navbar Mobile */}

          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <div
            className={`h-0 flex flex-col ${
              openNav ? "h-[330px] " : "overflow-hidden"
            } z-10 transition-all duration-300 lg:h-full lg:flex-row lg:items-center`}
          >
            <ul className=" mt-12 flex flex-col space-y-6 lg:mt-0 lg:flex-row lg:space-x-8 lg:space-y-0 ">
              <li>
                <Link
                  className="text-secondary-100  hover:text-emerald-300 text-body-2-medium flex items-center transition"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <DropDown />
              </li>
              <li>
                <Link
                  className="text-secondary-100 hover:text-emerald-300  text-body-2-medium flex items-center transition"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <div data-headlessui-state="">
                  <button
                    className="text-secondary-100  group text-body-2-medium flex items-center space-x-0.5 transition"
                    id="headlessui-menu-button-:R6mba:"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-headlessui-state=""
                  >
                    <span>
                      <p className="group-hover:text-emerald-300">Pages</p>

                      <div className="hidden group-hover:block">
                        <div
                          className="absolute space-y-6 rounded-2xl bg-white p-5 drop-shadow-lg transform opacity-100 scale-100 "
                          aria-labelledby="headlessui-menu-button-:R6mba:"
                          id="headlessui-menu-items-:r8:"
                          role="menu"
                          tabIndex={0}
                          data-headlessui-state="open"
                        >
                          <Link
                            className=" text-body-2-medium block text-secondary-100 hover:text-emerald-300"
                            id="headlessui-menu-item-:r9:"
                            role="menuitem"
                            tabIndex={-1}
                            data-headlessui-state=""
                            href="/gallery"
                          >
                            Gallery
                          </Link>
                          <Link
                            className=" text-body-2-medium block text-secondary-100 hover:text-emerald-300"
                            id="headlessui-menu-item-:r9:"
                            role="menuitem"
                            tabIndex={-1}
                            data-headlessui-state=""
                            href="/blog"
                          >
                            Blog
                          </Link>
                          <Link
                            className="text-body-2-medium block text-secondary-100 hover:text-emerald-300"
                            id="headlessui-menu-item-:ra:"
                            role="menuitem"
                            tabIndex={-1}
                            data-headlessui-state=""
                            href="/contact"
                          >
                            Contact
                          </Link>
                          <Link
                            className="text-body-2-medium block text-secondary-100 hover:text-emerald-300"
                            id="headlessui-menu-item-:ra:"
                            role="menuitem"
                            tabIndex={-1}
                            data-headlessui-state=""
                            href="/feedback"
                          >
                            Feedback
                          </Link>
                          <Link
                            className="text-body-2-medium block text-secondary-100 hover:text-emerald-300"
                            id="headlessui-menu-item-:rb:"
                            role="menuitem"
                            tabIndex={-1}
                            data-headlessui-state=""
                            href="/"
                          >
                            More Website
                          </Link>
                        </div>
                      </div>
                    </span>

                    <svg
                      stroke="currentColor"
                      className="group-hover:fill-emerald-300"
                      strokeWidth={0}
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z" />
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
            <ul className="mt-6 flex flex-col space-y-6 divide-black/10 lg:mt-0 lg:flex-row lg:items-center lg:space-y-0 lg:divide-x ">
              <li className="lg:px-14 group ">
                <Link
                  className="text-secondary-100 group-hover:text-emerald-300 text-body-2-medium flex items-center space-x-1 transition "
                  href="/products/my-oders"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20x"
                    viewBox="0 0 512 512"
                    className="group-hover:fill-amber-500 transition"
                  >
                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
                  </svg>
                  <span className="">My Course</span>
                </Link>
              </li>
              <li className="hidden lg:block lg:px-14">
                <Link
                  className="text-secondary-100 hover:text-emerald-300  text-body-2-medium flex items-center space-x-1 transition"
                  href="/products/my-cart"
                >
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      role="presentation"
                      style={{ height: 20 }}
                    >
                      <g transform="translate(2 2.5)">
                        <path
                          d="M.764,0A.765.765,0,1,1,0,.765.766.766,0,0,1,.764,0Z"
                          transform="translate(4.658 17.32)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                        <path
                          d="M.765,0A.765.765,0,1,1,0,.765.766.766,0,0,1,.765,0Z"
                          transform="translate(15.91 17.32)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                        <path
                          d="M0,0,2.08.36l.963,11.473a1.8,1.8,0,0,0,1.8,1.653H15.752a1.8,1.8,0,0,0,1.785-1.546l.949-6.558a1.341,1.341,0,0,0-1.327-1.533H2.414"
                          transform="translate(0.75 0.75)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                        <path
                          d="M0,.5H2.773"
                          transform="translate(12.125 7.795)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit={10}
                          strokeWidth="1.5px"
                        />
                      </g>
                    </svg>
                    <span className="absolute -top-3 -left-3 text-white rounded-full  py-0.5 px-1 bg-red-600  text-xs ">
                      <span className=" ">{totalProducts}</span>
                    </span>
                  </div>
                  <span className="">My Cart</span>
                </Link>
              </li>
            </ul>

            {isLoggedIn ? (
              <>
                <div>
                  <button
                    id="dropdownInformationButton"
                    data-dropdown-toggle="dropdownInformation"
                    className=" bg-white border border-emerald-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center hover:bg-emerald-300 "
                    type="button"
                    onClick={handleDropDown}
                  >
                    {username}{" "}
                    <div className="icon relative">
                      <img
                        className="max-w-[30px] rounded-full ml-2"
                        src="https://i.pinimg.com/564x/7e/05/70/7e0570da0f3fcef0832ea3bc82eb41b1.jpg"
                        alt=""
                      />
                      <svg
                        className="w-3 h-3 ml-2.5 absolute right-0 bottom-0 bg-slate-400 rounded-full p-0.5 border border-white "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </div>
                  </button>

                  {dropDown && (
                    <div
                      id="dropdownInformation"
                      className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <Link href="/user/profile">
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-gray-100">
                          <div>{username}</div>
                          <div className="font-medium truncate flex items-center text-red-600 font-semibold mt-1">
                            {user.coin}{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 512 512"
                              className="fill-amber-600 ml-1"
                            >
                              <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z" />
                            </svg>
                          </div>
                        </div>
                      </Link>

                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownInformationButton"
                      >
                        <li>
                          <Link
                            href="/products/my-oders"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            My Course
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/my-cart"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            My Cart
                          </Link>
                        </li>
                      </ul>
                      <div className="py-2">
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          <button onClick={handleLogoutAndClearCart}>Log out</button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex group items-center border-secondary-100 bg-transparent text-secondary-100 hover:border-primary-100 hover:bg-emerald-300  text-body-2-medium mt-6 rounded-[32px] border px-6 py-[10px] text-center transition duration-300 lg:mt-0 cursor-pointer">
                <svg
                  className="mr-2 fill-slate-600 group-hover:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                </svg>
                <Link className="group-hover:text-white" href="/user/login">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-[77.3px]"></div>
    </>
  );
}
