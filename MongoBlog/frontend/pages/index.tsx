import type { NextPageWithLayout } from 'next';
import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { Container, Box, Heading, Text, Flex, Spinner, Link } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Pagination } from '~/components/pagination';
import { MyLink } from '~/components/mylink';
import { useState } from 'react';
import { Layout } from '~/features/article/layout/layout';

const Home: NextPageWithLayout = () => {
  const api = useApi();

  const [page, setPage] = useState(1);

  const { data, error } = useQuery({
    queryKey: ['posts', api.accessToken, page],
    queryFn: () => api.getArticles({ page, limit: 5 }),
    keepPreviousData: true,
  });

  const handleClickPagination = (page: number) => {
    setPage(page);
  };

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      {data ? (
        <>
          <Box>
            {data.data.map((post: any) => (
              <MyLink href={`/articles/${post._id}`}>
                <Flex
                  my="5"
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
          </Box>

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
