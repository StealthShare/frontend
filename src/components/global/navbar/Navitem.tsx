import { Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { ActiveLinkIndicator } from "./ActiveLinkIndicator";

interface INavitemProps {
  text: string;
  location: string;
}

export const Navitem: FC<INavitemProps> = ({ text, location }) => {
  const { pathname } = useLocation();

  return (
    <Link to={location} color="white" style={{ position: "relative" }}>
      <Text
        color="white"
        _hover={{ color: "brandPrimary" }}
        fontSize="18px"
        fontWeight="600"
      >
        {text}
      </Text>
      {pathname === location && <ActiveLinkIndicator />}
    </Link>
  );
};
