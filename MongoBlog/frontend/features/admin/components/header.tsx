import { HStack, Heading, Spacer, Button, Link, Divider } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return <Button onClick={() => logout()}>Log Out</Button>;
};

type HeaderProps = {
  isAuthenticated: boolean;
};

export function Header({ isAuthenticated }: HeaderProps) {
  return (
    <>
      <HStack marginBlock="20px">
        <Heading fontSize="16px" as="h2">
          <Link href="/admin/">管理画面</Link>
        </Heading>
        <Spacer />

        <LoginButton />
        {isAuthenticated && <LogoutButton />}
      </HStack>
      <Divider />
    </>
  );
}
