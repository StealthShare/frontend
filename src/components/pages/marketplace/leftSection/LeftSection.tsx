import {
  Button,
  Flex,
  Grid,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import React, { FC } from "react";
import { SearchIcon } from "../../../../icons/SearchIcon";
import { CustomInput } from "../../../shared/CustomInput";
import { FileItem } from "../../../shared/FileItem";
import { SmallGridFile } from "../rightSection/SmallGridFile";

interface ILeftSectionProps {
  activeGrid: string;
}

export const LeftSection: FC<ILeftSectionProps> = ({ activeGrid }) => {
  return (
    <Flex flexDir="column" gap="30px">
      <InputGroup>
        <CustomInput placeholder="Search in StealthShare" />
        <InputRightElement h="100%">
          <Button mr="16px" borderRadius="50%" bg="rgba(186, 116, 248, 0.5)">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
      {activeGrid === "big" && (
        <Grid gap="20px" flexWrap="wrap" templateColumns="repeat(3, 1fr)">
          <FileItem
            isSmall
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <FileItem
            isSmall
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <FileItem
            isSmall
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <FileItem
            isSmall
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <FileItem
            isSmall
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <FileItem
            isSmall
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
        </Grid>
      )}
      {activeGrid === "small" && (
        <Flex flexDir="column" gap="4px">
          <SmallGridFile
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <SmallGridFile
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <SmallGridFile
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <SmallGridFile
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <SmallGridFile
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <SmallGridFile
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <SmallGridFile
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <SmallGridFile
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
          <SmallGridFile
            category="Games"
            imageUrl="https://www.picsum.photos/268/201"
            name="Za szybcy za wściekli 2024"
            price={21}
            size={1.2}
            peers={213}
          />
        </Flex>
      )}
    </Flex>
  );
};
