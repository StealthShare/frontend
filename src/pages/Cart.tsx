import {
  AddIcon,
  DeleteIcon,
  MinusIcon,
  PlusSquareIcon
} from "@chakra-ui/icons";
import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import { EmptyCart } from "../components/pages/cart/EmptyCart/emptyCart";
import { NewestSection } from "../components/pages/home/newest/newestSection";
import { LineContainer } from "../components/shared/containers/LineContainer";
import { PageContainer } from "../components/shared/containers/PageContainer";
import { Heading } from "../components/shared/Heading";
import { BookmarkIcon } from "../icons/BookmarkIcon";
import { useCartContext } from "../provider/cart/CartContext";
import { useUserContext } from "../provider/user/UserContext";
import { currencyFormatter } from "../utils/currencyFormatter";

export const Cart = () => {
  const {
    cartData,
    deleteItemByAddress,
    clearCart,
    price,
    addItemToCart,
    removeOneByAddress
  } = useCartContext();

  return (
    <>
      <PageContainer>
        <Flex mt="40px">
          <Heading text={"Your shopping cart"} />
        </Flex>
        <>
          {cartData !== null ? (
            <Flex mt="40px" flexDir="column" gap="20px">
              <Flex justifyContent="space-between">
                <Flex fontFamily="Inter" gap="20px">
                  <Box fontSize="16px">
                    Items in cart:{" "}
                    <Box display="inline" fontWeight="bold">
                      {cartData?.length}
                    </Box>
                  </Box>
                  <Box
                    onClick={clearCart}
                    cursor="pointer"
                    color="brandPrimary"
                    textDecor="underline"
                  >
                    Clear cart
                  </Box>
                </Flex>
              </Flex>
              <Flex
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.2)"
                bg="rgba(255, 255, 255, 0.12)"
                flexDir="column"
                borderRadius="8px"
              >
                {cartData.map((item, index) => {
                  return (
                    <Grid
                      templateColumns="auto 1fr"
                      gap="20px"
                      borderBottom={
                        index == cartData.length - 1 ? "none" : "1px solid"
                      }
                      borderColor="rgba(255, 255, 255, 0.2)"
                      padding="32px 33px 40px 33px"
                    >
                      <Box
                        w="80px"
                        h="80px"
                        borderRadius="4px"
                        bgImage={item.imageUrl}
                        bgPos="center"
                        bgSize="cover"
                      />
                      <Flex justifyContent="space-between">
                        <Flex flexDir="column" gap="4px" justify="center">
                          <Flex
                            align="center"
                            textTransform="uppercase"
                            fontSize="12px"
                            fontFamily="Inter"
                            color="rgba(148, 150, 175, 1)"
                            gap="10px"
                          >
                            <BookmarkIcon /> {item.category}
                          </Flex>
                          <Box fontFamily="Inter" fontSize="18px">
                            {item.name}
                          </Box>
                          <Flex
                            align="center"
                            textTransform="uppercase"
                            fontSize="12px"
                            fontFamily="Inter"
                            color="rgba(148, 150, 175, 1)"
                            gap="10px"
                          >
                            <Image src="/assets/icons/hard-drive.svg" />{" "}
                            {item.size + " GB"}
                          </Flex>
                        </Flex>
                        <Flex align="center" gap="50px">
                          <Flex align="center" gap="15px">
                            <Flex
                              align="center"
                              justify="center"
                              cursor="pointer"
                              boxSize="40px"
                              borderRadius="50%"
                              _hover={{ bg: "rgba(255,255,255,0.2)" }}
                              onClick={() => removeOneByAddress(item._id)}
                            >
                              <MinusIcon />
                            </Flex>
                            <Text>{item.amount}</Text>
                            <Flex
                              align="center"
                              justify="center"
                              cursor="pointer"
                              boxSize="40px"
                              borderRadius="50%"
                              _hover={{ bg: "rgba(255,255,255,0.2)" }}
                              onClick={() => addItemToCart(item)}
                            >
                              <AddIcon />
                            </Flex>
                          </Flex>
                          <Flex
                            align="center"
                            justify="center"
                            cursor="pointer"
                            boxSize="40px"
                            borderRadius="50%"
                            _hover={{ bg: "rgba(255,255,255,0.2)" }}
                            onClick={() => deleteItemByAddress(item._id)}
                          >
                            <Image src="/assets/icons/trashcan.svg" />
                          </Flex>
                          <Flex align="center" gap="10px">
                            <Box
                              bg="rgba(255, 255, 255, 0.17)"
                              border="1px solid"
                              borderRadius="4px"
                              padding="2px 4px"
                              borderColor="rgba(255, 255, 255, 0.2)"
                            >
                              $
                            </Box>
                            <Box fontFamily="Inter">
                              {currencyFormatter(item.price).slice(1)}
                            </Box>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Grid>
                  );
                })}
              </Flex>
              <Flex mt="40px" mb="100px" justifyContent="flex-end">
                <Flex gap="30px" flexDir="column">
                  <Flex justifyContent="space-between">
                    <Box fontFamily="Inter">Total: </Box>
                    <Box fontWeight="bold" fontSize="20px">
                      {currencyFormatter(price)}
                    </Box>
                  </Flex>

                  <Button fontSize="16px" px="40px">
                    Proceed to payment
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <EmptyCart />
          )}
        </>
      </PageContainer>
      <LineContainer>
        <NewestSection />
      </LineContainer>
    </>
  );
};
