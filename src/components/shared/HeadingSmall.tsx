import { Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface IHeadingSmallProps {
  text: string;
}

export const HeadingSmall: FC<IHeadingSmallProps> = ({ text }) => {
  return (
    <Text fontSize="24px" fontWeight="700" color="white">
      {text}
    </Text>
  );
};
