import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { PageContainer } from './PageContainer';

export const LineContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex bg="rgba(22, 24, 37, 0.5)" flexDir="column"  mt="100px"  zIndex='0'>
      <Box w="100vw" h="1px" zIndex="1" bgColor="rgba(164, 164, 164, 0.1)" position="relative">
        <Box position="absolute" left="0" h="1px" w="20%" bgColor="brandPrimary" />
      </Box>
      <Flex flexDir="column" gap="50px" py="60px">
        {children}
      </Flex>
    </Flex>
  );
};
