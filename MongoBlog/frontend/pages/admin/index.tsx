import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { ArticleList } from '~/features/admin/components/article_list';
import { CreateArticleForm } from '~/features/admin/components/create_article_form';

import { Divider, Container, Heading, Spinner, Spacer, Button, HStack } from '@chakra-ui/react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return <Button onClick={() => logout()}>Log Out</Button>;
};

export default function Admin() {
  const { isAuthenticated } = useAuth0();

  const api = useApi();
  const { data, isLoading } = useQuery([`posts: ${api.accessToken}`], api.getArticles);

  return (
    <Container maxW="3xl">
      <HStack marginBlock="20px">
        <Heading fontSize="16px" as="h2">
          管理画面
        </Heading>
        <Spacer />
        <LoginButton />
        {isAuthenticated && <LogoutButton />}
      </HStack>

      <Divider />
      <Spacer height="20px" />

      <ArticleList articles={data} isLoading={isLoading} />

      <Spacer height="20px" />
      <Divider />
      <Spacer height="20px" />

      {isAuthenticated && <CreateArticleForm />}
    </Container>
  );
}
