import { Box, Button, Flex, Grid, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { CurrentStage, ListingStage } from '../components/pages/sell/CurrentStage/currentStage';
import { FileUpload } from '../components/pages/sell/FileUpload';
import { PageContainer } from '../components/shared/containers/PageContainer';
import { Heading } from '../components/shared/Heading';
import { ethers } from 'ethers';
import { MARKET_ABI } from '../abi/market';
import { ERC1155_ABI } from '../abi/erc1155';
import { FILE_TOKEN_BYTECODE } from '../constants/fileTokenBytecode';
import { FILETOKEN_ABI } from '../abi/file';
import { MARKET_ADDRESS, MINTER_CONTRACT_ADDRESS } from '../constants';
import { CustomInput } from '../components/shared/CustomInput';

export const Sell = () => {
  const [stage, setStage] = useState<ListingStage>(ListingStage.FILL_TOKEN_DATA);
  const [loading, setLoading] = useState<boolean>(false);

  const [tokenName, setTokenName] = useState<string>('');
  const [tokenDescription, setTokenDescription] = useState<string>('');
  const [tokenSupply, setTokenSupply] = useState<number>(1000);
  const [mintedTokenAddress, setMintedTokenAddress] = useState<number>(0);
  const [price, setPrice] = useState<number>(10);

  const mintToken = async () => {
    if (!loading) {
      setLoading(true);
      try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);

        const singer = await provider.getSigner();

        const factory = new ethers.Contract(MINTER_CONTRACT_ADDRESS, FILETOKEN_ABI, singer);





        const tx: any = await factory.mint('hi', tokenSupply)
        const rc = await tx.wait(2)

        const tx2: any = await factory.mint.staticCall('hi', tokenSupply)



        setMintedTokenAddress(Number(tx2) - 1)


        console.log(rc)



        setStage(ListingStage.UPLOAD_FILES);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (tokenName.length > 5 && tokenDescription.length > 10 && tokenSupply > 0) {
      setStage(ListingStage.MINT_TOKEN);
    } else {
      // setStage(ListingStage.FILL_TOKEN_DATA);
    }
  }, [tokenName, tokenDescription, tokenSupply]);

  const uploadFiles = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStage(ListingStage.FILL_LISTING_DATA);
      }, 2000);
    }
  };

  const listOnMarketplace = async () => {
    if (!loading) {
      setLoading(true);

      const provider = new ethers.BrowserProvider((window as any).ethereum);

      const signer = await provider.getSigner();

      const market = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, signer);

      const token = new ethers.Contract(MINTER_CONTRACT_ADDRESS, ERC1155_ABI, signer);

      const tx = await token.setApprovalForAll(MARKET_ADDRESS, true);

      await tx.wait(2);

      const tx2 = await market.placeListing(mintedTokenAddress, price, tokenSupply);

      await tx2.wait(2);
      setStage(ListingStage.FINISHED);
    }
  };

  return (
    <PageContainer>
      <Grid mt="40px" mb="60px" templateColumns="400px 1fr" gap="80px">
        <Flex
          paddingLeft="50px"
          borderRight="1px solid"
          borderColor="rgba(255,255,255,0.2)"
          flexDir="column"
          mt="12px"
        >
          <CurrentStage stage={stage} loading={loading} />
        </Flex>
        <Flex h="100vh" flexDir="column" gap="40px">
          <Heading text="Sell files" />
          <Flex flexDir="column">
            {(stage == ListingStage.FILL_TOKEN_DATA || stage == ListingStage.MINT_TOKEN) && (
              <Flex flexDir="column" gap="20px" fontSize="18px">
                <Flex flexDir="column" gap="8px">
                  <Text>Name</Text>
                  <CustomInput
                    p="13px 16px"
                    placeholder="Token name"
                    disabled={loading}
                    value={tokenName}
                    onChange={(e: any) => setTokenName(e.target.value)}
                  />
                </Flex>

                <Flex flexDir="column" gap="8px">
                  <Text>Description</Text>
                  <CustomInput
                    p="13px 16px"
                    placeholder="Token description"
                    disabled={loading}
                    value={tokenDescription}
                    onChange={(e: any) => setTokenDescription(e.target.value)}
                  />
                </Flex>

                <Flex flexDir="column" gap="8px">
                  <Text>Supply</Text>
                  <CustomInput
                    p="13px 16px"
                    disabled={loading}
                    value={tokenSupply}
                    type="number"
                    onChange={(e: any) => setTokenSupply(Number(e.target.value))}
                  />
                </Flex>

                <Button mt="20px" isDisabled={stage == ListingStage.FILL_TOKEN_DATA} onClick={mintToken}>
                  Mint token
                </Button>
              </Flex>
            )}
            {(stage == ListingStage.SELECT_FILES || stage == ListingStage.UPLOAD_FILES) && (
              <Flex>
                <FileUpload
                  setLoading={setLoading}
                  mintedTokenAddress={mintedTokenAddress}
                  setStage={setStage}
                  loading={loading}
                />
              </Flex>
            )}
            {(stage == ListingStage.FILL_LISTING_DATA || stage == ListingStage.LIST_ON_MARKETPLACE) && (
              <Flex>
                <Button onClick={listOnMarketplace}>Set for sale</Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Grid>
    </PageContainer>
  );
};
