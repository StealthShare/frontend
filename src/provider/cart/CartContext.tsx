import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import useLocalStorage from 'use-local-storage';
import { API_URL } from '../../constants';
import { cartReducer } from './cartReducer';
import { ethers } from 'ethers';

interface IUserContext {
  cartData: any[];
}

const initValue: IUserContext = {
  cartData: [],
};

export interface CartItem {
  amount: number;
  address: string;
  imageUrl: string;
  category: string,
  name: string,
  price: number,
  size: number
}

const CartContext = createContext(initValue);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [{}, dispatchUser] = useReducer(cartReducer, initValue);
  const [cartData, setCartData] = useLocalStorage<CartItem[]>('CART', [{
    amount: 1,
    address: "",
    imageUrl: "/assets/samples/1.png",
    category: "Gaming",
    name: "Some shit",
    price: 22,
    size: 1.2
  },{
    amount: 2,
    imageUrl: "/assets/samples/1.png",
    address: "",
    category: "Something",
    name: "Elo elo 320",
    price: 40,
    size: 0.1
  }]);

  return <CartContext.Provider value={{ cartData }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('`useCartProvider` hook cannot be used outside of a `CartProvider`!');
  }
  return context;
};
