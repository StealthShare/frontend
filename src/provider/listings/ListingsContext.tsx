import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants";
import { useUserContext } from "../user/UserContext";

interface IListing {
  _id: string;
  user: string;
  token: string;
  price: number;
  name: string;
  image: string;
  description: string;
}

interface IListingContext {
  listings: IListing[];
  loading: boolean;
}

const initValue: IListingContext = {
  listings: [],
  loading: false
};

const ListingContext = createContext(initValue);

export const ListingContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [listings, setListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { jwt } = useUserContext();
  const getListings = async () => {
    setLoading(true);
    console.log(true);
    const res = await axios.get(
      `${API_URL}/${"0x6f07465bD94A4e12ee77905EB6477497f0AaBcA7"}/listings`,
      {
        headers: {
          "x-access-token": jwt
        }
      }
    );
    setLoading(false);
    console.log(false);
    console.log(res.data.listings);
    if (res.status === 200) setListings(res.data.listings);
  };
  useEffect(() => {
    getListings();
  }, []);

  return (
    <ListingContext.Provider value={{ listings: listings, loading: loading }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListingContext = () => {
  const context = useContext(ListingContext);

  if (!context) {
    throw new Error(
      "`useListingContext` hook cannot be used outside of a `ListingContextProvider`!"
    );
  }
  return context;
};
