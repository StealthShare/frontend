import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Text
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { categories } from "../../../../constants/categories";
import { GridBigIcon } from "../../../../icons/GridBigIcon";
import { GridSmallIcon } from "../../../../icons/GridSmallIcon";
import { useListingContext } from "../../../../provider/listings/ListingsContext";
import { CustomInput } from "../../../shared/CustomInput";
import { CustomSelect } from "../../../shared/CustomSelect";
import { CategoryItem } from "./CategoryItem";
import { NumInput } from "./NumInput";
import { FILE_TYPES, TAGS } from "../../../../constants/tags";
import { HeadingSmall } from "../../../shared/HeadingSmall";
import { currencyFormatter } from "../../../../utils/currencyFormatter";
import useLocalStorage from "use-local-storage";

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
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(10);
  const [activeTag, setActiveTag] = useState<string>("");
  const navigate = useNavigate();
  // const [minPrice, setMinPrice] = useState<number>(0);
  // const [maxPrice, setMaxPrice] = useState<number>(100);
  const { listings } = useListingContext();
  var maxValue = 0;

  const [tags, setTags] = useLocalStorage<string[]>("tags", []);
  const [category, setCategory] = useLocalStorage<string>("category", "");
  const [search, setSearch] = useLocalStorage<string>("search", "");
  const [min, setMin] = useLocalStorage<number>("min", 0);
  const [max, setMax] = useLocalStorage<number>("max", 100);

  listings.forEach((listing: any) => {
    if (listing.price > maxValue) maxValue = listing.price;
  });

  useEffect(() => {
    setFilteredListings(
      listings.filter((listing: any) => {
        return (
          //search.includes(listing.name) &&
          // listing.price >= min &&
          // listing.price <= min &&
          listing.name.includes(search) && listing?.tags?.includes([...tags])
        );
      })
    );
  }, []);

  const handleTagChange = (value: string) => {
    setActiveTag(value);
    setTags([value]);
    const temp = listings;
    const filteredByTag = temp.filter((listing: any) => {
      if (listing.tags) {
        return (
          // listing.price >= min &&
          // listing.price <= min &&
          listing.name.includes(search) && listing?.tags?.includes([value])
        );
      }
    });
    console.log(filteredByTag);
    setFilteredListings(filteredByTag);
  };

  const handlePriceChange = (e: any) => {
    const temp = listings;
    const filteredByPrice = temp.filter((listing: any) => {
      return (
        // listing.price >= e[0] &&
        // listing.price <= e[1] &&
        listing.name.includes(search)
        //listing?.tags?.includes(tags])
      );
    });

    setFilteredListings(filteredByPrice);
  };

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
        <Box mt="20px" h="1px" w="100%" bgColor="rgba(255,255,255,0.2)" />
        <Flex flexDir="column" gap="30px" maxH="300px" overflowY="scroll">
          <Flex
            flexDir="column"
            my="12px"
            gap="8px"
            fontFamily="Inter"
            fontSize="16px"
          >
            <Accordion p="0" mt="-15px">
              <AccordionItem border="none" mb="-6px" transitionDuration="0">
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    _hover={{ color: "brandPrimary" }}
                    color={activeCategory === "All" ? "brandPrimary" : ""}
                    onClick={() => {
                      setActiveCategory("All");
                      setCategory("All");
                    }}
                  >
                    All
                  </Box>
                </AccordionButton>
              </AccordionItem>
              {FILE_TYPES.map((category: any) => (
                <AccordionItem border="none" mb="-6px" transitionDuration="0">
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      _hover={{ color: "brandPrimary" }}
                      color={
                        localStorage.getItem("category") === category
                          ? "brandPrimary"
                          : ""
                      }
                      onClick={() => {
                        setActiveCategory(category);
                        setCategory(category);
                      }}
                    >
                      {category}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel
                    pb={4}
                    gap="8px"
                    display="flex"
                    flexDirection="column"
                    ml="10px"
                    mt="-7px"
                  >
                    <CategoryItem
                      key={"All"}
                      text={"All"}
                      active={tags.includes("All")}
                      onClick={() => {
                        handleTagChange("All");
                      }}
                    />
                    {(TAGS as any)[category].map((value: string) => (
                      <CategoryItem
                        key={value}
                        text={value}
                        active={tags.includes(value)}
                        onClick={() => {
                          handleTagChange(value);
                        }}
                      />
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Flex>
        </Flex>
        <Flex my="30px" flexDir="column" gap="8px">
          <HeadingSmall
            text={`Price: ${currencyFormatter(min)} - ${currencyFormatter(
              max
            )}`}
          />
          <RangeSlider
            aria-label={["min", "max"]}
            defaultValue={[min, max]}
            value={[min, max]}
            onChange={(e: any) => {
              setSliderMin(e[0]);
              setSliderMax(e[1]);
              setMin(e[0]);
              setMax(e[1]);
            }}
            onDragEnd={(e: any) => {
              handlePriceChange(e);
            }}
            max={maxValue}
            min={0}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack bgColor="brandPrimary" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Flex>
      </Flex>
    </Flex>
  );
};
