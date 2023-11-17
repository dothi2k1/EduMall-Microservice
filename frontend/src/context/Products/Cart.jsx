import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./cartContext";
import Link from "next/link";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems, calculateTotalPrice, updateQuantity, showItem, setShowItem } = useContext(CartContext);
  const [openCard, setOpenCard] = useState(false);

  const handleToggleCart = () => {
    setOpenCard((prevOpenCard) => !prevOpenCard);
  };

  const handleCloseItem = () => {
    setShowItem(false);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleIncrease = (itemId) => {
    const updatedQuantity = cartItems.find((item) => item.id === itemId).quantity + 1;
    updateQuantity(itemId, updatedQuantity);
  };

  const handleDecrease = (itemId) => {
    const currentItem = cartItems.find((item) => item.id === itemId);
    if (currentItem.quantity === 1) {
      return;
    }
    const updatedQuantity = currentItem.quantity - 1;
    updateQuantity(itemId, updatedQuantity);
  };

  return (
    <>
      {openCard && (
        <div className="fixed  shadow-md bottom-0 right-3 rounded-lg hover:overflow-x-auto bg-emerald-200  max-h-80 w-80 z-20  ">
          <div className="flex rounded-lg justify-between items-center bg-emerald-300 ">
            <div className=" ml-5">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
                viewBox="0 0 30 30"
                role="presentation"
                style={{ height: 30 }}
                className="fill-white"
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
            </div>
            <button
              onClick={handleToggleCart}
              type="button"
              className=" bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 border-tr-full "
            >
              <span className="sr-only">Close menu</span>
              {/* Heroicon name: outline/x */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-5">
            <div className="bg-emerald-300 rounded p-2">
              <h3 className="text-2xl text-gray-800 font-semibold mx-auto">Cart</h3>

              <p className="font-semibold text-xl text-gray-800">
                Total:{" "}
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(calculateTotalPrice())}
              </p>
              <Link href="/products/my-cart">
                <span className="text-red-600 font-semibold">Xem Tất Cả</span>
              </Link>
            </div>
            {cartItems.map((item) => (
              <div className="flex justify-between bg-emerald-300 mt-3 p-2 rounded" key={item.id}>
                <p className="flex">
                  <img
                    alt="Handicarft"
                    decoding="async"
                    data-nimg="1"
                    className="mx-auto rounded group-hover:scale-95 transition-all 1s linear mr-3 h-10 w-10 object-cover"
                    src={item.thumb_image_url}
                    priority
                  />
                  {item.name} x{item.quantity}
                </p>
                <p></p>
                <p className="text-red-600 font-medium">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                </p>{" "}
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        className="fixed bottom-4 right-4 z-10 bg-emerald-300 text-white p-3 rounded-full"
        onClick={handleToggleCart}
      >
        <div className="absolute top-0 right-0">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </div>
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
      </button>
      <div className="fixed bottom-20 right-5 z-10 text-sm overflow-hidden">
        {cartItems.map((item, index) => (
          <CartItem key={index} product={item} onClose={handleCloseItem} />
        ))}
      </div>
    </>
  );
};

export default Cart;
