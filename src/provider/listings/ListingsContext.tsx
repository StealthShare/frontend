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
  size: number;
  type: string;
  tags: string[];
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
  const getListings = async () => {
    setLoading(true);
    const res = await axios.get(`${API_URL}/listings`);
    setLoading(false);
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
