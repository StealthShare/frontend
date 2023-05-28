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
  placeholder: string
}

export const LeftSection: FC<ILeftSectionProps> = ({
  activeGrid,
  download = false,
  placeholder
}) => {
  const { listings } = useListingContext();
  const [inputValue, setInputValue] = useState<string>("");

  const [filteredListings, setFilteredListings] = useState<any[]>(listings);

  const [search, setSearch] = useSearchParams();

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    console.log(
      listings
        .map((listing: any) => listing.name)
        .filter((name: string) => {
          return name.includes(e.target.value);
        })
    );
    const matchingNames = listings
      .map((listing: any) => listing.name)
      .filter((name: string) => {
        return name.includes(e.target.value);
      });
    setFilteredListings(
      listings.filter((listing: any) => matchingNames.includes(listing.name))
    );
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
      console.log("No search");
      setFilteredListings(listings);
    }
  }, [search]);

  return (
    <Flex flexDir="column" gap="30px">
      <InputGroup>
        <CustomInput
          placeholder={placeholder}
          value={inputValue}
          defaultValue={search.get("search")}
          onChange={(e: any) => handleInputChange(e)}
          onKeyDown={(e: any) => {
            console.log(e.key === "Enter");
            if (e.key === "Enter" && inputValue.length > 0)
              navigate(`/marketplace?search=${inputValue}`);
          }}
        />
        <InputRightElement h="100%">
          <Button
            mr="16px"
            borderRadius="50%"
            bg="rgba(186, 116, 248, 0.5)"
            onClick={() => {
              if (inputValue.length > 0)
                navigate(`/marketplace?search=${inputValue}`);
            }}
          >
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
      {activeGrid === "big" && (
        <Grid gap="20px" flexWrap="wrap" templateColumns="repeat(3, 1fr)">
          {filteredListings.map((item, index) => {
            return (
              <FileItem
                key={item._id}
                isSmall
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
      )}
    </Flex>
  );
};
