"use client";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/User/AuthProvider";
import { formatDate } from "@/utils/dateUtils";

const SuccessPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { user, isLoggedIn } = useContext(AuthContext);
  const user_id = user.user_id;
  useEffect(() => {
    fetch(`${process.env.DOMAIN}/cart/orderHistory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }), // Send the user_id in the request body
    })
      .then((response) => response.json())
      .then((data) => setOrderHistory(data))
      .catch((error) => console.error("Error fetching order history:", error));
  }, [user_id]);

  return (
    <div className=" container mx-auto px-5 text-gray-800 bg-white rounded-2xl">
      <h3 className="text-3xl font-bold pt-4  text-emerald-500">Course History</h3>
      <span>Check the status of recent Courses, manage returns, and discover similar products.</span>

      {orderHistory.map((order) => (
        <div
          key={order.order_id}
          className=" p-4 mb-4 border border-slate-300 hover:border-emerald-500 rounded-lg shadow-md my-5"
        >
          <div className="flex justify-between items-start ">
            <div className="text-gray-600  font-semibold">
              <h2 className="text-xl font-semibold mb-2 ">Order Number: FDJ23SD{order.order_id}</h2>
              <div className="flex gap-3">
                <span className="">Name: {order.name}</span>
                <span className="">Phone: {order.phone}</span>
                <span className="">Address: {order.address}</span>
              </div>

              <p className="">Order Date: {formatDate(order.order_date)}</p>
              <p className="text-rose-600">
                Total Price:{" "}
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.total_price)}
              </p>
            </div>
            <button className="px-5 py-2 border border-slate-600 rounded-lg hover:bg-emerald-500 hover:text-white">
              View Invoice
            </button>
          </div>
          <hr />
          <h3 className="text-lg font-semibold mt-4 text-gray-600 ">Products:</h3>
          <ul className="mt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {order.products.map((product, index) => (
                <div key={product.product_id}>
                  <div className="hover:bg-slate-100 rounded-lg p-0 lg:p-5 group">
                    <li className="flex items-start lg:items-center space-x-4 text-slate-800  ">
                      <img
                        src={product.thumb_image_url}
                        alt={product.product_name}
                        className=" w-1/6 max-h-[100px] aspect-square rounded-lg shadow-md object-scale-down bg-white "
                      />
                      <div className="w-5/6">
                        <div className="flex font-semibold items-start justify-between   group-hover:text-white-600">
                          <div>
                            <Link href={"/products/" + product.product_id} className="">
                              {product.product_name}
                            </Link>
                            <p className="text-sm text-s">Quantity: {product.quantity}</p>
                          </div>
                          <p className="text-rose-600 ">
                            Unit Price:{" "}
                            {Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.unit_price)}
                          </p>
                        </div>

                        <p className="font-medium ">
                          Order status:{" "}
                          <span
                            className={`text-sm ${
                              product.status === 0
                                ? "text-red-600"
                                : product.status === 1
                                ? "text-green-600"
                                : "text-amber-500"
                            }`}
                          >
                            {product.status === 0
                              ? "Order canceled "
                              : product.status === 1
                              ? "Item has been shipped"
                              : "Waiting"}
                          </span>
                        </p>
                        <p className="text-base text-slate-600 my-2 hidden lg:block ">Note: {product.note}</p>
                      </div>
                    </li>

                    <div className="flex justify-evenly items-center mt-5">
                      <div className="flex justify-between items-center ">
                        <svg
                          className="fill-emerald-500 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                        <p> Delivered on August 12, 2023</p>
                      </div>
                      <div>
                        <Link
                          href={"/products/" + product.product_id}
                          className="text-emerald-500 hover:text-emerald-600 "
                        >
                          View product | Buy again
                        </Link>
                      </div>
                    </div>
                  </div>
                  {index % 2 ? (
                    <hr className="my-2  border-2" />
                  ) : (
                    index < order.products.length - 1 && <hr className="my-2 border-2" />
                  )}
                </div>
              ))}
            </div>
          </ul>
        </div>
      ))}
      {isLoggedIn ? (
        <>
          {" "}
          <div className="bg-white p-6 rounded-lg md:mx-auto">
            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Your order has been successfully handled!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for your purchase.We will deliver goods to the provided address.
              </p>
              <p> Have a great day!</p>
              <div className="py-10 text-center">
                <Link
                  href="/products"
                  className="px-12 bg-emerald-300 hover:bg-emerald-500 text-gray-600 font-semibold py-3 rounded"
                >
                  GO BACK
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container mx-auto flex items-center flex-col my-32 px-5 gap-3 py-10">
          <p className="text-2xl font-semibold"> Lỗi rồi!</p>
          <p>Hãy đăng nhập và quay lại trang này xem lịch sử order sau nha bạn &lt;3</p>
          <img src="https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg" alt="" />
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
