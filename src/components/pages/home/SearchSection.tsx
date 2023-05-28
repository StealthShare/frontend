import { Button, Flex, Grid, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../../constants/categories";
import { FILE_TYPES, TAGS } from "../../../constants/tags";
import { SearchIcon } from "../../../icons/SearchIcon";
import { CustomInput } from "../../shared/CustomInput";
import { Heading } from "../../shared/Heading";

export const SearchSection = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [categorySelect, setCategorySelect] = useState<string>('');
  const [tagSelect, setTagSelect] = useState<string>('');

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTagSelect('');
    setTags((TAGS as any)[categorySelect] ?? []);
  }, [categorySelect]);

  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <Flex flexDir="column" gap="25px" mt="40px" zIndex="10" position="relative" w="100%">
      <Heading text="Search and buy files" />
      <Grid templateColumns={'1fr auto auto auto'} mt="-5px" w="100%">
        {/* <InputGroup zIndex="10" w="70%" position="relative"> */}
        <CustomInput
          w="auto"
          _focus={{
            border: '1px solid rgba(255, 255, 255, 0.17) !important',
            outline: 'none !important',
          }}
          placeholder="StealthShare search..."
          value={inputValue}
          onChange={(e: any) => handleInputChange(e)}
          onKeyDown={(e: any) => {
            console.log(e.key === 'Enter');
            if (e.key === 'Enter' && (inputValue.length > 0 || categorySelect != ""))
              navigate(
                `/marketplace?search=${inputValue}${categorySelect !== '' ? `&category=${categorySelect}` : ''}${
                  tagSelect !== '' ? `&tag=${tagSelect}` : ''
                }`
              );
          }}
          borderRightRadius="0"
        />

        <Grid gridTemplateColumns="auto auto" h="100%">
          <Select
            h="69px"
            placeholder="Type"
            borderRadius="0"
            borderX="0"
            _focus={{
              borderY: '1px solid rgba(255, 255, 255, 0.17) !important',
              outline: 'none !important',
            }}
            onChange={(e: any) => setCategorySelect(e.target.value)}
            value={categorySelect}
          >
            {FILE_TYPES.map((category: any) => (
              <option value={category}>{category}</option>
            ))}
          </Select>
          <Select
            h="69px"
            placeholder="Tag"
            borderRadius="0"
            isDisabled={tags.length == 0}
            textIndent="10px"
            _focus={{
              border: '1px solid rgba(255, 255, 255, 0.17) !important',
              outline: 'none !important',
            }}
            onChange={(e: any) => {
              setTagSelect(e.target.value);
            }}
            value={tagSelect}
          >
            {tags.map((tag: any) => (
              <option value={tag}>{tag}</option>
            ))}
          </Select>
        </Grid>
        <Button
          borderRightRadius="8px"
          borderLeftRadius="0"
          boxSize="69px"
          onClick={() => {
            localStorage.setItem("search", inputValue);
            navigate("/marketplace");
            // if (inputValue.length > 0)
            //   navigate(
            //     `/marketplace?search=${inputValue}${
            //       categorySelect !== "" ? `&category=${categorySelect}` : ""
            //     }${tagSelect !== "" ? `&tag=${tagSelect}` : ""}`
            //   );
          }}
        >
          <SearchIcon />
        </Button>
      </Grid>
    </Flex>
  );
};
