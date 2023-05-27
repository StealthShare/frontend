import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import useLocalStorage from "use-local-storage";
import { API_URL } from "../../constants";
import { userReducer } from "./userReducer";
import { ethers } from "ethers";

interface IUserContext {
  isLoggedIn: boolean;
  address: string;
  login: () => void;
  logout: () => void;
  jwt: string | null;
}

const initValue: IUserContext = {
  isLoggedIn: false,
  address: "",
  login: () => {},
  logout: () => {},
  jwt: null
};

const UserContext = createContext(initValue);

export const UserContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [{ isLoggedIn, address }, dispatchUser] = useReducer(
    userReducer,
    initValue
  );
  const [userAddress, setUserAddress] = useLocalStorage<string | null>(
    "address",
    null
  );
  const [jwt, setJWT] = useLocalStorage<string | null>("JWT", null);

  const login = async () => {
    try {
      await (window as any).ethereum.enable();
      const provider = new ethers.BrowserProvider((window as any).ethereum);

      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts"
      });
      const account = accounts[0];

      const seedResponse = await axios.get(`${API_URL}/${account}/getNonce`);

      const messageToSign = JSON.stringify(seedResponse.data.seed);

      const signed = await (window as any).ethereum.request({
        method: "personal_sign",
        params: [messageToSign, account]
      });

      const res = await axios.post(`${API_URL}/login`, {
        message: messageToSign,
        signedMessage: signed,
        address: account
      });

      const res2 = await axios.get(
        `${API_URL}/${"0x9ADe7B7c9B57CE317e0e471950CE67307D7fD91e"}/download`,
        {
          headers: {
            "x-access-token": res.data
          }
        }
      );

      // const res3 = await axios.get(
      //   `${API_URL}/${"0x6f07465bD94A4e12ee77905EB6477497f0AaBcA7"}/listings`,
      //   {
      //     headers: {
      //       "x-access-token": res.data
      //     }
      //   }
      // );

      console.log(res2);

      setJWT(res.data);
      dispatchUser({ type: "LOGIN" });
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    setUserAddress(null);
    setJWT(null);
    dispatchUser({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, address, login, logout, jwt }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "`useUserContext` hook cannot be used outside of a `UserContextProvider`!"
    );
  }
  return context;
};
