"use client";
import { getCart } from "@/service/OrderService";
import { getImage } from "@/service/courseService";
import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  let uid = JSON.parse(localStorage.getItem('token')).id;
  const [itemInfo, setInfo] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showItem, setShowItem] = useState(true);
  const [showCart,setShowCart]=useState('translate-x-[200%]')
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('token')))
      getCart().then(res => {
        setCartItems(res.list);
        getImage(res.list?.map(v=>v.couresId)).then(res=>console.log(res))
        window.localStorage.setItem('cart', res)
      });
  },[uid])
  

  const handleRemoveItem = (i) => {
    const updatedItems = cartItems.filter((item,index) => index!=i);
    setCartItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateTotalProduct = () => {
    return cartItems.length
  };

  useEffect(() => {
    calculateTotalProduct();
    calculateTotalProduct()
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        calculateTotalPrice,
        calculateTotalProduct,
        showItem,
        setShowItem,
        handleRemoveItem,
        showCart, setShowCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
