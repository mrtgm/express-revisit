import { useAuth0 } from '@auth0/auth0-react';
import { FunctionComponent, ReactNode } from 'react';
import { Header } from '../components/header';
import { Container } from '@chakra-ui/react';

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Container maxW="3xl">
      <Header isAuthenticated={isAuthenticated} />
      <Container mt="20px">{children}</Container>
    </Container>
  );
};

export { Layout };
