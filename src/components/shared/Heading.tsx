import { Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface IHeadingProps {
  text: string;
}

export const Heading: FC<IHeadingProps> = ({ text }) => {
  return (
    <Text fontSize="34px" fontWeight="700" color="white">
      {text}
    </Text>
  );
};
