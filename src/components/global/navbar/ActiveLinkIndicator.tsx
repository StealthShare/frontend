import { Box } from "@chakra-ui/react";
import React from "react";

export const ActiveLinkIndicator = () => {
  return (
    <Box
      h="3px"
      w="100%"
      bgColor="brandPrimary"
      position="absolute"
      bottom="-15px"
    />
  );
};
