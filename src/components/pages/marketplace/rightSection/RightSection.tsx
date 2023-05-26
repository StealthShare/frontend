import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { GridBigIcon } from "../../../../icons/GridBigIcon";
import { GridSmallIcon } from "../../../../icons/GridSmallIcon";
import { CustomInput } from "../../../shared/CustomInput";
import { CustomSelect } from "../../../shared/CustomSelect";
import { CategoryItem } from "./CategoryItem";
import { NumInput } from "./NumInput";

interface IRightSectionProps {
  activeGrid: string;
  setActiveGrid: any;
}

export const RightSection: FC<IRightSectionProps> = ({
  activeGrid,
  setActiveGrid
}) => {
  return (
    <Flex flexDir="column" gap="30px">
      <Flex justify="space-between" gap="9px">
        <Flex
          h="100%"
          p="20px"
          w="90px"
          border="1px solid #262626"
          borderRadius="8px"
          bgColor="rgba(0, 0, 0, 0.25)"
          justify="center"
          align="center"
          gap="20px"
        >
          <GridBigIcon
            cursor="pointer"
            color={activeGrid === "big" ? "white" : "#73767D"}
            onClick={() => setActiveGrid("big")}
          />
          <GridSmallIcon
            cursor="pointer"
            color={activeGrid === "small" ? "white" : "#73767D"}
            onClick={() => setActiveGrid("small")}
          />
        </Flex>
        <CustomSelect placeholder="Sort files" />
      </Flex>
      <Box h="1px" w="100%" bgColor="#262626" />
      <Flex flexDir="column" gap="30px">
        <Text fontSize="18px" fontWeight="700">
          Categories
        </Text>
        <Flex flexDir="column" gap="16px" fontFamily="Inter" fontSize="16px">
          <CategoryItem text="All" />
          <CategoryItem text="Apps" />
          <CategoryItem text="Audios" />
          <CategoryItem text="Games" />
          <CategoryItem text="Videos" />
          <CategoryItem text="Docs" />
          <CategoryItem text="Mobile" />
          <CategoryItem text="Porn" />
        </Flex>
      </Flex>
      <Box h="1px" w="100%" bgColor="#262626" />
      <Flex flexDir="column" gap="30px">
        <Flex align="center" justify="space-between">
          <Text fontSize="18px" fontWeight="700">
            Price
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Flex align="center" gap="11px" justify="space-between">
            <NumInput placeholder="min" />
            <Text
              fontFamily="Inter"
              fontSize="12px"
              fontWeight="300"
              color="#73767D"
            >
              to
            </Text>
            <NumInput placeholder="max" />
          </Flex>
        </Flex>
        <Button>Apply</Button>
      </Flex>
    </Flex>
  );
};
