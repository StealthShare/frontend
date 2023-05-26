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

const CartContext = createContext(initValue);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [{}, dispatchUser] = useReducer(cartReducer, initValue);
  const [cartData, setCartData] = useLocalStorage<any[]>('CART', []);

  return <CartContext.Provider value={{ cartData }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('`useCartProvider` hook cannot be used outside of a `CartProvider`!');
  }
  return context;
};
