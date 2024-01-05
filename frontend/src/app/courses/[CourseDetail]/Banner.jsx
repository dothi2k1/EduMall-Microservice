'use-client'
import { CartContext } from "@/context/Products/cartContext";
import { useContext, useEffect, useState } from "react";

export default function Banner({course}) {
  const { addToCart } = useContext(CartContext);
  const [expand, setExpand] = useState({ regis: 0, rate: 0 });
  const a = {
    bigTitle: "The Complete Python Bootcamp From Zero to Hero in Python",
    slogan:"Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games"
  }
  const handleAdd = () => {
    addToCart(course.id,course.price)
  }
  
  return (
    <div className=" bg-gray-800 w-full">
      <div className="w-full lg:px-20 px-10 lg:pt-0 pt-10 mt-[70px] text-white flex flex-col items-center lg:flex-row lg:justify-between	">
        <div className="py-3 lg:w-[50%] ">
          <div className="lg:hidden">
          <img src={course?.image} alt="" />
        </div>
          <p className="font-bold text-[34px]">{course?.title?.bigTitle}</p>
          <p>
            {course?.title?.slogan}
          </p>
          <p className="leading-8 text-sm">
            <span className="text-yellow-700">
              {course?.rate } <i className="fa-solid fa-star"></i>
              
            </span> 
            <span className="ml-2">
              {expand.regis} registrations
            </span>
            <br />
            Upload by{" "}
            <a href="#" className="text-sky-400">
              {course?.username}
            </a>
            <br />
            <i className="fa-solid fa-circle-exclamation"></i> Last updated: {new Date(course?.updateat).toLocaleDateString() }
            <i className="fa-solid fa-globe ml-7"></i> English
            <br />
            <i className="fa-solid fa-keyboard"></i> Vietnamese [Auto], English [Auto]
          </p>
        </div>
        <div className="lg:w-[50%] flex justify-end ">
          <div className="space-y-3">
            <div className="hidden lg:block">
              <img src={course?.image} alt="" />
            </div>
            
            <button className="h-[40px] bg-violet-900 w-full color-white font-bold"><a href="/checkout">BUY</a></button>
            <button className="h-[40px] bg-white w-full text-gray-900 font-bold" onClick={handleAdd}>ADD TO CART</button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
