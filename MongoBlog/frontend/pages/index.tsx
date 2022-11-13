import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { Container, Box, Heading, Text, Flex, Spinner, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Pagination } from '~/components/pagination';
import { MyLink } from '~/components/mylink';
import { useState } from 'react';
import { Layout } from '~/features/article/layout/layout';
import { NextPageWithLayout } from './_app';
import { query } from 'express';

const Home: NextPageWithLayout = () => {
  const api = useApi();

  const router = useRouter();

  const [page, setPage] = useState(1);

  const options = {
    page,
    limit: 5,
    published: true,
    ...router.query,
  };

  const { data, error } = useQuery({
    queryKey: ['posts', api.accessToken, options],
    queryFn: () => api.getArticles(options),
    keepPreviousData: true,
  });

  const handleClickPagination = (newPage: number) => {
    setPage(newPage);
    router.push({ query: { ...options, page: newPage } });
  };

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      {router.query.author && (
        <Text as="strong" display="block" pb="4">
          Articles by Author: {router.query.author}
        </Text>
      )}
      {data ? (
        <>
          <Flex gap="4" flexDirection="column">
            {data.data.map((post: any) => (
              <MyLink href={`/articles/${post._id}`} key={post._id}>
                <Flex
                  key={post._id}
                  borderWidth="1px"
                  borderRadius="sm"
                  padding="10"
                  justify="space-between"
                  align="center"
                  cursor="pointer"
                  _hover={{ bg: 'gray.100' }}
                >
                  <Box>
                    <Heading size="md">{post.title}</Heading>
                    <Text mt="2">{post.createdAt}</Text>
                  </Box>
                  <ChevronRightIcon />
                </Flex>
              </MyLink>
            ))}
          </Flex>

          <Pagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onClickPagination={handleClickPagination}
          />
        </>
      ) : (
        <Box my="8">
          <Spinner />
        </Box>
      )}
    </>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
