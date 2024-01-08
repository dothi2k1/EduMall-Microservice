import React, { useState, useEffect,useContext } from "react";
import { CartContext } from "../../context/Products/cartContext";
import { getAll } from "@/service/courseService";


const ProductList = ({ loading, setLoad }) => {
  const {addToCart}=useContext(CartContext)
  const randomNumber = Math.ceil(Math.random() * 10000);
  const [products, setProducts] = useState([1,2,3,4]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    getAll(0, "id").then(res => {
      console.log(res)
      if (res.status == 200) {
        setProducts(res.data);
        setLoad(false)
      };
    });
  }, []);
  

  return (
    <>
      <section
          id="Projects"
          className="w-full mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {products?.map((v, i) => (
            <div className="w-52 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={i} title={v.title&&JSON.parse(v.title).bigTitle }>
              <a href={(v.id!==undefined)?`/courses/${v.id}`:'error'}>
                  <img
                  src={v.image}
                    alt="Product"
                    className=" w-52 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-52">
                  <span className="text-gray-400 mr-3 uppercase text-xs">{`Lecture: ${v.username}`}</span>
                    <p className="text-base font-bold text-black block capitalize text-ellipsis overflow-hidden whitespace-nowrap">
                      {v.title&& JSON.parse(v?.title).bigTitle}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        ${v.price}
                      </p>
                      
                      <div className="ml-[60%]">
                      <a title="ADD TO CART" onClick={(e) => { e.preventDefault(); addToCart(v.id,v.price)}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="currentColor"
                          className="bi bi-bag-plus"
                          viewBox="0 0 16 16"
                          
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                          />
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg></a>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
           
          ))}
        </section>
    </>
  );
};

export default ProductList;