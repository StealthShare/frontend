import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../../constants/categories";
import { SearchIcon } from "../../../icons/SearchIcon";
import { useListingContext } from "../../../provider/listings/ListingsContext";
import { CustomInput } from "../../shared/CustomInput";
import { Heading } from "../../shared/Heading";

export const SearchSection = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [categorySelect, setCategorySelect] = useState<string>("");
  const [tagSelect, setTagSelect] = useState<string>("");

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
      position="relative"
      w="100%"
    >
      <Heading text="Search for torrents" />
      <Grid templateColumns={"1fr auto auto auto"} mt="-5px" w="100%">
        {/* <InputGroup zIndex="10" w="70%" position="relative"> */}
        <CustomInput
          w="auto"
          _focus={{
            border: "1px solid rgba(255, 255, 255, 0.17) !important",
            outline: "none !important"
          }}
          placeholder="Search in StealthShare"
          value={inputValue}
          onChange={(e: any) => handleInputChange(e)}
          onKeyDown={(e: any) => {
            console.log(e.key === "Enter");
            if (e.key === "Enter" && inputValue.length > 0)
              navigate(
                `/marketplace?search=${inputValue}${
                  categorySelect !== "" ? `&category=${categorySelect}` : ""
                }${tagSelect !== "" ? `&tag=${tagSelect}` : ""}`
              );
          }}
          borderRightRadius="0"
        />
        {/* <InputRightElement h="100%">
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
        </InputGroup> */}
        <Grid gridTemplateColumns="1fr 1fr" h="100%">
          <Select
            h="69px"
            placeholder="Select category"
            borderRadius="0"
            borderX="0"
            _focus={{
              borderY: "1px solid rgba(255, 255, 255, 0.17) !important",
              outline: "none !important"
            }}
            onChange={(e: any) => setCategorySelect(e.target.value)}
            value={categorySelect}
          >
            {categories.map((category: any) => (
              <option value={category.value}>{category.text}</option>
            ))}
          </Select>
          <Select
            h="69px"
            placeholder="Select tags"
            borderRadius="0"
 
            _focus={{
              border: "1px solid rgba(255, 255, 255, 0.17) !important",
              outline: "none !important"
            }}
            onChange={(e: any) => {
              setTagSelect(e.target.value);
            }}
            value={tagSelect}
          >
            {categories.map((category: any) => (
              <option value={category.value}>{category.text}</option>
            ))}
          </Select>
        </Grid>
        <Button
          borderRightRadius="8px"
          borderLeftRadius="0"
          boxSize="69px"
          onClick={() => {
            if (inputValue.length > 0)
              navigate(
                `/marketplace?search=${inputValue}${
                  categorySelect !== "" ? `&category=${categorySelect}` : ""
                }${tagSelect !== "" ? `&tag=${tagSelect}` : ""}`
              );
          }}
        >
          <SearchIcon />
        </Button>
      </Grid>
    </Flex>
  );
};
