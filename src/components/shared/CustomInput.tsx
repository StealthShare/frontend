import { Input } from "@chakra-ui/react";
import React, { FC } from "react";

interface ICustomInputProps {
  placeholder: string;
}

export const CustomInput = ({ ...props }) => {
  return (
    <Input
      {...props}
      variant="unstyled"
      p={props.p ? props.p : "22px 26px"}
      bgColor="rgba(0, 0, 0, 0.25)"
      border="1px solid rgba(255, 255, 255, 0.17)"
      borderRadius="8px"
      placeholder={props.placeholder}
      _placeholder={{
        color: "#E1BEFF",
        fontFamily: "Inter",
        fontWeight: "300",
        fontSize: "18px"
      }}
      fontFamily="Inter"
      fontWeight="300"
      fontSize="18px"
      _focus={{
        outline: "none !important",
        border: "1px solid rgba(255, 255, 255, 0.17)"
      }}
    />
  );
};
