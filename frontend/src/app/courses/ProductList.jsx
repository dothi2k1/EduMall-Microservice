import React, { useState, useEffect,useContext } from "react";
import { CartContext } from "../../context/Products/cartContext";
import Link from "next/link";

const ProductList = ({ products, loading }) => {
  const randomNumber = Math.ceil(Math.random() * 10000);

  const Item = ({ product_id, thumb_image_url, description, name, price, sold }) => {
    const formattedNumber = sold >= 1000 ? `${(sold / 1000).toFixed(1)}k` : randomNumber;
    const { addToCart } = useContext(CartContext);
    const handleAddToCart = () => {
      addToCart({
        id: product_id,
        name: name,
        price: parseFloat(price),
        thumb_image_url: thumb_image_url,
        description: description,
        quantity: 1,
      });
    };

    const [favorite, setFavorite] = useState([]);

    // Function to handle adding/removing a product from favorites
    const handleFavorite = (product_id) => {
      const updatedFavorites = [...favorite];

      // Check if the product is already in favorites
      const index = updatedFavorites.indexOf(product_id);

      if (index !== -1) {
        // Remove the product from favorites if already present
        updatedFavorites.splice(index, 1);
      } else {
        // Add the product to favorites
        updatedFavorites.push(product_id);
      }

      setFavorite(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorite(JSON.parse(storedFavorites));
      }
    }, []);
    const sale = Math.floor(Math.random() * 10);

    return (
      <div className="text-center bg-white ">
        <div className=" relative group hover:shadow-md border rounded-xl">
          <div className="p-1 text-sm font-medium absolute top-2 left-2 text-red-500 rounded bg-red-100">{sale}%</div>
          <Link href={`products/${product_id}`}>
            <img
              alt="Handicarft"
              decoding="async"
              data-nimg="1"
              className="max-h-36 mx-auto rounded group-hover:scale-95 transition-all 1s linear -z-10 aspect-video object-scale-down  filter brightness-110 saturate-100"
              src={thumb_image_url}
              priorit
            />
          </Link>
          <Link
            className="text-heading-5  lg:text-heading-3 mt-3 text-gray-600 hover:text-primary-100 group-hover:text-emerald-400  transition duration-300 text-lg font-semibold inline-block w-full whitespace-nowrap overflow-hidden text-ellipsis px-10"
            href={`products/${product_id}`}
          >
            {name}
          </Link>
          <div className="flex mt-10  justify-between px-2">
            <p className="text-caption-2  text-rose-500 text-sm lg:text-base font-semibold">
              <div className=" relative">
                <span className="absolute -top-full text-xs ml-1 text-slate-500 line-through ">
                  {" "}
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format((price * (100 + sale)) / 100)}
                </span>
                <span>
                  {" "}
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(price)}{" "}
                </span>
              </div>
            </p>

            <p className="text-caption-2 text-gray-500  text-sm font-semibold ">Đã Bán:{formattedNumber}</p>
          </div>
          <div className="mt-12 mb-2 flex justify-between space-x-2.5 duration-200 group-hover/food:opacity-100 peer-hover:opacity-100 relative">
            <button
              onClick={() => handleFavorite(product_id)}
              className={`group rounded-full border border-emerald-200 px-2 py-2 transition duration-300 
                ${
                  favorite.includes(product_id) ? "bg-emerald-200" : ""
                } hover:bg-emerald-400  absolute bottom-1 left-2`}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`  
                ${
                  favorite.includes(product_id) ? "text-white" : "text-emerald-200"
                }  transition duration-300 hover:text-white `}
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              onClick={handleAddToCart}
              className="text-sm rounded-[32px] bg-emerald-300 px-5 py-3 text-white shadow-lg shadow-[#AE1339]/30 transition duration-300 hover:bg-emerald-400 hover:text-gray-800 hover:font-bold lg:px-10 lg:py-3 absolute bottom-1 right-2"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={9} cy={21} r={1} />
                <circle cx={20} cy={21} r={1} />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <h3>Đang tải đợi xíu nhé...</h3>
      </div>
    );
  }

  return (
    <>
      <section
          id="Projects"
          className="w-full mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {products?.map((v, i) => (
            <div className="w-52 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={i} title={v.title }>
              <a href={`/courses/${v.id}`}>
                  <img
                  src={v.image}
                    alt="Product"
                    className=" w-52 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-52">
                  <span className="text-gray-400 mr-3 uppercase text-xs">{`Lecture: ${v.username}`}</span>
                    <p className="text-base font-bold text-black block capitalize text-ellipsis overflow-hidden whitespace-nowrap">
                      {v.title}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        ${v.price}
                      </p>
                      
                      <div className="ml-[60%]">
                        <a href="" title="ADD TO CART">
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