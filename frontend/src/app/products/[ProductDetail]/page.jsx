"use client";

import React, { useLayoutEffect, useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import Cart from "@/context/Products/Cart";
import { CartContext } from "@/context/Products/cartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import PopularMenu from "./PopularMenu";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Lightbox from "./Lightbox";
import LightboxOrder from "./LightboxOrder";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductDetail = ({ params }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imgProduct, setImgProduct] = useState();
  const [imgProductLatest, setImgProductLatest] = useState();
  const [hoverImgIndex, setHoverImgIndex] = useState(0);

  const [favorite, setFavorite] = useState([]);
  const imgRef = useRef(null);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };
  const handleOnClick = () => {
    if (comment.trim()) {
      alert("Summit successfully !!");
      // setComments((comments) => [...comments, comment]);
      setComment("");
    } else return;
  };
  const handleBuyNow = () => {
    // handleAddToCart()
    setIsOpenOrder(true);
  };

  const handleImageClick = (index) => {
    setHoverImgIndex(index);
    setImgProduct(images[index]);
    setIsOpen(true);
    console.log(hoverImgIndex);
    console.log(imgProduct);
    console.log("Click image !!");
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  const productID = parseInt(params.ProductDetail);

  const handleFavorite = (productID) => {
    const updatedFavorites = [...favorite];

    // Check if the product is already in favorites
    const index = updatedFavorites.indexOf(productID);

    if (index !== -1) {
      // Remove the product from favorites if already present
      updatedFavorites.splice(index, 1);
    } else {
      // Add the product to favorites
      updatedFavorites.push(productID);
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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${process.env.DOMAIN}/categories/${productID}`);
        const dataCategory = response.data;
        setCategory(dataCategory);
      } catch (error) {
        console.log("Error fetching category:", error);
      }
    };

    fetchCategory();
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.DOMAIN}/products/${productID}`);
        const dataProduct = response.data;
        setProduct(dataProduct);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  // add to cart
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    // alert("Add to card Successfully !!!");
    addToCart({
      id: product.product_id,
      name: product.name,
      price: product.price,
      thumb_image_url: product.thumb_image_url,
      quantity: quantity,
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const images = product.images_post.map((image) => image.image_url);

  return (
    <div className="relative pb-10 pt-28 lg:pb-20 lg:pt-20 px-5 container mx-auto ">
      {/* <div
        ref={lensRef}
        onClick={() => handleImageClick(hoverImgIndex)}
        onMouseMove={moveLens}
        onMouseOut={handleMouseOut}
        id="lens"
        className="hidden lg:block hover:cursor-pointer z-10 absolute w-[160px] h-[160px] rounded-full"
        style={{
          backgroundImage: `URL(${imgProduct ? imgProduct : images[0]})`,
          backgroundPosition: `center`,
          backgroundRepeat: `no-repeat`,
          left: `${positionLensLeft}px`,
          top: `${positionLensTop}px`,
          display: `${isNoneLens}`,
        }}
      ></div> */}
      {isOpen && (
        <Lightbox
          // mainSrc={gallery[photoIndex].image_url}
          index={hoverImgIndex}
          images={images}
          product={product}
          imgProduct_click={imgProduct}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
      <div className="flex space-x-2 text-2xl font-bold">
        <h4 className="text-caption-2 lg:text-caption-1 space-x-2 text-secondary-50">
          <a className="hover:text-primary-100 hover:underline" href="/">
            Home
          </a>
          <span>/</span>
          <a className="hover:text-primary-100 hover:underline" href="/products">
            Products
          </a>
        </h4>
        <h4 className="text-caption-2 lg:text-caption-1 w-2/5 truncate text-primary-100 text-emerald-700">
          / {product.name}
        </h4>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
        <div className="w-full">
          <div className="swiper swiper-initialized swiper-horizontal swiper-backface-hidden">
            <div
              className=" swiper-wrapper"
              style={{
                transitionDuration: "0ms",
                transform: "translate3d(0px, 0px, 0px)",
              }}
            >
              <div className="swiper-slide swiper-slide-active mx-auto w-[400px] lg:w-[535px]">
                <div className="">
                  <div className="relative group cursor-pointer bg-white">
                    <img
                      ref={imgRef}
                      // onMouseMove={moveLens}
                      onClick={() => handleImageClick(hoverImgIndex)}
                      src={imgProduct ? imgProduct : images[0]}
                      className="w-auto h-auto lg:h-[405px] mx-auto mb-10 hover:scale-105 duration-150  rounded-lg object-fill"
                      id="img"
                    />
                  </div>
                  <div className="text-center text-gray-700 font-sans mb-2">Click image to open expanded view</div>
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={1}
                    slidesPerView={6}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          // style={{ border: `${isBorder}` }}
                          src={image}
                          alt={`Slide ${index + 1}`}
                          className="rounded-lg p-1 w-[80px] h-[80px] hover:border-[3px] border-emerald-500 object-scale-down bg-white "
                          onMouseOver={(e) => {
                            setHoverImgIndex(index);
                            setImgProduct(e.target.src);
                            setImgProductLatest(e.target.src);
                          }}
                          onClick={(e) => {
                            setHoverImgIndex(index);
                            setImgProduct(e.target.src);
                            setImgProductLatest(e.target.src);
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="bullet mt-8 flex justify-center space-x-3 swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal swiper-pagination-lock">
              <span className="h-3 w-3 rounded-full bg-primary-50 cursor-pointer !bg-primary-100" />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-heading-3 lg:text-heading-1 text-5xl text-emerald-700 font-bold">{product.name}</h1>
          <div className="border mt-2"></div>
          <h5 className="mt-3 mb-2 lg:mt-8 text-xl font-bold">Price</h5>
          <span className="text-2xl text-emerald-500 font-bold">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </span>
          <div className="my-3 text-xl font-bold">Detail</div>
          {product.product_id === 29 ||
          product.product_id === 30 ||
          product.product_id === 31 ||
          product.product_id === 32 ? (
            <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
              <span>Material:</span>
              <span className="italic">Stone</span>
              <br />
            </div>
          ) : (
            <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
              <span>Science name:</span>
              <span className="italic">{product.science_name}</span>
              <br />
            </div>
          )}
          {product.product_id === 29 ||
          product.product_id === 30 ||
          product.product_id === 31 ||
          product.product_id === 32 ? (
            ""
          ) : (
            <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
              <span>Species:</span>
              <span className="italic">{product.species}</span>
              <br />
            </div>
          )}
          <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
            <span>Country:</span>
            <span className="italic">{product.country}</span>
            <br />
          </div>
          <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
            <span>Color:</span>
            <span className="italic">{product.color}</span>
            <br />
          </div>
          <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
            <span>Dimension:</span>
            <span className="italic">{product.dimension}</span>
            <br />
          </div>
          <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
            <span>Weight:</span>
            <span className="italic">{product.weight}</span>
            <br />
          </div>
          <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
            <span>Take care:</span>
            <span className="italic col-span-2 lg:mr-24">{product.take_care}</span>
            <br />
          </div>
          <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
            <span>Quantity Sold:</span>
            <span className="italic">{product.sold} products</span>
            <br />
          </div>
          <div className="grid grid-cols-3 text-justify font-sans text-gray-700">
            <span>Quantity In Stock:</span>
            <span className="italic">{product.in_stock} products</span>
            <br />
          </div>

          <div className="mt-4 flex justify-start space-x-3">
            <h5 className="flex space-x-3 text-xl my-auto font-bold">Quantity:</h5>
            <div className="flex ">
              <button
                onClick={handleDecrease}
                className="rounded-s-[4px] border border-[#EDECEC] p-3 transition hover:border-primary-100 hover:bg-emerald-400 hover:text-white"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 11h14v2H5z" />
                </svg>
              </button>
              <input
                className="w-14 border border-secondary-10 px-4 text-center"
                onChange={handleQuantityChange}
                value={quantity}
              />
              <button
                onClick={handleIncrease}
                className="rounded-s-[4px] border border-[#EDECEC] p-3 transition hover:border-primary-100 hover:bg-emerald-400 hover:text-white"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-6 flex space-x-6">
            {isOpenOrder && (
              <LightboxOrder quantity={quantity} product={product} onCloseRequestOrder={() => setIsOpenOrder(false)} />
            )}
            <button
              onClick={handleBuyNow}
              className="bg-pink-600 grow hover:bg-pink-800 rounded-full shadow-lg shadow-[#AE1339]/30 text-white transition duration-300"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-emerald-400 grow hover:bg-emerald-400 rounded-full shadow-lg shadow-[#AE1339]/30 text-white transition duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleFavorite(productID)}
              className={`hover:bg-emerald-400 ${
                favorite.includes(productID) ? "bg-emerald-400 text-white" : "text-emerald-400"
              } hover:text-white !p-3  border-emerald-400 border-2 rounded-full`}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 1024 1024"
                height={30}
                width={30}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <PopularMenu productID={productID} />
      <Cart />
      <div className="border mb-7 mt-7"></div>
    </div>
  );
};

export default ProductDetail;
