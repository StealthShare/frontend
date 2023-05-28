import {
  AddIcon,
  DeleteIcon,
  MinusIcon,
  PlusSquareIcon
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Spinner,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import React from "react";
import { EmptyCart } from "../components/pages/cart/EmptyCart/emptyCart";
import { NewestSection } from "../components/pages/home/newest/newestSection";
import { LineContainer } from "../components/shared/containers/LineContainer";
import { PageContainer } from "../components/shared/containers/PageContainer";
import { Heading } from "../components/shared/Heading";
import { MARKET_ADDRESS, USDC_TOKEN_ADDRESS, USDT_TOKEN_ADDRESS } from "../constants";
import { BookmarkIcon } from "../icons/BookmarkIcon";
import { useCartContext } from "../provider/cart/CartContext";
import { useUserContext } from "../provider/user/UserContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import { ethers } from "ethers";
import { ERC20_ABI } from "../abi/erc20";
import { MARKET_ABI } from "../abi/market";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { fileSizeFormatter } from "../utils/fileSizeFormatter";

export const Cart = () => {
  const {
    cartData,
    deleteItemByAddress,
    clearCart,
    price,
    addItemToCart,
    removeOneByAddress
  } = useCartContext();

  const [inventory, setInventory] = useLocalStorage<any>(
    "inventory",
    localStorage.getItem("inventory") !== null
      ? localStorage.getItem("inventory")
      : []
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState<boolean>(false);

  const buyTokens = async () => {
    if (cartData && !loading) {
      try {
        setLoading(true);
        const tokens = cartData.map((token) => {
          return token.address;
        });
        const amounts = cartData.map((token) => {
          return token.amount;
        });
        const paymentToken = USDT_TOKEN_ADDRESS;

        const provider = new ethers.BrowserProvider((window as any).ethereum);

        const singer = await provider.getSigner();

        const paymentTokenContract = new ethers.Contract(
          paymentToken,
          ERC20_ABI,
          singer
        );

        const tx = await paymentTokenContract.approve(MARKET_ADDRESS, price);

        await tx.wait();

        const marketContract = new ethers.Contract(
          MARKET_ADDRESS,
          MARKET_ABI,
          singer
        );

        const tx2 = await marketContract.buyToken(
          tokens,
          amounts,
          paymentToken
        );

        await tx2.wait();

        clearCart();
        onOpen();

        console.log(tokens);
        setInventory(
          JSON.stringify([...inventory, { token: tokens, amount: amounts }])
        );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <PageContainer>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="600px" borderRadius="16px">
            <ModalBody
              display="flex"
              flexDir="column"
              alignItems="center"
              bg="#161825"
              border="1px solid"
              borderColor="rgba(255,255,255,0.12)"
              borderRadius="16px"
              padding="40px"
              w="600px"
              gap="10px"
            >
              <Heading text="Payment successful" />
              <Box fontFamily="Inter">
                Files will arrive in your inventory soon
              </Box>
              <Grid mt="20px" templateColumns="1fr 1fr" gap="16px">
                <Button
                  border="1px solid"
                  borderColor="brandPrimary"
                  bg="none"
                  onClick={() => navigate("/marketplace")}
                >
                  Back to marketplace
                </Button>
                <Button onClick={() => navigate("/inventory")}>
                  Check your inventory
                </Button>
              </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>
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
                      key={item._id}
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
                            justify="center"
                            align="center"
                            borderRadius="2px"
                            paddingX="6px"
                            fontSize="12px"
                            fontWeight="500"
                            bgColor="brandPrimary"
                            fontFamily="Inter"
                          >
                            {item.type}
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
                              onClick={() =>
                                loading ? null : removeOneByAddress(item._id)
                              }
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
                              onClick={() =>
                                loading ? null : addItemToCart(item)
                              }
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
                            onClick={() =>
                              loading ? null : deleteItemByAddress(item._id)
                            }
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
                  <Flex justifyContent="space-between" align="flex-end">
                    <Box fontFamily="Inter">Total: </Box>
                    <Box fontWeight="bold" fontSize="40px" mb="-10px">
                      {currencyFormatter(price)}
                    </Box>
                  </Flex>

                  <Button
                    minW="300px"
                    h="50px"
                    isDisabled={loading}
                    onClick={buyTokens}
                    fontSize="16px"
                    px="40px"
                  >
                    {loading ? <Spinner /> : "Proceed to payment"}
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
