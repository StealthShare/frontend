import { useState } from "react";
import { UserIcon } from "../../../icons/UserIcon";
import { useUserContext } from "../../../provider/user/UserContext";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex
} from "@chakra-ui/react";

export const ConnectButton = () => {
  const { jwt, login, logout } = useUserContext();

  return (
    <>
      {jwt !== null && (
        <Menu>
          <MenuButton>
            <Flex
              h="42px"
              w="42px"
              align="center"
              justify="center"
              border="1px solid #BA74F8"
              cursor="pointer"
              borderRadius="50%"
              _hover={{ bgColor: "brandPrimary" }}
            >
              <UserIcon />
            </Flex>
          </MenuButton>
          <MenuList mt="10px" bg="rgba(40, 41, 57, 1)">
            <MenuItem
              _hover={{ bg: "rgba(50, 51, 70, 1)" }}
              bg="transparent"
              onClick={() => logout()}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      {jwt === null && <Button onClick={() => login()}>Connect Wallet</Button>}
    </>
  );
};
