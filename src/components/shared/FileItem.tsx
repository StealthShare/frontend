import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { FC } from "react";
import { API_URL } from "../../constants";
import { BookmarkIcon } from "../../icons/BookmarkIcon";
import { CartIcon } from "../../icons/CartIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import { useCartContext } from "../../provider/cart/CartContext";
import { useUserContext } from "../../provider/user/UserContext";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { DownloadIcon } from "@chakra-ui/icons";

export interface IFileItem {
  category: string;
  imageUrl: string;
  name: string;
  price: number;
  size: number;
  peers: number;
  isSmall?: boolean;
  token?: string;
  download?: boolean;
}

export const FileItem: FC<IFileItem> = ({
  category,
  imageUrl,
  name,
  price,
  size,
  peers,
  isSmall,
  token,
  download
}) => {
  const { jwt } = useUserContext();
  const { addItemToCart } = useCartContext();
  const handleDownload = async () => {
    const res2 = await axios.get(`${API_URL}/${token}/download`, {
      headers: {
        "x-access-token": jwt
      }
    });

    const blob = new Blob([res2.data.files], {
      type: "image/png;charset:utf-8"
    });
    const fr = new FileReader();
    fr.onload = () => {
      const linkSource = fr.result;
      const downloadLink = document.createElement("a");
      const fileName = res2.data.filename;
      downloadLink.href = `data:image/png;charset:utf-8;base64,${res2.data.files}`;
      downloadLink.download = fileName;
      downloadLink.click();
    };
    fr.readAsDataURL(blob);
  };

  return (
    <Flex
      bg="#282939"
      _hover={{ bg: "#2d2f3b" }}
      cursor="pointer"
      p={isSmall ? "0" : "22px 25px"}
      borderRadius="8px"
      fontFamily="Inter"
      pos="relative"
      flexDir="column"
      gap="14px"
      role={"group"}
    >
      <Box
        bgPos="center"
        bgSize="cover"
        w="100%"
        paddingBottom="100%"
        bgImage={imageUrl}
        minW={"220px"}
        maxW={isSmall ? "auto" : "268px"}
        maxH={isSmall ? "auto" : "200px"}
        borderRadius="8px"
        pos="relative"
      >
        <Flex
          justify="flex-end"
          align="center"
          padding="0px 16px"
          pos="absolute"
          w="100%"
          h="25%"
          paddingTop="20px"
          bg="linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%)"
          bottom="0px"
        >
          <Flex gap="7px" align="center">
            <Box
              borderRadius="2px"
              paddingX="6px"
              fontSize="10px"
              fontWeight="500"
              bgColor="brandPrimary"
            >
              {category}
            </Box>
            <Box
              borderRadius="2px"
              paddingX="6px"
              fontSize="10px"
              fontWeight="500"
              bgColor="gray"
            >
              {1.2}GB
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Grid
        pos="relative"
        templateColumns="1fr"
        margin="16px"
        marginTop="0px"
        gap="20px"
      >
        <Flex flexDir="column" pos="relative" w="100%" overflow="hidden">
          <Text
            maxW="100%"
            whiteSpace="nowrap"
            fontSize={isSmall ? "14px" : "16px"}
            fontWeight="700"
          >
            {name.length > 27 ? name.slice(0, 27) + "..." : name}
          </Text>
          <Text mt="0px" fontSize="16px" fontWeight="500" color="brandPrimary">
            {currencyFormatter(price)}
          </Text>
        </Flex>
        <Flex
          right="0px"
          pos="absolute"
          display="none"
          padding="10px"
          transform="translate(10px,-10px)"
          bg="#282939"
          _groupHover={{ display: "block", bg: "#2d2f3b" }}
        >
          <Flex
            alignItems="center"
            border="1px solid"
            boxSize="44px"
            borderColor="brandPrimary"
            justify="center"
            borderRadius="4px"
            _hover={{ bg: "brandPrimary" }}
            onClick={
              download
                ? handleDownload
                : () =>
                    addItemToCart({
                      amount: 1,
                      address: "0x000",
                      imageUrl: imageUrl,
                      category: category,
                      name: name,
                      price: price,
                      size: size
                    })
            }
          >
            {download ? (
              <DownloadIcon color="white" />
            ) : (
              <Image
                transform="translateX(-1px)"
                src="/assets/icons/shopping-cart.svg"
              />
            )}
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};
