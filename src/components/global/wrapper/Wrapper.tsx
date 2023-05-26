import { Flex, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error } from "../../../pages/Error";
import { Home } from "../../../pages/Home";
import { ScrollToTop } from "../../shared/containers/ScrollToTop";

export const Wrapper = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => setColorMode("dark"), []);

  const pages = [
    {
      path: "/",
      element: <Home />
    }
  ].map((element, index) => ({ ...element, id: `${element.path}_${index}` }));

  return (
    <Flex
      flexWrap="wrap"
      minH="100vh"
      flexDir="column"
      justifyContent="space-between"
    >
      <BrowserRouter>
        <ScrollToTop>
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
