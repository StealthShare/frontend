import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export const BgPattern = () => {
  return (
    <Flex
      w="100vw"
      h="100%"
      overflow='hidden'
      pos="absolute"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        bgColor="black"
        filter="blur(70px)"
       
        bgGradient="linear(225deg, rgba(0,0,0,1) 0%, rgba(186,116,248,0.6) 50%, rgba(0,0,0,1) 100%)"
        w="60vw"
        h="60vh"
        opacity="1"
        transform="translate(-30%, 10%)"
      />
      <Box
        position="absolute"
        top="0"
        right="0"
        bgColor="black"
       
        filter="blur(70px)"
        bgGradient="linear(135deg, rgba(0,0,0,1) 0%, rgba(186,116,248,0.6) 50%, rgba(0,0,0,1) 100%)"
        w="40vw"
        h="40vh"
        opacity="1"
        transform="translate(50%, -50%)"
      />
    </Flex>
  );
};
