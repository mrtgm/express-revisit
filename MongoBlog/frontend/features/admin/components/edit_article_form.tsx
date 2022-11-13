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
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { MyLink } from '~/components/mylink';
import { useRouter } from 'next/router';
import { MarkdownRenderer } from '~/components/markdown_renderer';

type EditArticleFormProps = {
  articleId: string;
};

export function EditArticleForm({ articleId }: EditArticleFormProps) {
  const api = useApi();
  const router = useRouter();

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
    }
  }, [articleId]);

  const handleChangeFormAttr = (event: any, formAttr: string) => {
    setArticle(() => ({
      ...article,
      [formAttr]: event.target.value,
    }));
  };

  const handleClickCancel = () => {
    router.back();
  };

  const handleClickSubmit = async () => {
    const response = await api.updateArticle(articleId, article);
    if (response) {
      window.location.reload();
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="sm" padding="10">
      <HStack>
        <Heading fontSize="16px" as="h2">
          記事編集
        </Heading>
        <Spacer />
        <IconButton aria-label="Delete" size="sm" icon={<DeleteIcon />} />
      </HStack>

      <Spacer height="20px" />
      <FormControl>
        <VStack align="start" gap="4">
          <Box>
            <FormLabel>URL</FormLabel>
            <MyLink href={`${process.env.frontendUrl}/articles/${articleId}`} isExternal color="blue.600">
              {`${process.env.frontendUrl}/articles/${articleId}`}
            </MyLink>
          </Box>
          <Box w="100%">
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              isInvalid={!article.title}
              type="text"
              name="title"
              id="title"
              value={article.title}
              onChange={(e) => handleChangeFormAttr(e, 'title')}
            />
          </Box>

          <Box w="100%">
            <FormLabel htmlFor="author">Author</FormLabel>
            <Input
              isInvalid={!article.author}
              type="text"
              name="author"
              id="author"
              value={article.author}
              onChange={(e) => handleChangeFormAttr(e, 'author')}
            />
          </Box>

          <Box w="100%">
            <FormLabel htmlFor="content">Content</FormLabel>
            <Tabs>
              <TabList>
                <Tab fontSize="sm">Markdown</Tab>
                <Tab fontSize="sm">Preview</Tab>
              </TabList>
              <TabPanels>
                <TabPanel paddingInline="0" pb="0">
                  <Textarea
                    isInvalid={!article.author}
                    name="content"
                    id="content"
                    cols={30}
                    rows={10}
                    value={article.content}
                    onChange={(e) => handleChangeFormAttr(e, 'content')}
                  />
                </TabPanel>
                <TabPanel>
                  <MarkdownRenderer markdown={article.content} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Box w="100%">
            <FormLabel htmlFor="published">Published</FormLabel>
            <Checkbox
              type="checkbox"
              name="published"
              id="published"
              checked={article.published}
              onChange={(e) => handleChangeFormAttr(e, 'published')}
            />
          </Box>
        </VStack>

        <Spacer height="20px" />
        <HStack>
          <Button
            isDisabled={!article.author || !article.content || !article.title}
            onClick={handleClickSubmit}
            colorScheme="blue"
          >
            更新
          </Button>
          <Button onClick={handleClickCancel}>キャンセル</Button>
        </HStack>
      </FormControl>
    </Box>
  );
}
