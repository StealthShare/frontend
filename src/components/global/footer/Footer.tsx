import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { PageContainer } from "../../shared/containers/PageContainer";

export const Footer = () => {
  return (
    <PageContainer>
      <Box h="1px" w="100%" bgColor="#363636" mt="80px" />
      <Flex w="100%" justify="space-between" align="center" pt="30px" pb="60px">
        <Text fontSize="10px" fontWeight="300" color="rgba(255, 255, 255, 0.5)">
          © 2023 StealthShare
        </Text>
        <Link fontSize="12px" fontWeight="300">
          Privacy policy
        </Link>
      </Flex>
    </PageContainer>
  );
};
