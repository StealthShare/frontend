import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme';
import { Wrapper } from './components/global/wrapper/Wrapper';
import '@fontsource/jura';
import '@fontsource/inter';
import { UserContextProvider } from './provider/user/UserContext';
import { CartContextProvider } from './provider/cart/CartContext';

export const App = () => (
  <ChakraProvider theme={theme}>
    <UserContextProvider>
      <CartContextProvider>
        <Wrapper />
      </CartContextProvider>
    </UserContextProvider>
  </ChakraProvider>
);
