import { Button, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { API_URL } from '../../../constants';
import { useUserContext } from '../../../provider/user/UserContext';
import { ListingStage } from './CurrentStage/currentStage';

export const FileUpload = ({ setLoading, setStage, loading, mintedTokenAddress }: { setLoading: (state: boolean) => void,mintedTokenAddress: string, loading : boolean, setStage: (stage: ListingStage) => void }) => {
  const { jwt } = useUserContext();
  const [files, setFiles] = useState(null);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const [filesAmount, setFilesAmount] = useState<number>(0)
  const handleChange = async (incomingFiles: any) => {
    setFiles(incomingFiles);
    if (incomingFiles !== null) {
      const formData = new FormData();
      Array.from(incomingFiles).forEach((file: any) => {
        formData.append('file', file);
      });

      setFormData(formData)

      setStage(ListingStage.UPLOAD_FILES)
    }
  };

  useEffect(() => {
    setFilesAmount(Array.from(formData.keys()).length)
  }, [formData])

  useEffect(() => {
    console.log(filesAmount)
  }, [filesAmount])
  

  const upload = async () => {
   
    axios.post(`${API_URL}/${mintedTokenAddress}/uploadFile`, formData, {
      headers: {
        'x-access-token': jwt,
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      
      setStage(ListingStage.FILL_LISTING_DATA)
    }).catch((error) => {
      console.log(error)
    })
  };

  return (
    <Flex flexDir="column">
      <FileUploader
        children={
          <Flex
            color="white"
            border="1px solid #262626"
            p="20px"
            cursor="pointer"
            bgColor="rgba(0, 0, 0, 0.25)"
            borderRadius="8px"
            _hover={{ bgColor: 'rgba(10, 10, 10, 0.25)' }}
            maxW="500px"
            maxH="300px"
            minW="500px"
            minH="300px"
            overflow="auto"
            align={files !== null ? 'flex-start' : 'center'}
            justify="center"
          >
            {files === null && <Text>Drop files here</Text>}
            {files !== null && (
              <Flex flexDir="column" w="100%" gap="4px">
                {Array.from(files as any).map((file: any) => (
                  <Flex
                    p="11px"
                    borderRadius="8px"
                    bgGradient="linear(180deg, #282939 0%, rgba(40, 41, 57, 0.51) 100%)"
                    w="100%"
                  >
                    {file.name}
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
      <Button mt="20px" isDisabled={filesAmount == 0} onClick={upload}>Upload files</Button>
    </Flex>
  );
};
