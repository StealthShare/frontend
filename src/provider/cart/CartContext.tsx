import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import useLocalStorage from "use-local-storage";
import { API_URL } from "../../constants";
import { cartReducer } from "./cartReducer";
import { ethers } from "ethers";

interface IUserContext {
  cartData: any[] | null;
  deleteItemByAddress: (address: string) => void;
  clearCart: () => void;
  addItemToCart: (data: any) => void;
}

const initValue: IUserContext = {
  cartData: [],
  deleteItemByAddress: (address: string) => {},
  clearCart: () => {},
  addItemToCart: () => {}
};

export interface CartItem {
  amount: number;
  address: string;
  imageUrl: string;
  category: string;
  name: string;
  price: number;
  size: number;
}

const CartContext = createContext(initValue);

export const CartContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [{}, dispatchUser] = useReducer(cartReducer, initValue);
  const [cartData, setCartData] = useLocalStorage<any[] | null>("CART", [
    {
      amount: 1,
      address: "12",
      imageUrl: "/assets/samples/1.png",
      category: "Gaming",
      name: "Some shit",
      price: 22,
      size: 1.2
    },
    {
      amount: 1,
      imageUrl: "/assets/samples/1.png",
      address: "34",
      category: "Something",
      name: "Elo elo 320",
      price: 40,
      size: 0.1
    }
  ]);

  const clearCart = () => {
    setCartData(null);
  };

  const addItemToCart = (data: any) => {
    setCartData((prevState: any) => [...prevState, data]);
  };

  const deleteItemByAddress = (address: string) => {
    if (cartData?.length == 1) {
      setCartData(null);
    } else {
      setCartData(cartData?.filter((item) => item.address != address));
    }
  };

  return (
    <CartContext.Provider
      value={{ cartData, clearCart, deleteItemByAddress, addItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "`useCartProvider` hook cannot be used outside of a `CartProvider`!"
    );
  }
  return context;
};
