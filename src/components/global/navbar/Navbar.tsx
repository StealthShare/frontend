import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartIcon } from "../../../icons/CartIcon";
import { HomeIcon } from "../../../icons/HomeIcon";
import { UserIcon } from "../../../icons/UserIcon";
import { useUserContext } from "../../../provider/user/UserContext";
import { PageContainer } from "../../shared/containers/PageContainer";
import { ActiveLinkIndicator } from "./ActiveLinkIndicator";
import { Navitem } from "./Navitem";

export const Navbar = () => {
  const [homeIconColor, setHomeIconColor] = useState<string>("white");

  const { pathname } = useLocation();

  const { login, logout, isLoggedIn } = useUserContext();

  return (
    <PageContainer>
      <Flex
        zIndex="100"
        justify="space-between"
        align="center"
        py={{ base: "15px", md: "49px" }}
      >
        <Link to="/">
          <Image
            src="/assets/icons/logo.svg"
            transform="translateX(-16px)"
            mt="-19px"
            mb="-19px"
          />
        </Link>
        <Flex gap="37px" align="center">
          <Link to="/" style={{ position: "relative" }}>
            <HomeIcon
              color={homeIconColor}
              onMouseEnter={() => setHomeIconColor("#BA74F8")}
              onMouseLeave={() => setHomeIconColor("white")}
            />
            {pathname === "/" && <ActiveLinkIndicator />}
          </Link>
          <Flex gap="32px" align="center" _hover={{ color: "brandPrimary" }}>
            <Navitem text="Marketplace" location="/marketplace" />
            <Box w="1px" h="18px" bgColor="#383A56" />
            <Navitem text="Sell" location="/sell" />
            <Box w="1px" h="18px" bgColor="#383A56" />
            <Navitem text="Inventory" location="/inventory" />
          </Flex>
          <Flex align="center" gap="31px">
            {isLoggedIn && (
              <Flex
                h="42px"
                w="42px"
                align="center"
                justify="center"
                border="1px solid #BA74F8"
                cursor="pointer"
                borderRadius="50%"
                _hover={{ bgColor: "brandPrimary" }}
                onClick={() => logout()}
              >
                <UserIcon />
              </Flex>
            )}
            {!isLoggedIn && (
              <Button onClick={() => login()}>Connect Wallet</Button>
            )}
            <Flex align="center" gap="12px">
              <CartIcon cursor="pointer" />
              <Text fontFamily="inter" fontSize="14px" fontWeight="600">
                $431.21
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </PageContainer>
  );
};
