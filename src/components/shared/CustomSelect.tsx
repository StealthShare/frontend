import { Select } from "@chakra-ui/react";
import React, { FC } from "react";

interface ICustomSelectProps {
  placeholder: string;
}

export const CustomSelect: FC<ICustomSelectProps> = ({ placeholder }) => {
  return <Select placeholder={placeholder} h="73px" />;
};
