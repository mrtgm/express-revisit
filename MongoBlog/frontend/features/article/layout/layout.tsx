import { FunctionComponent, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Heading, HStack, Spacer, Box } from '@chakra-ui/react';
import { MyLink } from '~/components/mylink';

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();

  return (
    <Container maxW={{ base: '100vw', md: '80vw' }}>
      <HStack align="center" mt="20px">
        <Heading as="h1" size="md">
          <MyLink href="/">📓 Blog</MyLink>
        </Heading>

        <Spacer />
        {isAuthenticated && <MyLink href="/admin/">Admin</MyLink>}
      </HStack>

      <Box mt="8">{children}</Box>
    </Container>
  );
};

export { Layout };
