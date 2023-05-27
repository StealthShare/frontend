import {
  Button,
  Flex,
  Grid,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import React, { FC } from "react";
import { SearchIcon } from "../../../../icons/SearchIcon";
import { useListingContext } from "../../../../provider/listings/ListingsContext";
import { CustomInput } from "../../../shared/CustomInput";
import { FileItem } from "../../../shared/FileItem";
import { SmallGridFile } from "../rightSection/SmallGridFile";

interface ILeftSectionProps {
  activeGrid: string;
  download?: boolean;
}

export const LeftSection: FC<ILeftSectionProps> = ({
  activeGrid,
  download = false
}) => {
  const { listings } = useListingContext();

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
          {listings.map((item, index) => {
            return (
              <FileItem
                key={item._id}
                isSmall
                category="Games"
                imageUrl={item.image}
                name={item.name}
                price={item.price}
                size={1.2}
                peers={213}
                download={download}
                token={item.token}
                address={item._id}
                _id={item._id}
              />
            );
          })}
        </Grid>
      )}
    </Flex>
  );
};
