import { Box, Button, Flex, Grid, Select, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GridBigIcon } from "../../../../icons/GridBigIcon";
import { GridSmallIcon } from "../../../../icons/GridSmallIcon";
import { CustomInput } from "../../../shared/CustomInput";
import { CustomSelect } from "../../../shared/CustomSelect";
import { CategoryItem } from "./CategoryItem";
import { NumInput } from "./NumInput";

interface IRightSectionProps {
  activeGrid: string;
  setActiveGrid: any;
}

export const categories = [
  {
    text: "All",
    value: "all"
  },
  {
    text: "Apps",
    value: "apps"
  },
  {
    text: "Audios",
    value: "audios"
  },
  {
    text: "Games",
    value: "games"
  },
  {
    text: "Videos",
    value: "videos"
  },
  {
    text: "Docs",
    value: "docs"
  },
  {
    text: "Mobile",
    value: "mobile"
  },
  {
    text: "Porn",
    value: "porn"
  }
];

export const RightSection: FC<IRightSectionProps> = ({
  activeGrid,
  setActiveGrid
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [category, setCategory] = useSearchParams();
  const navigate = useNavigate();
  const tag = category.get("tag");
  const search = category.get("search") ?? "";

  useEffect(() => {
    if (category.get("category") !== null) {
      setActiveCategory(category.get("category")!);
      // const matchingNames = listings
      //   .map((listing: any) => listing.name)
      //   .filter((name: string) => {
      //     return name.includes(category.get("category") as string);
      //   });
      // setFilteredListings(
      //   listings.filter((listing: any) => matchingNames.includes(listing.name))
      // );
    } else {
      // console.log("No search");
      // setFilteredListings(listings);
    }
  }, [category]);

  return (
    <Flex flexDir="column" gap="30px">
      <Flex justify="space-between" gap="9px">
        <Grid
          h="100%"
          border="1px solid rgba(255,255,255,0.2)"
          borderRadius="8px"
          bgColor="rgba(0, 0, 0, 0.25)"
          justifyContent="center"
          justifyItems="center"
          templateColumns="1fr 1fr"
          alignItems="center"
        >
          <Flex
            justify="center"
            borderRight="1px solid rgba(255,255,255,0.2)"
            align="center"
            boxSize="71px"
          >
            <GridBigIcon
              boxSize="20px"
              cursor="pointer"
              color={activeGrid === "big" ? "white" : "#73767D"}
              onClick={() => setActiveGrid("big")}
            />
          </Flex>
          <Flex justify="center" align="center" boxSize="71px">
            <GridSmallIcon
              boxSize="20px"
              cursor="pointer"
              color={activeGrid === "small" ? "white" : "#73767D"}
              onClick={() => setActiveGrid("small")}
            />
          </Flex>
        </Grid>
        <CustomSelect placeholder="Sort by" />
      </Flex>
      <Box h="1px" w="100%" bgColor="#262626" />
      <Flex flexDir="column" gap="30px">
        <Text fontSize="18px" fontWeight="700">
          Categories
        </Text>
        <Flex flexDir="column" gap="16px" fontFamily="Inter" fontSize="16px">
          {categories.map((category: any) => (
            <CategoryItem
              key={category.value}
              text={category.text}
              active={activeCategory === category.value}
              onClick={() => {
                setActiveCategory(category.value);
                navigate(
                  `/marketplace?search=${search}&category=${category.value}&tags=${tag}`
                );
              }}
            />
          ))}
        </Flex>
      </Flex>
      <Box h="1px" w="100%" bgColor="#262626" />
      <Flex flexDir="column" gap="30px">
        <Flex align="center" justify="space-between">
          <Text fontSize="18px" fontWeight="700">
            Price
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Flex align="center" gap="11px" justify="space-between">
            <NumInput placeholder="min" />
            <Text
              fontFamily="Inter"
              fontSize="12px"
              fontWeight="300"
              color="#73767D"
            >
              to
            </Text>
            <NumInput placeholder="max" />
          </Flex>
        </Flex>
        <Button>Apply</Button>
      </Flex>
    </Flex>
  );
};
