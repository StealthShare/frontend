import React from "react";
import { PageContainer } from "../components/shared/containers/PageContainer";
import { useUserContext } from "../provider/user/UserContext";

export const Home = () => {
  const user = useUserContext();
  return <PageContainer>{user.address}</PageContainer>;
};
