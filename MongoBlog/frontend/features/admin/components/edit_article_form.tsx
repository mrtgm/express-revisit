import { useApi } from '~/context/api';
import { useEffect, useState } from 'react';
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

type EditArticleFormProps = {
  articleId: string;
};

export function EditArticleForm({ articleId }: EditArticleFormProps) {
  const api = useApi();

  const [article, setArticle] = useState({
    title: '',
    author: '',
    content: '',
    published: false,
  });

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await api.getArticle(articleId);
      if (response) {
        setArticle(response);
      }
    };
    if (articleId) {
      fetchArticle();
      console.log(articleId);
    }
  }, [articleId]);

  const handleChangeFormAttr = (event: any, formAttr: string) => {
    setArticle(() => ({
      ...article,
      [formAttr]: event.target.value,
    }));
  };

  const handleClickSubmit = async () => {
    const response = await api.updateArticle(articleId, article);
    if (response) {
      window.location.reload();
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="sm" padding="10">
      <Heading fontSize="16px" as="h2">
        記事編集
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
            value={article.title}
            onChange={(e) => handleChangeFormAttr(e, 'title')}
          />
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            isInvalid={!article.author}
            type="text"
            name="author"
            id="author"
            value={article.author}
            onChange={(e) => handleChangeFormAttr(e, 'author')}
          />
          <FormLabel htmlFor="content">Content</FormLabel>
          <Textarea
            isInvalid={!article.author}
            name="content"
            id="content"
            cols={30}
            rows={10}
            value={article.content}
            onChange={(e) => handleChangeFormAttr(e, 'content')}
          />
          <FormLabel htmlFor="published">Published</FormLabel>
          <Checkbox
            type="checkbox"
            name="published"
            id="published"
            checked={article.published}
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
