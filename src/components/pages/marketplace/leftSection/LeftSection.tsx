import {
  Button,
  Flex,
  Grid,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { SearchIcon } from "../../../../icons/SearchIcon";
import { useListingContext } from "../../../../provider/listings/ListingsContext";
import { CustomInput } from "../../../shared/CustomInput";
import { FileItem } from "../../../shared/FileItem";
import { SmallGridFile } from "../rightSection/SmallGridFile";

interface ILeftSectionProps {
  activeGrid: string;
  download?: boolean;
  placeholder: string;
  filteredListings: any;
  setFilteredListings: any;
}

export const LeftSection: FC<ILeftSectionProps> = ({
  activeGrid,
  download = false,
  placeholder,
  filteredListings,
  setFilteredListings
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { listings } = useListingContext();

  //const [search, setSearch] = useSearchParams();
  const [tags, setTags] = useLocalStorage<string>(
    "tags",
    localStorage.getItem("tags") !== null ? localStorage.getItem("tags")! : ""
  );
  const [category, setCategory] = useLocalStorage<string>(
    "category",
    localStorage.getItem("category") !== null
      ? localStorage.getItem("category")!
      : ""
  );
  const [search, setSearch] = useLocalStorage<string>(
    "search",
    localStorage.getItem("search") !== null
      ? localStorage.getItem("search")!
      : ""
  );
  const [min, setMin] = useLocalStorage<number>(
    "min",
    localStorage.getItem("min") !== null ? +localStorage.getItem("min")! : 0
  );
  const [max, setMax] = useLocalStorage<number>(
    "max",
    localStorage.getItem("max") !== null ? +localStorage.getItem("max")! : 30
  );

  useEffect(() => {
    if (listings) {
      setInputValue(search);

      const matchingNames = listings
        .map((listing: any) => listing.name)
        .filter((name: string) => {
          return name.includes(search);
        });
      setFilteredListings(
        listings.filter(
          (listing: any) =>
            matchingNames.includes(listing.name) &&
            min <= listing.price &&
            max >= listing.price
        )
      );
    }
  }, [min, max, search]);

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    setSearch(e.target.value);

    var pom = listings;
    const matchingNames = pom
      .map((listing: any) => listing.name)
      .filter((name: string) => {
        return name.includes(e.target.value);
      });

    setFilteredListings(
      pom.filter((listing: any) => {
        const priceCheck = min <= listing.price && max >= listing.price;
        const tagsCheck = listing?.tags?.includes(tags);
        return matchingNames.includes(listing.name) && priceCheck && tagsCheck;
      })
    );
  };

  useEffect(() => {
    if (search !== "") {
      setInputValue(search);
      const matchingNames = listings
        .map((listing: any) => listing.name)
        .filter((name: string) => {
          return name.includes(search);
        });
      setFilteredListings(
        listings.filter((listing: any) => matchingNames.includes(listing.name))
      );
    } else {
      setFilteredListings(listings);
    }
  }, [search]);

  return (
    <Flex flexDir="column" gap="30px">
      <Flex>
        <CustomInput
          borderRightRadius="0"
          placeholder={placeholder}
          value={inputValue}
          defaultValue={search}
          onChange={(e: any) => handleInputChange(e)}
          onKeyDown={(e: any) => {}}
        />
        <Button
          borderRightRadius="8px"
          borderLeftRadius="0"
          boxSize="69px"
          onClick={() => {}}
        >
          <SearchIcon />
        </Button>
      </Flex>
      <Grid
        gap="20px"
        flexWrap="wrap"
        templateColumns={
          (activeGrid as any) == "small" ? "1fr" : "repeat(4, 1fr)"
        }
      >
        {filteredListings.map((item: any, index: any) => {
          return (
            <FileItem
              key={item._id}
              isSmall={(activeGrid as any) == "big"}
              type={item.type}
              category="Games"
              imageUrl={item.image}
              name={item.name}
              price={item.price}
              size={item.size}
              peers={213}
              download={download}
              token={item.token}
              address={item._id}
              _id={item._id}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};
