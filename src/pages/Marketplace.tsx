import { Flex, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import { LeftSection } from "../components/pages/marketplace/leftSection/LeftSection";
import { RightSection } from "../components/pages/marketplace/rightSection/RightSection";
import { PageContainer } from "../components/shared/containers/PageContainer";
import { Heading } from "../components/shared/Heading";
import { useListingContext } from "../provider/listings/ListingsContext";

export const Marketplace = () => {
  const [activeGrid, setActiveGrid] = useState<string>("big");
  const { listings } = useListingContext();
  const [filteredListings, setFilteredListings] = useState<any[]>(listings);

  return (
    <PageContainer>
      <Flex flexDir="column" mt="40px">
        <Heading text="Marketplace" />
        <Grid templateColumns="350px auto" mt="30px" gap="50px">
          <RightSection
            activeGrid={activeGrid}
            setActiveGrid={setActiveGrid}
            filteredListings={filteredListings}
            setFilteredListings={setFilteredListings}
          />
          <LeftSection
            placeholder={"Search in StealthShare"}
            activeGrid={activeGrid}
            filteredListings={filteredListings}
            setFilteredListings={setFilteredListings}
          />
        </Grid>
      </Flex>
    </PageContainer>
  );
};
