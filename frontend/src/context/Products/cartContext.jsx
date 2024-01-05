"use client";
import { getCart, updatecart } from "@/service/OrderService";
import { getImage } from "@/service/courseService";
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  let uid = JSON.parse(localStorage.getItem('token'))?.id;
  const [cart, setCart] = useState();
  const [itemInfo, setInfo] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showItem, setShowItem] = useState(true);
  const [showCart, setShowCart] = useState('translate-x-[200%]');

  const addToCart = (id,price) => {
    let item = {
      id:null,
      courseId:id,
      startAt:null,
      endAt:null,
      startHour:null,
      endHour: null,
      price:price
    }
    if (cartItems.filter(v => v.courseId == id).length != 0) toast("You've add this course", { autoClose: 1000, type: 'error', closeButton: false });
    else {
      setCartItems([...cartItems, item]);
      saveCart(item)
      
    };
    
  };
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('token')))
      getCart().then(res => {
        setCartItems(res.list);
        window.localStorage.setItem('cart', JSON.stringify(res));
        setCart(res)
      });
  },[uid])
  useEffect(() => {
    if (cartItems?.length !== 0) {
      console.log(cartItems)
      let arr = (cartItems?.map((v, i) => { return v.courseId }));
      getImage(arr).then(res => setInfo(res.data)).catch(err=>setInfo([]));
    }
  },[cartItems])
  const saveCart = (body) => {
    updatecart(cart.id,body).then(res=>console.log(res))
  }
  
  const handleRemoveItem = (i) => {
    const updatedItems = cartItems.filter((item,index) => index!=i);
    setCartItems(updatedItems);
    setInfo(itemInfo.filter((item,index) => index!=i))
  };

  const calculateTotalPrice = () => {
    return cartItems?.reduce((total, item) => total + item.price, 0);
  };

  const calculateTotalProduct = () => {
    return cartItems?.length
  };

  useEffect(() => {
    calculateTotalProduct();
    calculateTotalPrice()
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
        itemInfo,
        saveCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
