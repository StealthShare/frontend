import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { SearchSection } from "../components/pages/home/SearchSection";
import { SelectedSection } from "../components/pages/home/selected/SelectedSection";
import { PageContainer } from "../components/shared/containers/PageContainer";
import { useUserContext } from "../provider/user/UserContext";

export const Home = () => {
  return (
    <Flex w="100vw" flexDir="column">
      <PageContainer>
        <SearchSection />
      </PageContainer>
      <Box
        w="100vw"
        h="1px"
        bgColor="rgba(164, 164, 164, 0.1)"
        my="100px"
        position="relative"
      >
        <Box
          position="absolute"
          left="0"
          h="1px"
          w="20%"
          bgColor="brandPrimary"
        />
      </Box>
      <PageContainer>
        <SelectedSection />
      </PageContainer>
    </Flex>
  );
};
