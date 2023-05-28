import { Box, Button, Flex, Grid, Select, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categories } from '../../../../constants/categories';
import { GridBigIcon } from '../../../../icons/GridBigIcon';
import { GridSmallIcon } from '../../../../icons/GridSmallIcon';
import { useListingContext } from '../../../../provider/listings/ListingsContext';
import { CustomInput } from '../../../shared/CustomInput';
import { CustomSelect } from '../../../shared/CustomSelect';
import { CategoryItem } from './CategoryItem';
import { NumInput } from './NumInput';

interface IRightSectionProps {
  activeGrid: string;
  setActiveGrid: any;
  filteredListings: any;
  setFilteredListings: any;
}

export const RightSection: FC<IRightSectionProps> = ({
  activeGrid,
  setActiveGrid,
  filteredListings,
  setFilteredListings
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [category, setCategory] = useSearchParams();
  const navigate = useNavigate();
  const tag = category.get("tag");
  const search = category.get("search") ?? "";
  const cat = category.get("category") ?? "";
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const { listings } = useListingContext();

  useEffect(() => {
    if (
      category.get("category") !== null ||
      (minPrice !== "" && maxPrice !== "")
    ) {
      setActiveCategory(category.get("category")!);
      const matchingPrices = filteredListings
        .map((listing: any) => listing.price)
        .filter((price: number) => {
          return price >= +minPrice && price <= +maxPrice;
        });
      console.log("filtered", filteredListings);
      console.log("prices", matchingPrices);
      setFilteredListings(
        filteredListings.filter((listing: any) => {
          return matchingPrices === listing.price;
        })
      );
    } else {
      console.log("No search");
      setFilteredListings(filteredListings);
    }
  }, [category]);

  return (
    <Flex flexDir="column" gap="30px">
      <Flex flexDir="column" pos="sticky" top="120px">
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
            <Flex justify="center" borderRight="1px solid rgba(255,255,255,0.2)" align="center" boxSize="71px">
              <GridBigIcon
                boxSize="20px"
                cursor="pointer"
                color={activeGrid === 'big' ? 'white' : '#73767D'}
                onClick={() => setActiveGrid('big')}
              />
            </Flex>
            <Flex justify="center" align="center" boxSize="71px">
              <GridSmallIcon
                boxSize="20px"
                cursor="pointer"
                color={activeGrid === 'small' ? 'white' : '#73767D'}
                onClick={() => setActiveGrid('small')}
              />
            </Flex>
          </Grid>
          <CustomSelect placeholder="Sort by" />
        </Flex>
        <Box mt="20px" h="1px" w="100%" bgColor="rgba(255,255,255,0.2)" />
        <Flex flexDir="column" gap="30px" maxH="300px" overflowY="scroll">
          <Flex flexDir="column" my="12px" gap="8px" fontFamily="Inter" fontSize="16px">
            {categories.map((category: any) => (
              <CategoryItem
                key={category.value}
                text={category.text}
                active={activeCategory === category.value}
                onClick={() => {
                  setActiveCategory(category.value);
                  navigate(`/marketplace?search=${search}&category=${category.value}&tags=${tag}`);
                }}
              />
            ))}
          </Flex>
        </Flex>
        <Flex flexDir="column">
          <Flex align="center" gap="11px" justify="space-between">
            <NumInput
              placeholder="min"
              value={minPrice}
              onChange={(e: any) => {
                setMinPrice(e.target.value);
              }}
              type="number"
            />
            <Text
              fontFamily="Inter"
              fontSize="12px"
              fontWeight="300"
              color="#73767D"
            >
              to
            </Text>
            <NumInput
              placeholder="max"
              value={maxPrice}
              onChange={(e: any) => {
                setMaxPrice(e.target.value);
              }}
              type="number"
            />
          </Flex>
        </Flex>
        <Button
          onClick={() => {
            const matchingPrices = filteredListings
              .map((listing: any) => listing.price)
              .filter((price: number) => {
                return price >= +minPrice && price <= +maxPrice;
              });
            console.log("filtered", filteredListings);
            console.log("prices", matchingPrices);
            setFilteredListings(
              filteredListings.filter((listing: any) => {
                return matchingPrices === listing.price;
              })
            );
            navigate(
              `/marketplace?search=${search}${
                cat !== null ? `&category=${cat}` : ""
              }${tag !== null ? `&tag=${tag}` : ""}${
                minPrice !== "" ? `&min=${minPrice}` : ""
              }${maxPrice !== "" ? `&max=${maxPrice}` : ""}`
            );
          }}
        >
          Apply
        </Button>
      </Flex>
    </Flex>
  );
};
