import { Box, Flex, Grid, Image, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { FC, useState } from "react";
import { API_URL } from "../../constants";
import { BookmarkIcon } from "../../icons/BookmarkIcon";
import { CartIcon } from "../../icons/CartIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import { useCartContext } from "../../provider/cart/CartContext";
import { useUserContext } from "../../provider/user/UserContext";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { DownloadIcon } from "@chakra-ui/icons";
import { fileSizeFormatter } from "../../utils/fileSizeFormatter";

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
  address: string;
  type: string;
  _id: string;
}

export const FileItem: FC<IFileItem> = ({
  category,
  imageUrl,
  name,
  price,
  size,
  peers,
  isSmall,
  type,
  token,
  download,
  address,
  _id
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { jwt } = useUserContext();
  const { addItemToCart } = useCartContext();
  const handleDownload = async () => {
    setLoading(true);
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
      setLoading(false);
    };
    fr.readAsDataURL(blob);
  };

  return (
    <Flex
      bg="#282939"
      _hover={{ bg: "#2d2f3b" }}
      cursor="pointer"
      p={isSmall ? "0" : "0px"}
      borderRadius="8px"
      fontFamily="Inter"
      pos="relative"
      flexDir={isSmall ? "column" : "row"}
      gap="14px"
      role={"group"}
    >
      <Box
        bgPos="center"
        bgSize="cover"
        w={isSmall ? "100%" : "100px"}
        paddingBottom={isSmall ? "100%" : "100px"}
        bgImage={imageUrl}
        minW={isSmall ? "180px" : "100px"}
        maxW={isSmall ? "auto" : "268px"}
        maxH={isSmall ? "auto" : "100px"}
        borderTopRadius={isSmall ? "8px" : "0px"}
        borderLeftRadius={isSmall ? "0px" : "8px"}
        pos="relative"
      >
        <Flex
          justify="flex-start"
          align="center"
          display={isSmall ? "block" : "none"}
          padding="0px 16px"
          pos="absolute"
          w="100%"
          h="40%"
          paddingTop="40px"
          bg="linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.8) 100%)"
          bottom="0px"
        >
          <Flex gap="7px" align="center">
            <Box
              borderRadius="2px"
              paddingX="6px"
              fontSize="12px"
              fontWeight="500"
              bgColor="brandPrimary"
            >
              {type}
            </Box>
            <Box
              borderRadius="2px"
              paddingX="6px"
              fontSize="12px"
              fontWeight="500"
              bgColor="gray"
            >
              {fileSizeFormatter(size) ?? ""}
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Grid
        pos="relative"
        templateColumns="1fr auto"
        w={isSmall ? "auto" : "100%"}
        margin="16px"
        marginTop={isSmall ? "0px" : "16px"}
        gap="20px"
        alignItems={isSmall ? "initial" : "center"}
      >
        <Flex flexDir="column" pos="relative" w="100%" overflow="hidden">
          <Text
            maxW="100%"
            whiteSpace="nowrap"
            fontSize={isSmall ? "14px" : "20px"}
            fontWeight="500"
          >
            {name.length > 27 ? name.slice(0, 27) + "..." : name}
          </Text>
          <Text mt="0px" fontSize="16px" fontWeight="500" color="brandPrimary">
            {currencyFormatter(price)}
          </Text>
        </Flex>
        <Flex align={isSmall ? "none" : "center"} gap="10px">
          <Flex
            mr="10px"
            display={isSmall ? "none" : "flex"}
            gap="7px"
            align="center"
          >
            <Box
              borderRadius="2px"
              paddingX="6px"
              fontSize="12px"
              fontWeight="500"
              bgColor="brandPrimary"
            >
              {type}
            </Box>
            <Box
              borderRadius="2px"
              paddingX="6px"
              fontSize="12px"
              fontWeight="500"
              bgColor="gray"
            >
              {fileSizeFormatter(size) ?? ""}
            </Box>
          </Flex>

          <Flex
            right="0px"
            pos={isSmall ? "absolute" : "initial"}
            display={loading ? "block" : "block"}
            padding="10px"
            transform={isSmall ? "translate(10px,-10px)" : "none"}
          >
            <Flex
              alignItems="center"
              border="1px solid"
              boxSize="44px"
              borderColor={download ? "#2ecc71" : "brandPrimary"}
              bgColor={loading ? "brandPrimary" : "none"}
              opacity={loading ? "0.5" : "1"}
              cursor={loading ? "default" : "pointer"}
              justify="center"
              borderRadius="4px"
              _hover={{ bg: download ? "#2ecc71" : "brandPrimary" }}
              onClick={
                download
                  ? handleDownload
                  : () =>
                      addItemToCart({
                        amount: 1,
                        address: token,
                        imageUrl: imageUrl,
                        category: category,
                        name: name,
                        price: price,
                        size: size,
                        type: type,
                        _id: _id
                      })
              }
            >
              {download ? (
                loading ? (
                  <Spinner />
                ) : (
                  <DownloadIcon color="white" />
                )
              ) : (
                <Image
                  transform="translateX(-1px)"
                  src="/assets/icons/shopping-cart.svg"
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};
