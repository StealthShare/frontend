import {
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../../icons/SearchIcon";
import { useListingContext } from "../../../provider/listings/ListingsContext";
import { CustomInput } from "../../shared/CustomInput";
import { Heading } from "../../shared/Heading";

export const SearchSection = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const { listings } = useListingContext();
  const [filteredListings, setFilteredListings] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <Flex
      flexDir="column"
      gap="25px"
      mt="40px"
      zIndex="10"
      justify="flex-start"
    >
      <Heading text="Search for torrents" />
      <InputGroup zIndex="10" w="70%" mt="-5px" position="relative">
        <CustomInput
          placeholder="Search in StealthShare"
          value={inputValue}
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
      <Flex gap="24px" align="center">
        <Checkbox>All</Checkbox>
        <Checkbox>Apps</Checkbox>
        <Checkbox>Audios</Checkbox>
        <Checkbox>Games</Checkbox>
        <Checkbox>Videos</Checkbox>
        <Checkbox>Docs</Checkbox>
        <Checkbox>Mobile</Checkbox>
        <Checkbox>Porn</Checkbox>
      </Flex>
    </Flex>
  );
};
