'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '../../context/Products/cartContext';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import { AuthContext } from '@/context/User/AuthProvider';
import SearchBar from '../SearchBar';
import DropDown from './DropDown';

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
    
    <div className='fixed top-0 left-0 w-full z-10 bg-gray-300 bg-opacity-25'>
      <nav
          className=" flex-no-wrap relative flex w-full items-center 
        justify-between 
        py-2 shadow-md shadow-black/5
        dark:shadow-black/10 lg:flex-wrap
        lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">

          <button
            className="block border-0 bg-transparent px-2 text-black-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-black-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent12"
            aria-controls="navbarSupportedContent12"
            aria-expanded="false"
            aria-label="Toggle navigation">

            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7">
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </button>

          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent12"
            data-te-collapse-item>

            <a
              className="mb-4 ml-2 mr-5 mt-3 flex items-center text-black-900 hover:text-black-900 focus:text-black-900 dark:text-black-200 dark:hover:text-black-400 dark:focus:text-black-400 lg:mb-0 lg:mt-0"
              href="/">
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                width={20}
                alt="TE Logo"
                loading="lazy" />
            </a>
            <div class="relative mr-3 md:mr-0 hidden md:block">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" id="email-adress-icon" class="bg-gray-100 bg-opacity-25 focus:bg-white border border-gray-300 text-gray-900 sm:text-sm outline-0	 rounded-lg focus:ring-blue-500 focus:border-blue-300 block w-full pl-10 p-2" placeholder="Search..." />
            </div>
            <ul
              className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
              data-te-navbar-nav-ref>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>

                <a
                  className="text-black-500 transition duration-200 hover:text-black-700 hover:ease-in-out focus:text-black-700 disabled:text-black/30 motion-reduce:transition-none dark:text-black-200 dark:hover:text-black-300 dark:focus:text-black-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                  href="#"
                  data-te-nav-link-ref
                >Dashboard
                </a>

              </li>

              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a
                  className="text-black-500 transition duration-200 hover:text-black-700 hover:ease-in-out focus:text-black-700 disabled:text-black/30 motion-reduce:transition-none dark:text-black-200 dark:hover:text-black-300 dark:focus:text-black-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-black-400"
                  href="#"
                  data-te-nav-link-ref
                >Team</a>

              </li>

              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <a
                  className="text-black-500 transition duration-200 hover:text-black-700 hover:ease-in-out focus:text-black-700 disabled:text-black/30 motion-reduce:transition-none dark:text-black-200 dark:hover:text-black-300 dark:focus:text-black-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-black-400"
                  href="#"
                  data-te-nav-link-ref
                >Projects</a>

              </li>
            </ul>
          </div>


          <div className="relative flex items-center">

            <a
              className="mr-4 text-secondary-500 transition duration-200 hover:text-secondary-400 hover:ease-in-out focus:text-secondary-400 disabled:text-black/30 motion-reduce:transition-none"
              href="#">
              <span className="[&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5">
                  <path
                    d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                </span>
                
            </a>
            <span
                  className="absolute -mt-4 ml-2.5 rounded-full bg-red-500 px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                >
                  1
                </span>

            <div
              className="relative"
              data-te-dropdown-ref
              data-te-dropdown-alignment="end">

              <a
                className="hidden-arrow mr-4 flex items-center text-secondary-500 transition duration-200 hover:text-secondary-400 hover:ease-in-out focus:text-secondary-400 disabled:text-black/30 motion-reduce:transition-none"
                href="#"
                id="dropdownMenuButton1"
                role="button"
                data-te-dropdown-toggle-ref
                aria-expanded="false">

                <span className="[&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                      fill-rule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                      clip-rule="evenodd" />
                  </svg>
                </span>

                <span
                  className="absolute -mt-4 ml-2.5 rounded-full bg-red-500 px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                >
                  1
                </span>

              </a>

              <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdownMenuButton1"
                data-te-dropdown-menu-ref>

                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black-700 hover:bg-neutral-100 active:text-black-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-black-400 dark:text-black-200 dark:hover:bg-white/30"
                    href="#"
                    data-te-dropdown-item-ref
                  >Action</a>

                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black-700 hover:bg-neutral-100 active:text-black-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-black-400 dark:text-black-200 dark:hover:bg-white/30"
                    href="#"
                    data-te-dropdown-item-ref
                  >Another action</a>

                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black-700 hover:bg-neutral-100 active:text-black-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-black-400 dark:text-black-200 dark:hover:bg-white/30"
                    href="#"
                    data-te-dropdown-item-ref
                  >Something else here</a>

                </li>
              </ul>
            </div>


            <div
              className="relative"
              data-te-dropdown-ref
              data-te-dropdown-alignment="end">

              <a
                className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                href="/user/login"
                id="dropdownMenuButton2"
                role="button"
                data-te-dropdown-toggle-ref
                aria-expanded="false">

                login
              </a>

              <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdownMenuButton2"
                data-te-dropdown-menu-ref>

                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black-700 hover:bg-neutral-100 active:text-black-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-black-400 dark:text-black-200 dark:hover:bg-white/30"
                    href="#"
                    data-te-dropdown-item-ref
                  >Action</a>

                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black-700 hover:bg-neutral-100 active:text-black-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-black-400 dark:text-black-200 dark:hover:bg-white/30"
                    href="#"
                    data-te-dropdown-item-ref
                  >Another action</a>

                </li>
                <li>
                  <a
                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black-700 hover:bg-neutral-100 active:text-black-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-black-400 dark:text-black-200 dark:hover:bg-white/30"
                    href="#"
                    data-te-dropdown-item-ref
                  >Something else here</a>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* <svg
                  className="mr-2 fill-slate-600 group-hover:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                </svg> */}
        {/* <div className="h-[77.3px]"></div> */}
        </div>
    </>
  );
}
