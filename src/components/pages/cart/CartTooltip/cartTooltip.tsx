import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../../../provider/cart/CartContext";
import { currencyFormatter } from "../../../../utils/currencyFormatter";
import { HeadingSmall } from "../../../shared/HeadingSmall";

export const CartTooltip = () => {
  const { cartData, price, deleteItemByAddress } = useCartContext();

  return (
    <Flex
      display="none"
      w="auto"
      paddingY="50px"
      right="0"
      top="0px"
      _groupHover={{ display: "block" }}
      pos="absolute"
      zIndex="1000"
      opacity="1"
    >
      <Flex
        align="center"
        borderRadius="8px"
        padding="29px 33px"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.17)"
        right="0"
        flexDir="column"
        bg="backgroundMain"
        maxH="25vh"
        minW="25vw"
        overflow="auto"
      >
        {cartData === null ? (
          <>
            <HeadingSmall text="Your cart is empty" />
            <Box fontSize="16px" color="white">
              Looking for inspiration?
            </Box>
            <Link to="/marketplace">
              <Button px="70px" mt="30px">
                Go to marketplace
              </Button>
            </Link>
          </>
        ) : (
          <>
            
            <Flex flexDir="column" gap="4px" w="100%"  fontFamily="Inter">
              {cartData.map((item: any, index: number) => (
                <Flex
                  key={item.address}
                  borderBottom={
                    index == cartData.length - 1 ? "none" : "1px solid"
                  }
                  //bgColor="rgba(255, 255, 255, 0.12)"
                  borderColor="rgba(255, 255, 255, 0.2)"
                  padding="16px "
                  borderRadius="0px"
                  w="100%"
                  color="white"
                  gap="8px"
                  align="center"
                  justify="space-between"
                >
                  <Flex align="center" gap="14px">
                  <Image src={item.imageUrl} borderRadius="8px" w="20%"/>
                  <Flex flexDir="column" gap="4px">
                    <Text fontWeight="700">{item.name}</Text>
                    <Text fontSize="12px">{currencyFormatter(item.price * item.amount)}</Text>
                    </Flex>
                    </Flex>
                  <Text>x{item.amount}</Text>
                </Flex>
              ))}
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};
