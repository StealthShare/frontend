import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Select,
  Spinner,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  CurrentStage,
  ListingStage
} from "../components/pages/sell/CurrentStage/currentStage";
import { FileUpload } from "../components/pages/sell/FileUpload";
import { PageContainer } from "../components/shared/containers/PageContainer";
import { Heading } from "../components/shared/Heading";
import { ethers } from "ethers";
import { MARKET_ABI } from "../abi/market";
import { ERC1155_ABI } from "../abi/erc1155";
import { FILE_TOKEN_BYTECODE } from "../constants/fileTokenBytecode";
import { FILETOKEN_ABI } from "../abi/file";
import { API_URL, MARKET_ADDRESS, MINTER_CONTRACT_ADDRESS } from "../constants";
import { CustomInput } from "../components/shared/CustomInput";
import { HeadingSmall } from "../components/shared/HeadingSmall";
import axios from "axios";
import { EditIcon, SmallCloseIcon, StarIcon } from "@chakra-ui/icons";
import { FileUploader } from "react-drag-drop-files";
import { FILE_TYPES, TAGS } from "../constants/tags";
import { Navigate, useNavigate } from "react-router-dom";

export const Sell = () => {
  const [stage, setStage] = useState<ListingStage>(
    ListingStage.FILL_TOKEN_DATA
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [tokenName, setTokenName] = useState<string>("");
  const [tokenDescription, setTokenDescription] = useState<string>("");
  const [tokenSupply, setTokenSupply] = useState<number>(1000);
  const [mintedTokenAddress, setMintedTokenAddress] = useState<number>(0);
  const [price, setPrice] = useState<number>(10);
  const [fileType, setFileType] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const [files, setFiles] = useState(null);

  const [formData, setFormData] = useState<FormData>(new FormData());

  const handleChange = async (incomingFiles: any) => {
    setFiles(incomingFiles);

    if (incomingFiles !== null) {
      const formData = new FormData();
      // Array.from(incomingFiles).forEach((file: any) => {
      //   formData.append("file", file);
      // });
      formData.append("file", incomingFiles[0]);

      setFormData(formData);
    }
  };

  const mintToken = async () => {
    if (!loading) {
      setLoading(true);
      try {
        if (formData) {
          const provider = new ethers.BrowserProvider((window as any).ethereum);

          const singer = await provider.getSigner();

          const factory = new ethers.Contract(
            MINTER_CONTRACT_ADDRESS,
            FILETOKEN_ABI,
            singer
          );

          formData.append("name", tokenName);
          formData.append("tags", JSON.stringify(tags));
          formData.append("type", fileType);
          formData.append("description", tokenDescription);

          const res = await axios.post(`${API_URL}/uploadToIPFS`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
          });

          const tx: any = await factory.mint(res.data, Number(tokenSupply));
          const rc = await tx.wait(2);

          const tx2: any = await factory.mint.staticCall("hi", tokenSupply);

          setMintedTokenAddress(Number(tx2) - 1);

          setStage(ListingStage.UPLOAD_FILES);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (
      tokenName.length > 0 &&
      tokenDescription.length > 0 &&
      tokenSupply > 0 &&
      price >= 0 &&
      fileType != "" &&
      tags.length > 0 &&
      Array.from(files as any).length > 0
    ) {
      setStage(ListingStage.MINT_TOKEN);
    } else {
      // setStage(ListingStage.FILL_TOKEN_DATA);
    }
  }, [tokenName, tokenDescription, tokenSupply, files, price, fileType, tags]);

  const listOnMarketplace = async () => {
    if (!loading) {
      try {
        setLoading(true);

        const provider = new ethers.BrowserProvider((window as any).ethereum);

        const signer = await provider.getSigner();

        const market = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, signer);

        const token = new ethers.Contract(
          MINTER_CONTRACT_ADDRESS,
          ERC1155_ABI,
          signer
        );

        const approval = await token.isApprovedForAll(
          await signer.getAddress(),
          MARKET_ADDRESS
        );
        if (approval == false) {
          const tx = await token.setApprovalForAll(MARKET_ADDRESS, true);
          await tx.wait(2);
        }

        const tx2 = await market.placeListing(
          mintedTokenAddress,
          price,
          tokenSupply
        );

        await tx2.wait(2);
        setStage(ListingStage.FINISHED);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <PageContainer>
      {stage == ListingStage.FINISHED ? (
        <Flex
          flexDir="column"
          justifyContent="center"
          align="center"
          minH="60vh"
        >
          <Heading text="Your file was listed succesfully" />
          <Box mt="10px" fontFamily="Inter">
            It will appear on marketplace in few minutes.
          </Box>
          <Button mt="20px" onClick={() => navigate("/marketplace")}>
            Go to marketplace
          </Button>
        </Flex>
      ) : (
        <Grid mt="40px" mb="60px" templateColumns="350px 1fr" gap="60px">
          <Flex
            paddingRight="20px"
            borderRight="1px solid"
            borderColor="rgba(255,255,255,0.2)"
            flexDir="column"
            mt="12px"
          >
            <CurrentStage stage={stage} loading={loading} />
          </Flex>
          <Flex mt="20px" h="100vh" flexDir="column" gap="40px">
            <HeadingSmall text="Sell files" />
            <Flex flexDir="column">
              {(stage == ListingStage.FILL_TOKEN_DATA ||
                stage == ListingStage.MINT_TOKEN) && (
                <Flex flexDir="column" gap="20px" fontSize="18px">
                  <Grid templateColumns="auto 1fr" gap="30px">
                    <Flex flexDir="column" gap="8px">
                      <Text>Listing image</Text>

                      <FileUploader
                        children={
                          <Flex
                            color="white"
                            border="1px solid rgba(255,255,255,0.2)"
                            cursor={loading ? "default" : "pointer"}
                            opacity={loading ? "0.5" : "1"}
                            bgColor="rgba(0, 0, 0, 0.25)"
                            borderRadius="8px"
                            _hover={{ bgColor: "rgba(10, 10, 10, 0.25)" }}
                            boxSize="160px"
                            overflow="auto"
                            align={files !== null ? "flex-start" : "center"}
                            justify="center"
                            pos="relative"
                          >
                            {files === null && <Text>Drop image here</Text>}
                            {files !== null && (
                              <Flex
                                pos="relative"
                                flexDir="column"
                                h="100%"
                                w="100%"
                                gap="4px"
                              >
                                {Array.from(files as any).map((file: any) => {
                                  return (
                                    <Flex
                                      borderRadius="8px"
                                      bgGradient="linear(180deg, #282939 0%, rgba(40, 41, 57, 0.51) 100%)"
                                      w="100%"
                                      h="100%"
                                      bgSize="cover"
                                      bgPos="center"
                                      bgImage={URL.createObjectURL(file)}
                                    ></Flex>
                                  );
                                })}
                              </Flex>
                            )}
                          </Flex>
                        }
                        multiple={true}
                        handleChange={handleChange}
                        name="file"
                        fileOrFiles={files}
                      />
                    </Flex>
                    <Flex flexDir="column" gap="23px">
                      <Flex flexDir="column" gap="8px">
                        <Text>Name</Text>
                        <CustomInput
                          p="13px 16px"
                          icon={
                            <Box
                              fontWeight="800"
                              opacity="0.5"
                              lineHeight="100%"
                              mb="3px"
                            >
                              <StarIcon boxSize="16px" />
                            </Box>
                          }
                          placeholder="Type in name of your listing"
                          disabled={loading}
                          value={tokenName}
                          onChange={(e: any) => setTokenName(e.target.value)}
                        />
                      </Flex>
                      <Flex flexDir="column" gap="8px">
                        <Text>Description</Text>
                        <CustomInput
                          p="13px 16px"
                          icon={
                            <Box
                              fontWeight="800"
                              opacity="0.5"
                              lineHeight="100%"
                              mb="4px"
                            >
                              <EditIcon boxSize="16px" />
                            </Box>
                          }
                          placeholder="Write something about the file"
                          disabled={loading}
                          value={tokenDescription}
                          onChange={(e: any) =>
                            setTokenDescription(e.target.value)
                          }
                        />
                      </Flex>
                    </Flex>
                  </Grid>

                  <Grid templateColumns="1fr 1fr" gap="30px">
                    <Flex flexDir="column" gap="8px">
                      <Text>Max copies to sell</Text>
                      <CustomInput
                        p="13px 16px"
                        icon={
                          <Box
                            fontWeight="800"
                            opacity="0.5"
                            fontSize="22px"
                            lineHeight="100%"
                            mb="3px"
                          >
                            <SmallCloseIcon />
                          </Box>
                        }
                        disabled={loading}
                        value={tokenSupply}
                        type="number"
                        onChange={(e: any) =>
                          setTokenSupply(Number(e.target.value))
                        }
                      />
                    </Flex>
                    <Flex flexDir="column" gap="8px">
                      <Text>Price per unit</Text>
                      <CustomInput
                        icon={
                          <Box
                            fontWeight="800"
                            opacity="0.5"
                            fontSize="22px"
                            lineHeight="100%"
                            mb="2px"
                          >
                            $
                          </Box>
                        }
                        p="13px 16px"
                        disabled={loading}
                        value={price}
                        type="number"
                        onChange={(e: any) => setPrice(Number(e.target.value))}
                      />
                    </Flex>
                  </Grid>
                  <Flex flexDir="column" gap="8px">
                    <Text>File type</Text>
                    <Select
                      disabled={loading}
                      h="52px"
                      onChange={(e) => {
                        setTags([]);
                        setFileType(e.target.value);
                      }}
                      placeholder="Type"
                    >
                      {FILE_TYPES.map((t: any) => {
                        return <option value={t}>{t}</option>;
                      })}
                    </Select>
                  </Flex>
                  <Flex flexDir="column" gap="8px">
                    <Text>Select Tags</Text>
                    <Flex>
                      {fileType ? (
                        <Flex gap="8px">
                          {(TAGS as any)[fileType].map((tag: string) => {
                            return (
                              <Box
                                padding="2px 7px"
                                cursor={loading ? "default" : "pointer"}
                                opacity={loading ? "0.5" : "1"}
                                borderRadius="4px"
                                onClick={() => {
                                  tags.includes(tag)
                                    ? setTags(
                                        tags.filter((item) => item !== tag)
                                      )
                                    : setTags(tags.concat([tag]));
                                }}
                                fontFamily="Inter"
                                fontSize="14px"
                                border="1px solid"
                                borderColor="brandPrimary"
                                bg={
                                  tags.includes(tag) ? "brandPrimary" : "none"
                                }
                              >
                                {tag}
                              </Box>
                            );
                          })}
                        </Flex>
                      ) : (
                        <Box fontSize="14px" fontFamily="Inter" opacity="0.5">
                          Select file type first
                        </Box>
                      )}
                    </Flex>
                  </Flex>
                  <Button
                    h="60px"
                    mt="20px"
                    isDisabled={
                      stage == ListingStage.FILL_TOKEN_DATA || loading == true
                    }
                    onClick={mintToken}
                  >
                    {loading ? <Spinner /> : "Mint token"}
                  </Button>
                </Flex>
              )}
              {(stage == ListingStage.SELECT_FILES ||
                stage == ListingStage.UPLOAD_FILES) && (
                <Flex>
                  <FileUpload
                    setLoading={setLoading}
                    mintedTokenAddress={mintedTokenAddress}
                    setStage={setStage}
                    loading={loading}
                  />
                </Flex>
              )}
              {(stage == ListingStage.FILL_LISTING_DATA ||
                stage == ListingStage.LIST_ON_MARKETPLACE) && (
                <Flex>
                  <Button isDisabled={loading} onClick={listOnMarketplace}>
                    Set for sale
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Grid>
      )}
    </PageContainer>
  );
};
