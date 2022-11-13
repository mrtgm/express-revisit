import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApiProvider } from '~/context/api';
import { StyleProvider } from '~/context/chakra';
import type { AppPropsWithLayout } from 'next/app';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page) => page);

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
          <StyleProvider>{getLayout(<Component {...pageProps} />)}</StyleProvider>
        </QueryClientProvider>
      </ApiProvider>
    </Auth0Provider>
  );
}
