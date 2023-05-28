import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../../../../icons/ArrowRightIcon";
import { useListingContext } from "../../../../provider/listings/ListingsContext";
import { PageContainer } from "../../../shared/containers/PageContainer";
import { FileItem } from "../../../shared/FileItem";
import { HeadingSmall } from "../../../shared/HeadingSmall";

export const NewestSection = () => {
  const { listings } = useListingContext();

  const reversedListings = Array.from(listings).reverse();
  console.log("listings", listings);
  console.log("reversed", reversedListings);

  return (
    <Flex flexDir="column" gap="30px" mt="20px" zIndex="1">
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
        {listings &&
          Array.from(listings)
            .reverse()
            .slice(0, 15)
            .map((item, index) => {
              return (
                <FileItem
                  key={item._id}
                  isSmall
                  type={item.type}
                  category="Games"
                  imageUrl={item.image}
                  name={item.name}
                  price={item.price}
                  size={item.size}
                  peers={213}
                  token={item.token}
                  address={item._id}
                  _id={item._id}
                />
              );
            })}
        <Flex minW="calc((100vw - 1200px) / 2 - 17px)" h="100px"></Flex>
      </Flex>
    </Flex>
  );
};
