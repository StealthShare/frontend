import { Flex, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import { LeftSection } from "../components/pages/marketplace/leftSection/LeftSection";
import { RightSection } from "../components/pages/marketplace/rightSection/RightSection";
import { PageContainer } from "../components/shared/containers/PageContainer";
import { Heading } from "../components/shared/Heading";

export const Inventory = () => {
  const [activeGrid, setActiveGrid] = useState<string>("big");

  return (
    <PageContainer>
      <Flex flexDir="column" mt="40px">
        <Heading text="Inventory" />
        <Grid templateColumns="350px auto" mt="20px" gap="50px">
          <RightSection activeGrid={activeGrid} setActiveGrid={setActiveGrid} />
          <LeftSection activeGrid={activeGrid} download />
        </Grid>
      </Flex>
    </PageContainer>
  );
};
