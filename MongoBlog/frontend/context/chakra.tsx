import React, { FunctionComponent, ReactNode } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        textDecoration: 'none',
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export const StyleProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);
