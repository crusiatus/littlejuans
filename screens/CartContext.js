import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, price: parseFloat(item.price), quantity: 1 }]);
    }
  };

  const removeItem = (itemToRemove) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemToRemove.id);
    setCartItems(updatedCartItems);
  };

  const incrementQuantity = (itemToIncrement) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemToIncrement.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const decrementQuantity = (itemToDecrement) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemToDecrement.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const resetCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };

  // Calculate total amount
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
    setTotalAmount(total);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeItem, incrementQuantity, decrementQuantity, totalAmount, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
