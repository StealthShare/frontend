import { Flex, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error } from "../../../pages/Error";
import { Home } from "../../../pages/Home";
import { Inventory } from "../../../pages/Inventory";
import { Marketplace } from "../../../pages/Marketplace";
import { Sell } from "../../../pages/Sell";
import { ScrollToTop } from "../../shared/containers/ScrollToTop";
import { BgPattern } from "../BgPattern";
import { Navbar } from "../navbar/Navbar";
import { SocialBanner } from "../socialBanner/SocialBanner";

export const Wrapper = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => setColorMode("dark"), []);

  const pages = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/marketplace",
      element: <Marketplace />
    },
    {
      path: "/sell",
      element: <Sell />
    },
    {
      path: "/inventory",
      element: <Inventory />
    }
  ].map((element, index) => ({ ...element, id: `${element.path}_${index}` }));

  return (
    <Flex flexWrap="wrap" minH="100vh" flexDir="column">
      <BrowserRouter>
        <ScrollToTop>
          <BgPattern />
          <SocialBanner />
          <Navbar />
          <Routes>
            {pages.map(({ path, element, id }) => (
              <Route path={path} element={element} key={id} />
            ))}
            <Route path="*" element={<Error />} key="*" />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </Flex>
  );
};
