import { Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface ICategoryItemProps {
  text: string;
  active?: boolean;
  onClick: () => void;
}

export const CategoryItem: FC<ICategoryItemProps> = ({
  text,
  active,
  onClick
}) => {
  return (
    <Text
      _hover={{ color: "brandSecondary" }}
      color={active ? "brandPrimary" : "white"}
      cursor="pointer"
      onClick={onClick}
    >
      {text}
    </Text>
  );
};
