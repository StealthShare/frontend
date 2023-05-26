import { Input } from "@chakra-ui/react";
import React, { FC } from "react";

interface ICustomInputProps {
  placeholder: string;
}

export const CustomInput: FC<ICustomInputProps> = ({ placeholder }) => {
  return (
    <Input
      variant="unstyled"
      p="22px 26px"
      bgColor="rgba(0, 0, 0, 0.25)"
      border="1px solid rgba(255, 255, 255, 0.17)"
      borderRadius="8px"
      placeholder={placeholder}
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
