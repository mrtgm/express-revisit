import { useAuth0 } from '@auth0/auth0-react';
import ApiHandler from '~/lib/api';
import { createContext, useContext, useEffect, useState, FunctionComponent, ReactNode } from 'react';

export const ApiContext = createContext<ApiHandler>(new ApiHandler({}));

export const useApi = () => useContext(ApiContext);
export const ApiProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  const [api, setApi] = useState<ApiHandler>(new ApiHandler({}));

  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.auth0Audience,
      });
      setApi(new ApiHandler({ accessToken }));
    };

    getAccessToken();
  }, [getAccessTokenSilently]);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
