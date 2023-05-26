import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../../../../icons/ArrowRightIcon";
import { PageContainer } from "../../../shared/containers/PageContainer";
import { FileItem } from "../../../shared/FileItem";
import { HeadingSmall } from "../../../shared/HeadingSmall";

export const NewestSection = () => {
  return (
    <Flex flexDir="column" gap="30px" zIndex="1">
      <PageContainer>
        <Flex justify="space-between" align="center">
          <HeadingSmall text="Recent listings" />
          <Link to="/marketplace">
            <Flex fontSize="16px" fontFamily="Inter" color="white" gap="8px">
              <Text>Go to the marketplace</Text>
              <ArrowRightIcon />
            </Flex>
          </Link>
        </Flex>
      </PageContainer>
      <Flex
        gap="17px"
        overflowY="auto"
        maxW="100vw"
        overflow="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px"
          },
          "&::-webkit-scrollbar-track": {
            width: "6px"
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "24px"
          }
        }}
      >
        <Flex minW="calc((100vw - 1200px) / 2 - 17px)" h="100px"></Flex>
        <FileItem
          category="Games"
          imageUrl="https://www.picsum.photos/268/201"
          name="Za szybcy za wściekli 2024"
          price={21}
          size={1.2}
          peers={213}
        />
        <FileItem
          category="Games"
          imageUrl="https://www.picsum.photos/268/201"
          name="Za szybcy za wściekli 2024"
          price={21}
          size={1.2}
          peers={213}
        />
        <FileItem
          category="Games"
          imageUrl="https://www.picsum.photos/268/201"
          name="Za szybcy za wściekli 2024"
          price={21}
          size={1.2}
          peers={213}
        />
        <FileItem
          category="Games"
          imageUrl="https://www.picsum.photos/268/201"
          name="Za szybcy za wściekli 2024"
          price={21}
          size={1.2}
          peers={213}
        />
        <FileItem
          category="Games"
          imageUrl="https://www.picsum.photos/268/201"
          name="Za szybcy za wściekli 2024"
          price={21}
          size={1.2}
          peers={213}
        />
        <FileItem
          category="Games"
          imageUrl="https://www.picsum.photos/268/201"
          name="Za szybcy za wściekli 2024"
          price={21}
          size={1.2}
          peers={213}
        />
        <Flex minW="calc((100vw - 1200px) / 2 - 17px)" h="100px"></Flex>
      </Flex>
    </Flex>
  );
};
