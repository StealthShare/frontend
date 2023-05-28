import { Box, Flex, Spinner } from '@chakra-ui/react';
import { Heading } from '../../../shared/Heading';
import { HeadingSmall } from '../../../shared/HeadingSmall';

export enum ListingStage {
  FILL_TOKEN_DATA,
  MINT_TOKEN,
  SELECT_FILES,
  UPLOAD_FILES,
  FILL_LISTING_DATA,
  LIST_ON_MARKETPLACE,
  FINISHED,
}

const Item = ({
  active,
  content,
  loading,
  last,
  number,
  completed,
}: {
  active: boolean;
  completed: boolean;
  number: number;
  content: string;
  loading: boolean;
  last?: boolean;
}) => (
  <Flex flexDir="column">
    <Flex align="center" gap="20px">
      <Flex
        align="center"
        justify="center"
        fontSize="20px"
        bg={completed ? 'brandPrimary' : 'none'}
        border="1px solid"
        borderColor={active ? 'brandPrimary' : 'rgba(255,255,255,0.2)'}
        borderRadius="50%"
        boxSize="41px"
      >
        <Box mb="2px" fontWeight="bold">
          {completed ? number : loading && active ? <Spinner borderWidth="2px" mt="9px" /> : number}
        </Box>
      </Flex>
      <Flex>{content}</Flex>
    </Flex>
    {!last && <Box ml="20px" h="50px" w="1px" bg={completed ? 'brandPrimary' : 'rgba(255,255,255,0.2)'} />}
  </Flex>
);

export const CurrentStage = ({ stage, loading }: { stage: ListingStage; loading: boolean }) => {
  return (
    <Flex gap="40px" flexDir="column">
      <Heading text="Upload status" />
      <Flex flexDir="column">
        <Item
          number={1}
          completed={stage > ListingStage.FILL_TOKEN_DATA}
          active={stage == ListingStage.FILL_TOKEN_DATA || stage == ListingStage.MINT_TOKEN}
          loading={loading}
          content={'Create FileToken'}
        />

        <Item
          number={2}
          completed={stage > ListingStage.SELECT_FILES}
          active={stage == ListingStage.SELECT_FILES || stage == ListingStage.UPLOAD_FILES}
          loading={loading}
          content={'Upload file'}
        />

        <Item
          number={3}
          completed={stage > ListingStage.LIST_ON_MARKETPLACE}
          active={stage == ListingStage.LIST_ON_MARKETPLACE}
          loading={loading}
          content={'List on marketplace'}
         last
        />
      
      </Flex>
    </Flex>
  );
};
