import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollPosition } from "../../../hooks/useScrollPosition";
import { CartIcon } from "../../../icons/CartIcon";
import { HomeIcon } from "../../../icons/HomeIcon";
import { UserIcon } from "../../../icons/UserIcon";
import { useCartContext } from "../../../provider/cart/CartContext";
import { useUserContext } from "../../../provider/user/UserContext";
import { currencyFormatter } from "../../../utils/currencyFormatter";
import { CartTooltip } from "../../pages/cart/CartTooltip/cartTooltip";
import { PageContainer } from "../../shared/containers/PageContainer";
import { ActiveLinkIndicator } from "./ActiveLinkIndicator";
import { ConnectButton } from "./ConnectButton";
import { Navitem } from "./Navitem";

export const Navbar = () => {
  const [homeIconColor, setHomeIconColor] = useState<string>("white");

  const { cartData, price } = useCartContext();
  const { pathname } = useLocation();
  const { jwt } = useUserContext();

  const { scrollPosition } = useScrollPosition();

  return (
    <Flex
      zIndex="100"
      justify="space-between"
      align="center"
      py={{
        base: scrollPosition > 30 ? "10px" : "15px",
        md: scrollPosition > 30 ? "25px" : "49px"
      }}
      position="fixed"
      top="0"
      w="100%"
      transition="0.3s all"
      {...(scrollPosition > 30
        ? {
            boxShadow: "3.4px 6.7px 6.7px hsl(0deg 0% 0% / 0.05)",
            bgColor: "backgroundMain"
          }
        : {})}
    >
      <PageContainer>
        <Flex align="center" justify="space-between">
          <Link to="/">
            <Image
              src="/assets/icons/logo.svg"
              transform="translateX(-16px)"
              mt="-19px"
              mb="-19px"
            />
          </Link>
          <Flex gap="37px" align="center">
            <Flex gap="32px" align="center" _hover={{ color: "brandPrimary" }}>
              {/* <Navitem text="Marketplace" location="/marketplace" />
              <Box w="1px" h="18px" bgColor="#383A56" /> */}
              <Navitem text="Sell" location="/sell" />
              <Box w="1px" h="18px" bgColor="#383A56" />
              {jwt !== null && (
                <Navitem text="Inventory" location="/inventory" />
              )}
            </Flex>
            <Flex align="center" gap="31px">
              <ConnectButton />
              <Link to="/cart">
                <Flex align="center" pos="relative" role="group" gap="12px">
                  <CartTooltip />
                  <CartIcon cursor="pointer" />
                  <Text
                    fontFamily="inter"
                    fontSize="14px"
                    color="white"
                    fontWeight="600"
                  >
                    {currencyFormatter(price)}
                  </Text>
                </Flex>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </PageContainer>
    </Flex>
  );
};
