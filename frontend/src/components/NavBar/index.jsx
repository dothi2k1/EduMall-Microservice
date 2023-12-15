'use client';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/Products/cartContext';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import './navbar.css'
import { AuthContext } from '@/context/User/AuthProvider';
import SearchBar from '../SearchBar';
import DropDown from './DropDown';
import Image from 'next/image';

export default function NavBar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState("translate-x-[-100%]");
  const { cartItems, calculateTotalPrice, totalProducts, clearCartItems } = useContext(CartContext);
  const [dropDown, setDropDown] = useState(false);

 

  const navItem = [
    {
      name: "Course",
      link: '/products'
    },
    {
      name: "Teach on Edumall",
      link: 'teacher'
    }
  ]

  return (
    <>

      <div className='fixed top-0 left-0 w-full z-10 bg-gray-100 bg-opacity-75'>
        <nav
          className=" flex-no-wrap relative flex w-full items-center 
            justify-between 
             shadow-md shadow-black/5
            dark:shadow-black/10 lg:flex-wrap
            lg:justify-start h-[40px] lg:h-[60px]">
          <div className="flex w-full lg:flex-wrap justify-between px-3">

            <button
              onClick={() => setOpenNav('translate-x-[0%]')}
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
                  className="h-8 w-8">
                  <path
                    fill-rule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </button>

            <div
              className="flex-grow navlink items-center lg:flex"
              id="navbarSupportedContent12"
              data-te-collapse-item>
              {/* logo */}
              <a
                className="mb-4 ml-2 mr-5 mt-3 flex items-center dark:text-black-200  lg:mb-0 lg:mt-0"
                href="/">
                <h1 className='text-2xl font-black [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-gray-600'>EDUMALL</h1>
              </a>
              {/* end logo */}

              {/* nav link full*/}
              <div className="relative mr-3 md:mr-0 px-4">
                <div className="absolute inset-y-0 left-3 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" id="email-adress-icon" className="bg-gray-100 bg-opacity-25 focus:bg-white border border-gray-300 text-gray-900 sm:text-sm outline-0	 rounded-lg focus:ring-blue-500 focus:border-blue-300 block w-full pl-10 p-2" placeholder="Search..." />
              </div>
              <ul
                className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
                data-te-navbar-nav-ref>
                {navItem.map((item, i) => (
                  <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref key={i}>
                    <a className="mb-4 ml-2 mr-5 mt-3 font-bold text-lg flex items-center  hover:text-black-400 hover:[text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-gray-600 dark:text-black-200  lg:mb-0 lg:mt-0"
                      href={item.link}
                      data-te-nav-link-ref
                    >{item.name}
                    </a>
                  </li>
                ))}
              </ul>
              {/* nav link */}
            </div>
            <div className="relative flex items-center ">
              <a
                className="mr-3 text-secondary-500 hover:text-gray-200 transition duration-200 hover:ease-in-out focus:text-secondary-400 disabled:text-black/30 motion-reduce:transition-none"
                href="#">
                <span className="[&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 hover:drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
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
                  className="hidden-arrow mr-4 flex items-center text-secondary-500 hover:text-gray-200 transition duration-200 hover:text-secondary-400 hover:ease-in-out focus:text-secondary-400 disabled:text-black/30 motion-reduce:transition-none"
                  href="#"
                  id="dropdownMenuButton1"
                  role="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false">

                  <span className="[&>svg]:w-6 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-8 w-8 hover:drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
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
              </div>

              {isLoggedIn ? <div className="group inline-block relative">
                <a
                  className="bg-gray-300 text-gray-700 font-semibold rounded-full inline-flex items-center"
                >
                  <Image alt="avatar" width={30} height={40} className="rounded-full lg:h-[50px] lg:w-[50px] w-[30px] h-[30px]" src='/bgtim.webp' style={{ borderRadius: '50%' }} />
                </a>
                <ul className="absolute hidden lg:w-[200px] w-[120px] bg-white rounded shadow shadow-[rgba(0,0,3,0.3)_0_0_3px_3px] text-gray-700 pt-1 pb-1 group-hover:block right-[3px] top-[45px]">
                  <li className="">
                    <a
                      className="rounded-t bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                    >Profile</a>

                  </li>
                  <li className="">
                    <a
                      className="bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                    >My learning</a>

                  </li>
                  <li className="">
                    <a id='loginbtn'
                      href='/'
                      className="rounded-b bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      onClick={handleLogout}
                    >Log out
                    </a>
                    <a href='/' onClick={handleLogout} className='lg:hidden className="rounded-b bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"'>
                      <i className="fa-solid fa-right-from-bracket px-2" style={{ color: "#ff0000" }} /></a>

                  </li>
                </ul>
              </div> : <div className='flex items-center justify-center' >
                <div className="w-fit rounded-xl m-3 shadow-sm" id='loginbtn'>
                    <a href='/user/login'  className="px-4 py-2 rounded-l-xl text-sm border border-blue-500 text-white m-0 bg-blue-500 hover:border-red-600 hover:bg-red-600 transition ease-in-out">Login</a>
                    <a href='/user/register' className="px-4 py-2 box-border border text-sm border-blue-500 rounded-r-xl  bg-neutral-50 hover:bg-neutral-200 transition">Register</a>
                </div>
                  <a href="/user/login" className='lg:hidden'><i className="fa-solid fa-right-to-bracket" style={{ color: "#000" }} /></a>
              </div>}
              <div className={`transition duration-500 ease-in-out left-0 ${openNav} lg:hidden fixed top-0 bg-white border-r-1 border border-black-900 z-1000 w-[200px] h-full`}
            >
              {/* nav link mobile*/}
              <div className='w-full flex flex-row justify-between'>
                <div>

                </div>
                <div>
                  <button
                    onClick={() => setOpenNav('translate-x-[-100%]')}
                    className="block border-0 bg-transparent px-2 pt-2 text-black-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-black-200 lg:hidden"
                    type="button"
                    data-te-collapse-init
                    data-te-target="#navbarSupportedContent12"
                    aria-controls="navbarSupportedContent12"
                    aria-expanded="false"
                    aria-label="Toggle navigation">

                    <span className="p-2">
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </button>
                </div>
              </div>
              <div className="relative  p-2 w-[200px]">
                <div className="absolute inset-y-0 left-3 pl-3 flex items-center pointer-events-none">
                  <svg className="w-[15px] text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text"  className="bg-gray-100 bg-opacity-25 focus:bg-white border border-gray-300 text-gray-900 sm:text-sm outline-0	 rounded-lg focus:ring-blue-500 focus:border-blue-300 block w-full pl-10 p-2" placeholder="Search..." />
              </div>
              <ul
                className="list-style-none p-2 w-[200px]"
                data-te-navbar-nav-ref>
                {navItem.map((item, i) => (
                  <li className="mb-4 w-[200px]" data-te-nav-item-ref key={i}>
                    <a className="text-sm hover:text-black-400 hover:[text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-gray-600 dark:text-black-200"
                      href={item.link}
                      data-te-nav-link-ref
                    >{item.name}
                    </a>
                  </li>
                ))}
              
              </ul>

              {/* nav link mobile*/}
            </div>

            </div>
          </div>
        </nav>

      </div>
    </>
  );
}
