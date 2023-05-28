import {
  Button,
  Flex,
  Grid,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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

  const [search, setSearch] = useSearchParams();

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    if (listings) {
      setInputValue(e.target.value);

      const matchingNames = listings
        .map((listing: any) => listing.name)
        .filter((name: string) => {
          return name.includes(e.target.value);
        });
      setFilteredListings(
        listings.filter((listing: any) => matchingNames.includes(listing.name))
      );
    }
  };

  useEffect(() => {
    if (search.get("search") !== null) {
      setInputValue(search.get("search")!);
      const matchingNames = listings
        .map((listing: any) => listing.name)
        .filter((name: string) => {
          return name.includes(search.get("search") as string);
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
      {/* <InputGroup> */}
      <Flex>
        <CustomInput
          borderRightRadius="0"
          placeholder={placeholder}
          value={inputValue}
          defaultValue={search.get("search")}
          onChange={(e: any) => handleInputChange(e)}
          onKeyDown={(e: any) => {
            if (e.key === "Enter" && inputValue.length > 0)
              navigate(
                `/${
                  download ? "inventory" : "marketplace"
                }?search=${inputValue}`
              );
          }}
        />
        <Button
          borderRightRadius="8px"
          borderLeftRadius="0"
          boxSize="69px"
          onClick={() => {
            if (inputValue.length > 0)
              navigate(
                `/${
                  download ? "inventory" : "marketplace"
                }?search=${inputValue}`
              );
          }}
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
