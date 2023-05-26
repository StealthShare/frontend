import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HeadingSmall } from '../../../shared/HeadingSmall';

export const CartTooltip = () => {
  return (
    <Flex display="none"  w="auto" paddingY="50px" right='0' top="0px" _groupHover={{ display: 'block' }} pos="absolute" zIndex="1000">
      <Flex align="center" borderRadius='8px' padding="29px 33px" border="1px solid" borderColor='rgba(255, 255, 255, 0.17)' right='0' flexDir="column" bg="rgba(0, 0, 0, 0.3)">
        <HeadingSmall text="Your  cart is empty" />
        <Box fontSize="16px" color="white">Looking for inspiration?</Box>
        <Link to="/marketplace">
          <Button px="70px" mt="30px">
            Go to marketplace
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
