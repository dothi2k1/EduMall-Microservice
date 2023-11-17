"use client";
import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "@/context/Products/cartContext";
import Link from "next/link";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/User/AuthProvider";
import ProductList from "../ProductList";
import Categories from "../Categories";

const Cart = () => {
  const {
    cartItems,
    calculateTotalPrice,
    clearCartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleQuantityChange,
    handleRemoveItem,
    totalProducts,
  } = useContext(CartContext);
  const [vouchers, setVouchers] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [error, setError] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [coin, setCoin] = useState(0);
  const [shipper, setShipper] = useState(30000);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCustomer({ ...customer, name: value });
    setErrors({ ...errors, name: value.trim() === "" ? "Name is required" : "" });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setCustomer({ ...customer, phone: value });
    setErrors({ ...errors, phone: value.trim() === "" ? "Phone number is required" : "" });
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setCustomer({ ...customer, address: value });
    setErrors({ ...errors, address: value.trim() === "" ? "Address is required" : "" });
  };

  const [newQuantity, setNewQuantity] = useState();

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(process.env.DOMAIN + "/minigame/vouchers");
        const data = await response.json();
        setVouchers(data); // Assuming the API returns an array of voucher objects
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleShipperChange = (event) => {
    setShipper(parseInt(event.target.value));
  };

  const handleCoinSubmit = (e) => {
    if (!user.coin) {
      setError("Please login to use this promotion feature");
      return null;
    }
    e.target.checked ? setCoin(user.coin) : setCoin(0);
  };

  const handleDiscountCodeSubmit = (e) => {
    e.preventDefault();

    const matchedVoucher = vouchers.find((voucher) => voucher.code === discountCode);
    if (matchedVoucher) {
      setDiscountValue(matchedVoucher.discount);
      setError("Add successful discount codes");
    } else {
      setDiscountValue(0);
      setError("The discount code is incorrect, try the Atomsale1 code for all customers");
    }
  };

  const router = useRouter();
  const handleCheckout = async () => {
    if (user.user_id === undefined) {
      swal("Error", "You must login to check out !!", "error");
      router.push("/user/login");
      return;
    }

    if (!customer.phone || !customer.address) {
      swal("Error", "Please provide your phone number, and address", "error");
      return;
    }
    try {
      const cartItemsForBackend = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      const total_price = calculateTotalPrice() - discountValue - coin;
      const requestData = {
        user_id: user.user_id,
        cartItems: cartItemsForBackend,
        total_price,
        customer,
      };

      const response = await fetch(`${process.env.DOMAIN}/cart/saveCartItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        swal("Checkout Successful", "Your order has been successfully handled!", "success").then(() => {
          clearCartItems();
          router.push("/products/my-oders");
        });
      } else {
        swal("Error", response.statusText, "error");
      }
    } catch (error) {
      swal("Error", "An error occurred during checkout", "error");
    }
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="container mx-auto mt-10 text-slate-800 ">
          <div className="flex-col lg:flex-row flex shadow-md my-10 ">
            <div className="lg:w-3/4 bg-white px-10 py-10 rounded-3xl ">
              <div className="flex justify-between border-b pb-8 ">
                <h1 className="font-semibold text-2xl">My Cart</h1>
                <h2 className="font-semibold text-2xl text-emerald-600">{totalProducts} Items</h2>
              </div>
              <div className="flex mt-10 mb-5 ">
                <h3 className="font-semibold  uppercase w-3/6">Product Details</h3>
                <h3 className="font-semibold text-center  uppercase w-1/6">Quantity</h3>
                <h3 className="font-semibold text-center  uppercase w-1/6 ">Price</h3>
                <h3 className="font-semibold text-center  uppercase w-1/6 ">Total</h3>
                <h3 className="font-semibold text-center  uppercase w-1/6 ">Handle</h3>
              </div>
              {cartItems.map((item, index) => (
                <div key={item.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-3/6">
                    {" "}
                    {/* product */}
                    <div className="">
                      <img
                        className=" max-w-[150px] aspect-square bg-white  rounded-lg  object-scale-down p-5 shadow-md"
                        src={item.thumb_image_url}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <Link href={"/products/" + item.id} className="font-bold text-lg hover:text-emerald-500">
                        {item.name}
                      </Link>
                      <span className="text-gray-500 text-sm hidden lg:block">{item.description}</span>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/6">
                    <button onClick={() => handleDecreaseQuantity(item.id)}>
                      {" "}
                      <svg className="hover:fill-emerald-500 text-gray-600 w-5 fill-emerald-800" viewBox="0 0 448 512">
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                    <input
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      value={item.quantity}
                      className="mx-2 border text-center w-8"
                      type="text"
                      defaultValue={1}
                    />
                    <button onClick={() => handleIncreaseQuantity(item.id)}>
                      {" "}
                      <svg className="hover:fill-emerald-500 text-gray-600 w-5 fill-emerald-800" viewBox="0 0 448 512">
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>{" "}
                    </button>
                  </div>
                  <span className="text-center w-1/6 font-semibold text-sm">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </span>
                  <span className="text-center w-1/6 font-semibold text-sm">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price * item.quantity)}
                  </span>
                  <div className="text-center w-1/6 font-semibold text-sm">
                    {" "}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="group  h-[54px] w-[54px] rounded-full bg-emerald-200 transition duration-200 hover:bg-emerald-300"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={0}
                        viewBox="0 0 15 15"
                        className="text-emerald-800 transition duration-200 group-hover:text-white  mx-auto "
                        height={24}
                        width={24}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              <Link href="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>
            </div>
            <div className="lg:w-1/4 px-8 py-10 bg-white rounded-3xl ">
              <h1 className="font-semibold text-2xl border-b pb-8">Billing Information</h1>

              <div className="py-5">
                <div className="flex justify-between mb-5">
                  <p className="font-semibold text-sm uppercase">Customer information</p>{" "}
                  <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
                  </svg>
                </div>
                <label className="block text-sm text-gray-600" htmlFor="cus_name">
                  Name
                </label>
                <input
                  value={customer.name}
                  onChange={handleNameChange}
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className={`p-2 text-sm w-full ${errors.name || "border-2 border-emerald-500"}`}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}

                <label className="block text-sm text-gray-600" htmlFor="cus_phone">
                  Phone Number*
                </label>
                <input
                  value={customer.phone}
                  onChange={handlePhoneChange}
                  type="number"
                  id="phone"
                  placeholder="Enter your phone number"
                  className={`p-2 text-sm w-full ${errors.phone || "border-2 border-emerald-500"}`}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}

                <label className="block text-sm text-gray-600" htmlFor="cus_address">
                  Address*
                </label>
                <input
                  value={customer.address}
                  onChange={handleAddressChange}
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  className={`p-2 text-sm w-full ${errors.address || "border-2 border-emerald-500"}`}
                />
                {errors.address && <p className="text-red-500">{errors.address}</p>}
              </div>
              <div className=" mb-2 ">
                <label className="font-semibold inline-block mb-3 text-sm uppercase">Shipping method</label>
                <select
                  className="block p-2 text-gray-800 w-full text-sm border rounded "
                  value={shipper}
                  onChange={handleShipperChange}
                >
                  <option value="30000">Fast - 30,000 đ</option>
                  <option value="100000">Super fast - 100,000 đ</option>
                </select>
              </div>

              <div className="flex justify-between my-5">
                <span className="flex gap-2">
                  Dùng{" "}
                  <div className="flex items-center">
                    <span className="text-amber-500 font-semibold">{user.coin} </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      className="fill-amber-500 ml-1"
                    >
                      <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z" />
                    </svg>
                  </div>
                  Atom Xu
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCoinSubmit(e)}
                    defaultValue=""
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Apply</span>
                </label>
              </div>
              <div className="py-5">
                <div className="flex justify-between mb-5">
                  <p className="font-semibold text-sm uppercase">Do you have a promo code?</p>{" "}
                  <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M96 224c53 0 96-43 96-96s-43-96-96-96S0 75 0 128s43 96 96 96zm0-144c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm192 208c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm93.9-381.2L57.2 475c-2.3 3.1-5.9 5-9.7 5H12c-9.6 0-15.3-10.7-10-18.7L327.2 37c2.3-3.1 5.9-5 9.7-5H372c9.6 0 15.3 10.8 9.9 18.8z"></path>
                  </svg>
                </div>
                <input
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                />
              </div>

              <button
                onClick={handleDiscountCodeSubmit}
                className="border border-emerald-500 hover:bg-emerald-600 px-5 py-2 text-sm hover:text-white rounded-lg"
              >
                Apply Coupoun
              </button>
              <span className={`text-sm  w-full ${!discountValue ? "text-red-600" : "text-green-600"}`}> {error}</span>

              <div className="flex items-start justify-between mt-3">
                <h6 className="text-heading-6 font-medium">Discount</h6>
                <div className="flex flex-col items-start">
                  {shipper && (
                    <span className="text-sm text-green-600 font-semibold">
                      +{" "}
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(shipper)}
                    </span>
                  )}
                  {discountValue && (
                    <span className="text-sm text-red-600 font-semibold">
                      -{" "}
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(discountValue)}
                    </span>
                  )}
                  {coin && (
                    <span className="text-sm text-red-600 font-semibold">
                      -{" "}
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(coin)}
                    </span>
                  )}
                </div>
              </div>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>
                    {" "}
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(calculateTotalPrice() - discountValue - coin + shipper)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-emerald-500 font-semibold hover:bg-emerald-600 py-3 text-sm text-white uppercase w-full rounded-lg"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container mx-auto flex items-center flex-col my-32 px-5 gap-3">
            <p className="text-2xl font-semibold"> Cart of drum goods!</p>
            <p>Add products to the basket and return to this page to pay &lt;3</p>
            <img src="https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg" alt="" />
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
