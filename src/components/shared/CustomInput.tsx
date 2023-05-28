import { Box, Flex, Input } from "@chakra-ui/react";
import React, { FC } from "react";

interface ICustomInputProps {
  placeholder: string;
}

export const CustomInput = ({ ...props }) => {
  return (
    <Flex w="100%" flexDir="column" pos="relative">
    <Input
      variant="unstyled"
      p={props.p ? props.p : "22px 26px"}
      bgColor="rgba(0, 0, 0, 0.25)"
      border="1px solid rgba(255, 255, 255, 0.17)"
      borderRadius="8px"
      placeholder={props.placeholder}
      pos="relative"
      _placeholder={{
        color: "rgba(255,255,255,0.4)",
        fontFamily: "Inter",
        fontWeight: "300",
        fontSize: "18px"
      }}
      fontFamily="Inter"
      fontWeight="300"
      fontSize="16px"
      _focus={{
        outline: "none !important",
        border: "1px solid rgba(255, 255, 255, 0.17)"
      }}
      pl={props.icon ? "45px" : "26px"}
      {...props}
    />
      {props.icon && <Flex align="center" justify="center" pos="absolute" left="15px" top="0" bottom="0" marginY="auto" boxSize="20px">{props.icon}</Flex>}
    </Flex>
  );
};
