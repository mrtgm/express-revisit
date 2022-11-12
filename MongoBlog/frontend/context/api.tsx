import { useAuth0 } from '@auth0/auth0-react';
import ApiHandler from '~/lib/api';
import { createContext, useContext, useEffect, useState, FunctionComponent, ReactNode, useRef } from 'react';

export const ApiContext = createContext<ApiHandler>(new ApiHandler({}));

export const useApi = () => useContext(ApiContext);
export const ApiProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const api = useRef<ApiHandler>(new ApiHandler({}));

  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.auth0Audience,
        scope: '',
      });

      if (accessToken) {
        api.current = new ApiHandler({ accessToken });
      }
    };

    getAccessToken();
  }, [isAuthenticated]);

  return <ApiContext.Provider value={api.current}>{children}</ApiContext.Provider>;
};
