import { Flex, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { BookmarkIcon } from "../../../../icons/BookmarkIcon";
import { EyeIcon } from "../../../../icons/EyeIcon";
import { currencyFormatter } from "../../../../utils/currencyFormatter";
import { IFileItem } from "../../../shared/FileItem";

export const SmallGridFile: FC<IFileItem> = ({
  category,
  imageUrl,
  name,
  price,
  size,
  peers
}) => {
  return (
    <Flex
      p="11px"
      borderRadius="12px"
      bgGradient="linear(180deg, #282939 0%, rgba(40, 41, 57, 0.51) 100%)"
      justify="space-between"
      fontFamily="Inter"
      w="100%"
      align="flex-start"
    >
      <Flex gap="19px">
        <Image
          src={imageUrl}
          minW="110px"
          minH="80px"
          maxW="110px"
          maxH="80px"
          borderRadius="8px"
        />
        <Flex flexDir="column" gap="9px">
          <Flex gap="7px" align="center">
            <BookmarkIcon />
            <Text fontSize="10px" fontWeight="600" color="textSecondary">
              {category}
            </Text>
          </Flex>
          <Text fontSize="16px" fontWeight="700">
            {name}
          </Text>
          <Text fontSize="14px" fontWeight="600" color="brandPrimary" mt="7px">
            {currencyFormatter(price)}
          </Text>
        </Flex>
      </Flex>
      <Flex align="center" gap="20px">
        <Flex gap="19px" align="center" fontSize="12px" color="textSecondary">
          <Text fontWeight="600">{size} GB</Text>
          <Flex fontWeight="600">
            <Text fontWeight="300">Peers:&nbsp;</Text>
            <Text>{peers}</Text>
          </Flex>
        </Flex>
        <EyeIcon />
      </Flex>
    </Flex>
  );
};
