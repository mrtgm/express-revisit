import { useAuth0 } from '@auth0/auth0-react';

export default function Admin() {
  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <LoginButton />

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
