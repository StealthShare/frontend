import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { BookmarkIcon } from "../../icons/BookmarkIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import { currencyFormatter } from "../../utils/currencyFormatter";

export interface IFileItem {
  category: string;
  imageUrl: string;
  name: string;
  price: number;
  size: number;
  peers: number;
  isSmall?: boolean;
}

export const FileItem: FC<IFileItem> = ({
  category,
  imageUrl,
  name,
  price,
  size,
  peers,
  isSmall
}) => {
  return (
    <Flex
      bgGradient="linear(180deg, #282939 0%, rgba(40, 41, 57, 0.51) 100%)"
      p={isSmall ? "13px 11px" : "17px 15px"}
      borderRadius="17px"
      fontFamily="Inter"
      flexDir="column"
      gap="12px"
    >
      <Flex gap="7px" align="center">
        <BookmarkIcon />
        <Text fontSize="10px" fontWeight="500" color="textSecondary">
          {category}
        </Text>
      </Flex>
      <Image
        src={imageUrl}
        minW={isSmall ? "200px" : "268px"}
        minH={isSmall ? "150px" : "200px"}
        maxW={isSmall ? "200px" : "268px"}
        maxH={isSmall ? "150px" : "200px"}
        borderRadius="8px"
      />
      <Text fontSize={isSmall ? "14px" : "16px"} fontWeight="700">
        {name.length > 27 ? name.slice(0, 27) + "..." : name}
      </Text>
      <Text mt="5px" fontSize="14px" fontWeight="600" color="brandPrimary">
        {currencyFormatter(price)}
      </Text>
      <Box my="5px" h="1px" w="100%" bgColor="#383A56" />
      <Flex justify="space-between" align="center">
        <EyeIcon />
        <Flex gap="19px" align="center" fontSize="12px" color="textSecondary">
          <Text fontWeight="600">{size} GB</Text>
          <Flex fontWeight="600">
            <Text fontWeight="300">Peers:&nbsp;</Text>
            <Text>{peers}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
