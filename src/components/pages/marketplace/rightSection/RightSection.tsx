import { Box, Button, Flex, Grid, Select, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categories } from '../../../../constants/categories';
import { GridBigIcon } from '../../../../icons/GridBigIcon';
import { GridSmallIcon } from '../../../../icons/GridSmallIcon';
import { CustomInput } from '../../../shared/CustomInput';
import { CustomSelect } from '../../../shared/CustomSelect';
import { CategoryItem } from './CategoryItem';
import { NumInput } from './NumInput';

interface IRightSectionProps {
  activeGrid: string;
  setActiveGrid: any;
}

export const RightSection: FC<IRightSectionProps> = ({ activeGrid, setActiveGrid }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [category, setCategory] = useSearchParams();
  const navigate = useNavigate();
  const tag = category.get('tag');
  const search = category.get('search') ?? '';

  useEffect(() => {
    if (category.get('category') !== null) {
      setActiveCategory(category.get('category')!);
      // const matchingNames = listings
      //   .map((listing: any) => listing.name)
      //   .filter((name: string) => {
      //     return name.includes(category.get("category") as string);
      //   });
      // setFilteredListings(
      //   listings.filter((listing: any) => matchingNames.includes(listing.name))
      // );
    } else {
      // console.log("No search");
      // setFilteredListings(listings);
    }
  }, [category]);

  return (
    <Flex flexDir="column" gap="30px">
      <Flex flexDir="column" pos="sticky" top="120px">
        <Flex justify="space-between" gap="9px">
          <Grid
            h="100%"
            border="1px solid rgba(255,255,255,0.2)"
            borderRadius="8px"
            bgColor="rgba(0, 0, 0, 0.25)"
            justifyContent="center"
            justifyItems="center"
            templateColumns="1fr 1fr"
            alignItems="center"
          >
            <Flex justify="center" borderRight="1px solid rgba(255,255,255,0.2)" align="center" boxSize="71px">
              <GridBigIcon
                boxSize="20px"
                cursor="pointer"
                color={activeGrid === 'big' ? 'white' : '#73767D'}
                onClick={() => setActiveGrid('big')}
              />
            </Flex>
            <Flex justify="center" align="center" boxSize="71px">
              <GridSmallIcon
                boxSize="20px"
                cursor="pointer"
                color={activeGrid === 'small' ? 'white' : '#73767D'}
                onClick={() => setActiveGrid('small')}
              />
            </Flex>
          </Grid>
          <CustomSelect placeholder="Sort by" />
        </Flex>
        <Box mt="20px" h="1px" w="100%" bgColor="rgba(255,255,255,0.2)" />
        <Flex flexDir="column" gap="30px" maxH="300px" overflowY="scroll">
          <Flex flexDir="column" my="12px" gap="8px" fontFamily="Inter" fontSize="16px">
            {categories.map((category: any) => (
              <CategoryItem
                key={category.value}
                text={category.text}
                active={activeCategory === category.value}
                onClick={() => {
                  setActiveCategory(category.value);
                  navigate(`/marketplace?search=${search}&category=${category.value}&tags=${tag}`);
                }}
              />
            ))}
          </Flex>
        </Flex>
        <Box h="1px" w="100%" bgColor="#262626" />
        <Flex mt="16px" flexDir="column" gap="12px">
          <Flex flexDir="column">
            <Grid templateColumns="1fr 20px 1fr" w="100%" alignItems="center" gap="11px">
              <CustomInput
                type="number"
                icon={
                  <Box fontWeight="800" opacity="0.5" fontSize="22px" lineHeight="100%" mb="2px">
                    $
                  </Box>
                }
                h="40px"
                
                placeholder="Min"
              />
              <Text fontFamily="Inter" fontSize="12px" fontWeight="300" color="#73767D">
                to
              </Text>
              <CustomInput
                type="number"
                icon={
                  <Box fontWeight="800" opacity="0.5" fontSize="22px" lineHeight="100%" mb="2px">
                    $
                  </Box>
                }
                h="40px"
                placeholder="Max"
              />
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
