"use client";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showItem, setShowItem] = useState(true);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    setShowItem(true);
    if (existingItem) {
      existingItem.quantity += product.quantity;
      setCartItems((prevItems) => [...prevItems]);
    } else {
      setCartItems((prevItems) => [...prevItems, product]);
    }
  };

  const clearCartItems = () => {
    setCartItems([]);
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCartItems(updatedItems);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const parsedQuantity = parseInt(newQuantity);
    if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
      const updatedItems = cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: parsedQuantity };
        }
        return item;
      });

      setCartItems(updatedItems);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotalProduct = () => {
    setTotalProducts(cartItems.reduce((total, item) => total + item.quantity, 0));
  };

  useEffect(() => {
    calculateTotalProduct();
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        calculateTotalPrice,
        totalProducts,
        calculateTotalProduct,
        showItem,
        setShowItem,
        clearCartItems,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleQuantityChange,
        handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
