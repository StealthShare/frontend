import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Heading } from '../../../shared/Heading';
import { HeadingSmall } from '../../../shared/HeadingSmall';

const items = [
  {
    header: <Box> Buy and sell files<Box display="inline" color="#E1BEFF
	">&nbsp;for crypto</Box> on StealthShare!</Box>,
    text: 'You can sell your own files or buy them from our marketplace as NFT tokens! Only holders of file token have access to file download.',
    image: '/assets/carousel/whitelabel.png',
  },
  {
    header:  <Box> Want to open your own <Box display="inline" color="#E1BEFF
	">StealthShare market</Box>?</Box>,
    text: 'Buy our StealthShareLicense NFT, host your marketplace website, connect to our protocol and earn money for selling files!',
    image: '/assets/carousel/buy.png',
  },
];

export const Carousel = () => {
  const [currentItem, setCurrentItem] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentItem(prev => (prev == items.length - 1 ? 0 : prev + 1));
    }, 5000); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Flex flexDir="column" gap="25px" mb="15px">
      <HeadingSmall text="StealthShare News" />
      <Flex overflow="hidden" h="400px" pos="relative" bg="rgba(255,255,255,0.1)" borderRadius="16px" w="100%">
        <Flex
          transition="0.2s"
          left={`-${1200 * currentItem}px`}
          pos="absolute"
          h="100%"
          width="200%"
          gridTemplateColumns="1fr 1fr 1fr"
        >
          {items.map(item => {
            return <Flex align="center" h="100%" w="100%" bgImage={item.image}>
				<Flex ml="70px" gap="25px" flexDir="column" maxW="520px">
					<Box fontSize="45px" fontWeight="400" lineHeight="38px" >{item.header}</Box>
					<Box fontFamily="Inter" fontSize="18px" lineHeight="140%">{item.text}</Box>
				</Flex>
			</Flex>;
          })}
        </Flex>
        <Flex pos="absolute" w="100%" bottom="40px" left="70px" zIndex="1">
          <Flex gap="20px" justifyContent="center">
            {items.map((item, index) => {
              return (
                <Flex
                  cursor="pointer"
                  onClick={() => {
                    setCurrentItem(index);
                  }}
                  borderRadius="50%"
                  boxSize="12px"
                  border="1px solid white"
                  bg={currentItem == index ? 'white' : 'none'}
                />
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
