import { ArticleEntity, AuthorEntity } from '~/lib/api';
import { Grid, GridItem, Button, Heading, HStack, Text, Spinner, IconButton } from '@chakra-ui/react';
type AuthorListProps = {
  authors: AuthorEntity[] | undefined;
};

export function AuthorList({ authors }: AuthorListProps) {
  if (!authors) {
    return <Spinner />;
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} padding="10" alignItems="center">
        <Heading gridColumn="1/4" fontSize="16px" as="h2">
          著者一覧
        </Heading>
        {authors?.map((author) => {
          return (
            <>
              <GridItem>
                <Text>{author.name}</Text>
              </GridItem>
              <GridItem>
                <Text>{author.createdAt}</Text>
              </GridItem>
              <GridItem>
                <HStack>
                  <Button colorScheme="red" size="sm">
                    削除
                  </Button>
                  <Button as="a" href={`/admin/authors/${author._id}`} colorScheme="blue" size="sm">
                    編集
                  </Button>
                </HStack>
              </GridItem>
            </>
          );
        })}
      </Grid>
    </>
  );
}
