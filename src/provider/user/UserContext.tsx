import React, { createContext, useContext, useReducer } from "react";
import useLocalStorage from "use-local-storage";
import { userReducer } from "./userReducer";

interface IUserContext {
  isLoggedIn: boolean;
  address: string;
  login: () => void;
  logout: () => void;
}

const initValue: IUserContext = {
  isLoggedIn: false,
  address: "",
  login: () => {},
  logout: () => {}
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

  const login = () => {
    setUserAddress("0x1231231");
    dispatchUser({ type: "LOGIN", payload: "0x1231231" });
  };
  const logout = () => {
    setUserAddress(null);
    dispatchUser({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, address, login, logout }}>
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
