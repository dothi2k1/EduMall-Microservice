"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { AuthContext } from "@/context/User/AuthProvider";
import Link from "next/link";
import "animate.css";
import './login.css'
import { login } from "@/service/AuthService";
import { toast } from "react-toastify";
const Login = () => {
  const { errorMessage, isLoggedIn } = useContext(AuthContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Create useRouter object
  
  useEffect(() => {
    if (isLoggedIn)  router.push('/')
  },[])
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username: usernameOrEmail, password: password }).then(res => {
      if (!res) toast("Lost connection", { autoClose: 2000, type: 'error', closeButton: false })
      if (res.status == 200) {
        window.localStorage.setItem("token", JSON.stringify(res))
        router.push('/')
      }
      else toast(res.data, { autoClose: 2000, type: 'error', closeButton: false });
    })


      ;

  };

  return  (
    <section className="bg-[url('/bgtim.webp')] bg-cover pt-[55px] lg:pb-5 lg:pt-[90px] lg:min-h-[650px]">
      <div className=" animate__animated animate__fadeIn  login_page flex flex-col items-center justify-center px-4 mx-auto md:h-screen lg:py-0">
        <div className="max-w-screen-sm	 bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-[1000px] xl:p-0  lg:flex">
          <div className="w-full p-4 space-y-1 ">
            <h3 className="text-1xl text-center font-bold leading-tight tracking-tight text-emerald-500">
              <p>Welcome to</p>
              <p className="lg:text-4xl == text-violet-600">EDUMALL</p>
            </h3>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} method="post">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                UserName
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-white border border-gray-300 text-gray-900 outline-0 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-blue-700 block w-full p-2.5"
                  placeholder="Enter Username Or Email Address"
                  required=""
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-white border border-gray-300 text-gray-900 outline-0 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-blue-700 block w-full p-2.5"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 outline-0 rounded focus:ring-3 focus:bg-white "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember username
                    </label>
                  </div>
                </div>
                <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-emerald-600 hover:bg-emerald-500 duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Log in
              </button>
              <p className="flex justify-center text-slate-600">Or continue</p>
              <div className="flex mx-auto justify-center  flex-col lg:flex-row">
                <button
                  type="button"
                  className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                >
                  <svg
                    className="mr-2 -ml-1 w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="facebook-f"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                    />
                  </svg>
                  Facebook
                </button>

                <button
                  type="button"
                  className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center  dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  <svg
                    className="mr-2 -ml-1 w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:ring-red-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center  dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  <svg
                    className="fill-white mr-2 -ml-1 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512"
                  >
                    <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                  </svg>
                  <Link href="/user/register"> New registration</Link>
                </button>
              </div>
              <p className="text-sm font-light text-emerald-600 dark:text-gray-400">
                Do not have an account?{" "}
                <Link
                  href="/user/register"
                  className="font-medium text-blue-700 hover:[text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-blue-700"
                >
                  Register now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
