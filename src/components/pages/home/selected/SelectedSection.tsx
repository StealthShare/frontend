import { Flex } from "@chakra-ui/react";
import React from "react";
import { FileItem } from "../../../shared/FileItem";
import { HeadingSmall } from "../../../shared/HeadingSmall";

export const SelectedSection = () => {
  return (
    <Flex flexDir="column" gap="30px" mr="-10vw">
      <HeadingSmall text="Selected for you" />
      <Flex
        gap="17px"
        overflowY="auto"
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
      </Flex>
    </Flex>
  );
};
