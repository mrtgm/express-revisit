import { Heading, Box, Text, VStack, Divider } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { useApi } from '~/context/api';
import { CommentForm } from '~/features/article/components/comment_form';
import { Layout } from '~/features/article/layout/layout';

const Article: NextPageWithLayout = () => {
  const router = useRouter();
  const api = useApi();

  const { id } = router.query;

  const { data, isLoading, error } = useQuery([`post: ${id}`], () => api.getArticle(id as string));

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <VStack align="start" borderWidth="1px" borderRadius="sm" p="10">
      <Box>
        <Heading>{data.title}</Heading>
        <Text mt="2" as="p">
          {data.author} / {data.createdAt}
        </Text>
      </Box>
      <Divider pt="10" />
      <Text pt="10" as="p">
        {data.content}
      </Text>
      <Divider pt="10" />

      <Heading pt="4" size="sm">
        コメント
      </Heading>

      <Box w="100%">
        <CommentForm articleId={data._id} />
      </Box>
    </VStack>
  );
};

Article.getLayout = (page) => <Layout>{page}</Layout>;

export default Article;
