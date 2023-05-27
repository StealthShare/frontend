import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { NewestSection } from '../components/pages/home/newest/newestSection';
import { SearchSection } from '../components/pages/home/SearchSection';
import { SelectedSection } from '../components/pages/home/selected/SelectedSection';
import { LineContainer } from '../components/shared/containers/LineContainer';
import { PageContainer } from '../components/shared/containers/PageContainer';
import { useUserContext } from '../provider/user/UserContext';

export const Home = () => {
  return (
    <Flex w="100vw" flexDir="column" >
      <PageContainer>
        <SearchSection />
      </PageContainer>
      <LineContainer>
        <SelectedSection />
        <NewestSection/>
      </LineContainer>
    </Flex>
  );
};
