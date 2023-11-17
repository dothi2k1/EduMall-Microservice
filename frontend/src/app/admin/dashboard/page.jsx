"use client";
import React, { useState, useContext, useEffect } from "react";

const OrderList = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    fetch(`${process.env.DOMAIN}/admin/dashboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setOrderHistory(data))
      .catch((error) => console.error("Error fetching order history:", error));
  }, []);

  function updateStatus(e) {
    console.log(e);
  }

  function ProductDetail({ data }) {
    return Object.keys(data).map((keys, i) => (
      <>
        {data[keys].products.map((data_product) => (
          <tr key={i} className="my-10">
            <td className="w-1/12 border border-solid">{data[keys].order_id}</td>
            <td className="w-2/12 border border-solid">{data[keys].name}</td>
            <td className="w-2/12 border border-solid">{data[keys].phone}</td>
            <td className="w-2/12 border border-solid">{data[keys].address}</td>
            <td className="w-2/12 border border-solid">{data_product.product_name}</td>
            <td className="w-1/12 border border-solid">
              <img src={data_product.thumb_image_url}></img>
            </td>
            <td className="w-1/12 border border-solid">{data_product.quantity}</td>
            <td className="w-1/12 border border-solid">{<e></e>}</td>
            <td className="w-q/12 border border-solid">{data_product.status}</td>
            <td className="w-1/12 border border-solid">
              <select
                className="bg-gray-300 outline-none text-center"
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option disabled selected>
                  Change
                </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </td>
          </tr>
        ))}
      </>
    ));
  }

  return (
    <div className="overflow-x">
      <div className="my-9">
        <h1 className="text-center font-extrabold text-4xl py-0">Order List</h1>
      </div>
      <table className="table-auto w-[95%] mx-auto h-auto overflow-scroll min-w-[800px]">
        <thead className="bg-[#1E293B] text-center">
          <tr className="h-10 text-white">
            <th className="w-1/12 border border-solid">ID</th>
            <th className="w-2/12 border border-solid">Name</th>
            <th className="w-1/12 border border-solid">Phone</th>
            <th className="w-2/12 border border-solid">Address</th>
            <th className="w-1/12 border border-solid">Item</th>
            <th className="w-1/12 border border-solid">Image</th>
            <th className="w-1/12 border border-solid">Quantity</th>
            <th className="w-1/12 border border-solid">Order Date</th>
            <th className="w-1/12 border border-solid">Status</th>
            <th className="w-1/12 border border-solid">Button</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100 text-center" key="a">
          <ProductDetail data={orderHistory} />
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
