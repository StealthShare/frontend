import { Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface ICategoryItemProps {
  text: string;
}

export const CategoryItem: FC<ICategoryItemProps> = ({ text }) => {
  return (
    <Text _hover={{ color: "brandSecondary" }} cursor="pointer">
      {text}
    </Text>
  );
};
