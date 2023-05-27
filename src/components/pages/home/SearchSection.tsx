import {
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import React from "react";
import { SearchIcon } from "../../../icons/SearchIcon";
import { CustomInput } from "../../shared/CustomInput";
import { Heading } from "../../shared/Heading";

export const SearchSection = () => {
  return (
    <Flex flexDir="column" gap="25px" mt="50px" zIndex="10" justify="flex-start">
      <Heading text="Search for torrents" />
      <InputGroup  zIndex="10"  w="70%">
        <CustomInput placeholder="Search in StealthShare" />
        <InputRightElement h="100%">
          <Button mr="16px" borderRadius="50%" bg="rgba(186, 116, 248, 0.5)">
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
