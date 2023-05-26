import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";

interface IPageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: FC<IPageContainerProps> = ({ children }) => {
  return (
    <Flex
      maxW="1200px"
      zIndex="1"
      w={{ base: "calc(100vw - 64px)", xl: "100%" }}
      position="relative"
      flexDir="column"
      mx="auto"
      overflow="hidden"
    >
      {children}
    </Flex>
  );
};
