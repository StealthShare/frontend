import { Input } from "@chakra-ui/react";
import React, { FC } from "react";

interface INumInputProps {
  placeholder: string;
}

export const NumInput: FC<INumInputProps> = ({ placeholder }) => {
  return (
    <Input
      variant="unstyled"
      p="13px"
      display="flex"
      w="30%"
      justifyContent="center"
      bgColor="rgba(0, 0, 0, 0.25)"
      border="1px solid rgba(255, 255, 255, 0.17)"
      borderRadius="8px"
      placeholder={placeholder}
      _placeholder={{
        color: "#73767D",
        fontFamily: "Inter",
        fontWeight: "300",
        fontSize: "12px"
      }}
      fontFamily="Inter"
      fontWeight="300"
      fontSize="12px"
      _focus={{
        outline: "none !important",
        border: "1px solid rgba(255, 255, 255, 0.17)"
      }}
    ></Input>
  );
};
