import { Heading, Box, Text, VStack, Tag, HStack, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { MarkdownRenderer } from '~/components/markdown_renderer';
import { useApi } from '~/context/api';
import { CommentForm } from '~/features/article/components/comment_form';
import { MyLink } from '~/components/mylink';
import { Layout } from '~/features/article/layout/layout';
import { NextPageWithLayout } from '../_app';
import { CategoryEntity } from '~/lib/api';
import { useAuth0 } from '@auth0/auth0-react';

const Article: NextPageWithLayout = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth0();
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
    <VStack align="stretch" borderWidth="1px" borderRadius="sm" p={{ base: '5', md: '10' }}>
      <Box>
        <Heading display="flex" alignItems="center">
          {isAuthenticated && (
            <Button mr="4" as="a" href={`/admin/articles/${data._id}`} colorScheme="blue">
              Edit
            </Button>
          )}
          {data.title}
        </Heading>
        <HStack pt="8">
          {data.categories.map((category: CategoryEntity) => (
            <Tag key={category._id}>
              <MyLink href={`/articles?category=${category.name}`} key={category._id}>
                {category.name}
              </MyLink>
            </Tag>
          ))}
        </HStack>
        <HStack mt={4}>
          <Text as="strong">
            <MyLink href={`/?author=${data.author._id}`}>😏 {data.author.name}</MyLink>
          </Text>
          <Text>
            📅 <strong>{data.createdAt}</strong>
          </Text>
        </HStack>
      </Box>

      <Box pt="4">
        <MarkdownRenderer markdown={data.content} />
      </Box>

      <Heading pt="4" size="sm">
        Leave Comment
      </Heading>

      <Box w="100%">
        <CommentForm articleId={data._id} />
      </Box>
    </VStack>
  );
};

Article.getLayout = (page) => <Layout>{page}</Layout>;

export default Article;
