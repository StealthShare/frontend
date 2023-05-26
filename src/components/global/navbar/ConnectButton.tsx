import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { UserIcon } from '../../../icons/UserIcon';
import { useUserContext } from '../../../provider/user/UserContext';

export const ConnectButton = () => {
  const { isLoggedIn, login, logout } = useUserContext();


  return (
    <>
      {isLoggedIn && (
        <Flex
          h="42px"
          w="42px"
          align="center"
          justify="center"
          border="1px solid #BA74F8"
          cursor="pointer"
          borderRadius="50%"
          _hover={{ bgColor: 'brandPrimary' }}
          onClick={() => logout()}
        >
          <UserIcon />
        </Flex>
      )}
      {!isLoggedIn && <Button onClick={() => login()}>Connect Wallet</Button>}
    </>
  );
};
