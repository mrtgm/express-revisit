import { useApi } from '~/context/api';
import { useState } from 'react';
import { FormControl, FormLabel, Input, Heading, Box, Spacer, Button, VStack, Textarea } from '@chakra-ui/react';

type CommentFormProps = {
  articleId: string;
};
export function CommentForm({ articleId }: CommentFormProps) {
  const api = useApi();

  const [article, setArticle] = useState({
    name: 'ナナシさん',
    content: '',
  });

  const handleChangeFormAttr = (event: any, formAttr: string) => {
    setArticle(() => ({
      ...article,
      [formAttr]: event.target.value,
    }));
  };

  const handleClickSubmit = async () => {
    // TODO: 実装
  };

  return (
    <Box borderWidth="1px" borderRadius="sm" padding="10">
      <FormControl>
        <VStack align="start">
          <FormLabel htmlFor="title">Name</FormLabel>
          <Input
            isInvalid={!article.name}
            type="name"
            name="name"
            id="name"
            value={article.name}
            onChange={(e) => handleChangeFormAttr(e, 'name')}
          />
          <FormLabel htmlFor="author">content</FormLabel>
          <Textarea
            isInvalid={!article.content}
            name="content"
            id="content"
            value={article.content}
            onChange={(e) => handleChangeFormAttr(e, 'content')}
          />
        </VStack>

        <Spacer height="20px" />
        <Button isDisabled={!article.name || !article.content} onClick={handleClickSubmit} colorScheme="blue">
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}
