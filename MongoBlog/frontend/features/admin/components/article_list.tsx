import { ArticleEntity } from '~/lib/api';
import { PaginatedResponse } from '~/lib/api';
import { Pagination } from './pagination';

import { Grid, GridItem, Button, Heading, HStack, Text, Spinner } from '@chakra-ui/react';
type ArticleListProps = {
  articles: PaginatedResponse<ArticleEntity> | undefined;
  page: number;
  onClickPagination: (page: number) => void;
};

const formatDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .split('/')
    .join('-');
};

export function ArticleList({ articles, page, onClickPagination }: ArticleListProps) {
  if (!articles) {
    return <Spinner />;
  }

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} padding="10" alignItems="center">
        <Heading gridColumn="1/5" fontSize="16px" as="h2">
          投稿一覧
        </Heading>
        {articles?.data.map((article) => {
          return (
            <>
              <GridItem>
                <Text>{article.title}</Text>
              </GridItem>
              <GridItem>
                <Text>{article.author}</Text>
              </GridItem>
              <GridItem>
                <Text>{formatDate(article.createdAt)}</Text>
              </GridItem>
              <GridItem>
                <HStack>
                  <Button colorScheme="red" size="sm">
                    削除
                  </Button>
                  <Button as="a" href={`/admin/articles/${article._id}`} colorScheme="blue" size="sm">
                    編集
                  </Button>
                </HStack>
              </GridItem>
            </>
          );
        })}
      </Grid>

      <Pagination page={page} totalPages={articles.pagination.totalPages} onClickPagination={onClickPagination} />
    </>
  );
}
