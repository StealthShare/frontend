import { Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { LeftSection } from "../components/pages/marketplace/leftSection/LeftSection";
import { RightSection } from "../components/pages/marketplace/rightSection/RightSection";
import { PageContainer } from "../components/shared/containers/PageContainer";
import { Heading } from "../components/shared/Heading";
import { useListingContext } from "../provider/listings/ListingsContext";
import { useUserContext } from "../provider/user/UserContext";

export const Inventory = () => {
  const [activeGrid, setActiveGrid] = useState<string>("big");
  const { jwt } = useUserContext();
  const navigate = useNavigate();
  const [inventory, setInventory] = useLocalStorage("inventory", [])
  const [listings, setListings] = useState<any>();
  const [filteredListings, setFilteredListings] = useState<any[]>(listings);
  const { listings: l } = useListingContext();

  useEffect(() => {
    if (jwt === null) navigate("/");
  }, [jwt]);

  

  return (
    <PageContainer>
      <Flex flexDir="column" mt="40px">
        <Heading text="Inventory" />
        <Grid templateColumns="350px auto" mt="30px" gap="50px">
          <RightSection
            activeGrid={activeGrid}
            setActiveGrid={setActiveGrid}
            filteredListings={filteredListings}
            setFilteredListings={setFilteredListings}
          />
          <LeftSection
            placeholder={"Search in your inventory"}
            activeGrid={activeGrid}
            download
            filteredListings={l}
            setFilteredListings={setFilteredListings}
          />
        </Grid>
      </Flex>
    </PageContainer>
  );
};
