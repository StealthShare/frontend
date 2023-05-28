import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import useLocalStorage from "use-local-storage";
import { API_URL } from "../../constants";
import { cartReducer } from "./cartReducer";
import { ethers } from "ethers";

interface IUserContext {
  cartData: any[] | null;
  deleteItemByAddress: (address: string) => void;
  removeOneByAddress: (address: string) => void;
  clearCart: () => void;
  addItemToCart: (data: any) => void;
  price: number;
}

const initValue: IUserContext = {
  cartData: [],
  deleteItemByAddress: (address: string) => {},
  removeOneByAddress: (address: string) => {},
  clearCart: () => {},
  addItemToCart: () => {},
  price: 0
};

export interface CartItem {
  amount: number;
  address: string;
  imageUrl: string;
  type: string;
  name: string;
  price: number;
  size: number;
  _id: string;
}

const CartContext = createContext(initValue);

export const CartContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [{}, dispatchUser] = useReducer(cartReducer, initValue);
  const [price, setPrice] = useState(0);
  const [cartData, setCartData] = useLocalStorage<any[] | null>("CART", []);

  useEffect(() => {
    console.log(cartData);
    var p = 0;
    cartData?.forEach((data: any) => {
      p += data.price * data.amount;
    });
    setPrice(p);
  }, []);

  const clearCart = () => {
    setCartData(null);
    setPrice(0);
  };

  const addItemToCart = (item: any) => {
    if (
      cartData !== null &&
      cartData.find((data: any) => {
        return data._id === item._id;
      })
    ) {
      const index = cartData.map((data: any) => data._id).indexOf(item._id);
      var pom = cartData.at(index);
      pom.amount += 1;
      setCartData([
        ...cartData.slice(0, index),
        pom,
        ...cartData.slice(index + 1)
      ]);
    } else if (cartData !== null) {
      setCartData([...cartData, item]);
    } else {
      setCartData([item]);
    }
    setPrice((prevState) => prevState + item.price);
  };

  const deleteItemByAddress = (address: string) => {
    if (cartData?.length == 1) {
      setCartData(null);
      setPrice(0);
    } else {
      const item = cartData?.filter((item) => item._id === address)[0];
      setCartData(cartData?.filter((item) => item !== address));
      setPrice((prevState) => prevState - item.price * item.amount);
    }
  };

  const removeOneByAddress = (address: string) => {
    const item = cartData!.filter((item) => item._id === address)[0];
    console.log(item.amount);

    item.amount -= 1;
    setPrice((prevState) => prevState - item.price);
    const index = cartData?.map((data: any) => data._id).indexOf(item._id);
    if (item.amount === 0) {
      if (cartData?.length == 1) {
        setCartData(null);
        setPrice(0);
      } else {
        setCartData([
          ...cartData!.slice(0, index),
          ...cartData!.slice(index! + 1)
        ]);
      }
    } else {
      if (cartData!.length)
        setCartData([
          ...cartData!.slice(0, index),
          item,
          ...cartData!.slice(index! + 1)
        ]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        clearCart,
        deleteItemByAddress,
        addItemToCart,
        price,
        removeOneByAddress
      }}
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
