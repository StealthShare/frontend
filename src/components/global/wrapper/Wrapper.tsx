import { Flex, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cart } from "../../../pages/Cart";
import { Error } from "../../../pages/Error";
import { Home } from "../../../pages/Home";
import { Inventory } from "../../../pages/Inventory";
import { Marketplace } from "../../../pages/Marketplace";
import { Sell } from "../../../pages/Sell";
import { ScrollToTop } from "../../shared/containers/ScrollToTop";
import { BgPattern } from "../BgPattern";
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { SocialBanner } from "../socialBanner/SocialBanner";

export const Wrapper = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => setColorMode("dark"), [setColorMode]);

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
      path: "/cart",
      element: <Cart />
    },
    {
      path: "/inventory",
      element: <Inventory />
    }
  ].map((element, index) => ({ ...element, id: `${element.path}_${index}` }));

  return (
    <Flex
      flexWrap="wrap"
      minH="100vh"
      pos="relative"
      flexDir="column"
      zIndex="0"
    >
      <BrowserRouter>
        <ScrollToTop>
          <SocialBanner />
          <BgPattern />
          <Flex mb="20vh">
            <Navbar />
          </Flex>

          <Routes>
            {pages.map(({ path, element, id }) => (
              <Route path={path} element={element} key={id} />
            ))}
            <Route path="*" element={<Error />} key="*" />
          </Routes>

          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </Flex>
  );
};
