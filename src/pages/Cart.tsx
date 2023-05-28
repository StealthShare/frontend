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
import { MARKET_ADDRESS, USDC_TOKEN_ADDRESS } from "../constants";
import { BookmarkIcon } from "../icons/BookmarkIcon";
import { useCartContext } from "../provider/cart/CartContext";
import { useUserContext } from "../provider/user/UserContext";
import { currencyFormatter } from "../utils/currencyFormatter";
<<<<<<< HEAD
import {ethers} from "ethers";
import { ERC20_ABI } from "../abi/erc20";
import { MARKET_ABI } from "../abi/market";
=======
import { fileSizeFormatter } from "../utils/fileSizeFormatter";
>>>>>>> a4c97c7419d0cb0d68aebd57576a12d49c95009e

export const Cart = () => {
  const {
    cartData,
    deleteItemByAddress,
    clearCart,
    price,
    addItemToCart,
    removeOneByAddress
  } = useCartContext();

<<<<<<< HEAD




  const buyTokens = async () => {
    if(cartData) {
      try {
        const tokens = cartData.map((token) => {return token.address }) 
        const amounts = cartData.map((token) => {return token.amount }) 
        const paymentToken = USDC_TOKEN_ADDRESS;
  
        const provider = new ethers.BrowserProvider((window as any).ethereum);
  
        const singer = await provider.getSigner();
  
        const paymentTokenContract = new ethers.Contract(paymentToken, ERC20_ABI , singer)
        
        
        const tx = await paymentTokenContract.approve(MARKET_ADDRESS, price);
        
        await tx.wait()

        const marketContract = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI , singer)

        const tx2 = await marketContract.buyToken(tokens, amounts, paymentToken)
        clearCart()
        alert("accepted")

        await tx2.wait()

   
  
        console.log(tokens)
        console.log(amounts)
      } catch(error) {

      }
     
=======
  const buyTokens = () => {
    if (cartData) {
      console.log(cartData);
      const tokens = cartData.map((token) => {
        return token.address;
      });

      console.log(tokens);
>>>>>>> a4c97c7419d0cb0d68aebd57576a12d49c95009e
    }
  };

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
                            {fileSizeFormatter(item.size)}
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

                  <Button onClick={buyTokens} fontSize="16px" px="40px">
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
