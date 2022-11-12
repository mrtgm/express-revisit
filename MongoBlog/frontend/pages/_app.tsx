import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApiProvider } from '~/context/api';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <Auth0Provider
      domain={process.env.auth0Domain as string}
      clientId={process.env.auth0ClientId as string}
      audience={process.env.auth0Audience as string}
      scope=""
      redirectUri={typeof window !== 'undefined' ? window.location.origin : ''}
    >
      <ApiProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ApiProvider>
    </Auth0Provider>
  );
}
