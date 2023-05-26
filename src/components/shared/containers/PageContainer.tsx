import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";

interface IPageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: FC<IPageContainerProps> = ({ children }) => {
  return (
    <Flex
      maxWidth="1200px"
      zIndex="1"
      m={{ base: "0 32px", md: "0 5vw", lg: "default" }}
      w={{ base: "calc(100vw - 64px)", md: "100%" }}
      position="relative"
      flexDir="column"
    >
      {children}
    </Flex>
  );
};
