import { FunctionComponent, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Heading, HStack, Spacer } from '@chakra-ui/react';
import { MyLink } from '~/components/mylink';

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Container>
      <HStack align="center" mt="20px">
        <Heading as="h1" size="md">
          <MyLink href="/">Blog</MyLink>
        </Heading>

        <Spacer />
        {isAuthenticated && <MyLink href="/admin/">Admin</MyLink>}
      </HStack>

      {children}
    </Container>
  );
};

export { Layout };
