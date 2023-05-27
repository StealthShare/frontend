import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import useLocalStorage from "use-local-storage";
import { API_URL } from "../../constants";
import { userReducer } from "./userReducer";
import { Block, ethers } from "ethers";
//@ts-ignore
import { saveAs } from "file-saver";

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

<<<<<<< HEAD

=======
>>>>>>> f256487b4b49be5fa450cae15222d5c38b375b36
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
