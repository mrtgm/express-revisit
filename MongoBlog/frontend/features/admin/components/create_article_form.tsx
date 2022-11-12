import { useApi } from '~/context/api';
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  Textarea,
  Spacer,
  Button,
  VStack,
  Checkbox,
} from '@chakra-ui/react';

export function CreateArticleForm() {
  const api = useApi();

  const [article, setArticle] = useState({
    title: '',
    author: '',
    content: '',
    published: false,
  });

  const handleChangeFormAttr = (event: any, formAttr: string) => {
    setArticle(() => ({
      ...article,
      [formAttr]: event.target.value,
    }));
  };

  const handleClickSubmit = async () => {
    const response = await api.createArticle(article);
    if (response) {
      window.location.reload();
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="sm" padding="10">
      <Heading fontSize="16px" as="h2">
        新規投稿
      </Heading>
      <Spacer height="20px" />
      <FormControl>
        <VStack align="start">
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            isInvalid={!article.title}
            type="text"
            name="title"
            id="title"
            onChange={(e) => handleChangeFormAttr(e, 'title')}
          />
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            isInvalid={!article.author}
            type="text"
            name="author"
            id="author"
            onChange={(e) => handleChangeFormAttr(e, 'author')}
          />
          <FormLabel htmlFor="content">Content</FormLabel>
          <Textarea
            isInvalid={!article.author}
            name="content"
            id="content"
            cols={30}
            rows={10}
            onChange={(e) => handleChangeFormAttr(e, 'content')}
          />
          <FormLabel htmlFor="published">Published</FormLabel>
          <Checkbox
            type="checkbox"
            name="published"
            id="published"
            onChange={(e) => handleChangeFormAttr(e, 'published')}
          />
        </VStack>

        <Spacer height="20px" />
        <Button
          isDisabled={!article.author || !article.content || !article.title}
          onClick={handleClickSubmit}
          colorScheme="blue"
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}
