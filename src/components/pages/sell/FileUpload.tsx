import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { API_URL } from '../../../constants';
import { useUserContext } from '../../../provider/user/UserContext';
import { ListingStage } from './CurrentStage/currentStage';
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons';
export const FileUpload = ({
  setLoading,
  setStage,
  loading,
  mintedTokenAddress,
}: {
  setLoading: (state: boolean) => void;
  mintedTokenAddress: number;
  loading: boolean;
  setStage: (stage: ListingStage) => void;
}) => {
  const { jwt } = useUserContext();
  const [files, setFiles] = useState(null);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const [filesAmount, setFilesAmount] = useState<number>(0);
  const handleChange = async (incomingFiles: any) => {
    setFiles(incomingFiles);
    if (incomingFiles !== null) {
      const formData = new FormData();
      Array.from(incomingFiles).forEach((file: any) => {
        formData.append('file', file);
      });

      setFormData(formData);

      setStage(ListingStage.UPLOAD_FILES);
    }
  };

  useEffect(() => {
    setFilesAmount(Array.from(formData.keys()).length);
  }, [formData]);

  useEffect(() => {
    console.log(filesAmount);
  }, [filesAmount]);

  const upload = async () => {
    setLoading(true)
    axios
      .post(`${API_URL}/${mintedTokenAddress}/uploadFile`, formData, {
        headers: {
          'x-access-token': jwt,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setStage(ListingStage.LIST_ON_MARKETPLACE);
      })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        setLoading(false)
      })
  };

  return (
    <Flex flexDir="column" w="100%">
      <FileUploader
        children={
          <Flex
            color="white"
            border="1px solid #262626"
            opacity={loading ? "0.5" : "1"}
            p="20px"
            cursor={loading ? "defaut" :  "pointer"}
            bgColor="rgba(0, 0, 0, 0.25)"
            borderRadius="8px"
            _hover={{ bgColor: 'rgba(10, 10, 10, 0.25)' }}
            overflow="auto"
            align={files !== null ? 'flex-start' : 'center'}
            justify="center"
          >
            {files === null && <Text>Drop your files here</Text>}
            {files !== null && (
              <Flex flexDir="column" w="100%" gap="4px">
                {Array.from(files as any).map((file: any) => (
                  <Flex p="11px" borderRadius="8px" w="100%" justifyContent="space-between" gap="14px" align="center">
                    <Flex gap="14px" align="center">
                      {' '}
                      <LinkIcon />
                      {file.name}
                    </Flex>

                    <CheckCircleIcon boxSize="30px" bg="white" borderRadius="50%" justifySelf="flex-end" color={'brandPrimary'} />
                  </Flex>
                ))}
              </Flex>
            )}
          </Flex>
        }
        multiple={true}
        handleChange={handleChange}
        name="file"
        fileOrFiles={files}
      />
      <Button mt="20px" isDisabled={filesAmount == 0 || loading} onClick={upload}>
        {loading ? <Spinner/> : "Upload files"}
      </Button>
    </Flex>
  );
};
