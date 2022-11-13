import { useAuth0 } from '@auth0/auth0-react';
import { FunctionComponent, ReactNode } from 'react';
import { Header } from '../components/header';
import { useRouter } from 'next/router';
import { Container, Box, Tabs, TabList, Tab } from '@chakra-ui/react';

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();

  const handleClickArticle = () => {
    router.push('/admin/');
  };

  const handleClickCategory = () => {
    router.push('/admin/category');
  };

  const handleClickAuthor = () => {
    router.push('/admin/author');
  };

  return (
    <Container maxW={{ base: '100vw', md: '80vw' }}>
      <Header isAuthenticated={isAuthenticated} />

      <Tabs mt="4" variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab onClick={handleClickArticle}>記事</Tab>
          <Tab onClick={handleClickCategory}>カテゴリー</Tab>
          <Tab onClick={handleClickAuthor}>著者</Tab>
        </TabList>
      </Tabs>

      <Box mt="8">{children}</Box>
    </Container>
  );
};

export { Layout };
