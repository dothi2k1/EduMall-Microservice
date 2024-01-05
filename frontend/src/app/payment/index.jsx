"use client";
import React, { useContext, useState } from "react";
import axiosInstance from "@/utils/axios";
import { CartContext } from "@/context/Products/cartContext";

const PaymentForm = () => {
  const [paymentResponse, setPaymentResponse] = useState(null);
  const { calculateTotalPrice } = useContext(CartContext);

  const handlePaymentClick = () => {
    const requestData = {
      orderCode: Math.floor(Math.random() * 1000000).toString(),
      amount: calculateTotalPrice(),
      cancelUrl: process.env.NEXT_DOMAIN + "/payment/cancel",
      returnUrl: process.env.NEXT_DOMAIN + "/payment/success",
      description: "jsdh",
    };

    axiosInstance
      .post("/api/payment/create", requestData)
      .then((response) => {
        const result = response.data;
        setPaymentResponse(result);

        // Check if the payment was successful and has a checkoutUrl
        if (result.code === "00" && result.data && result.data.checkoutUrl) {
          // Redirect to the checkout URL
          window.location.href = result.data.checkoutUrl;
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <button onClick={handlePaymentClick}>Thanh Toán</button>
      {paymentResponse && <p>Payment Response: {JSON.stringify(paymentResponse)}</p>}
    </div>
  );
};

export default PaymentForm;
