import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../src/contexts/AuthContext';
import { CartProvider } from '../src/contexts/CartContext';
import theme from '../src/theme';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>
            <Head>
              <title>OKEETROPICS - Fresh Farm Products</title>
              <meta name="description" content="Fresh tropical farm products delivered to your doorstep" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
          </ChakraProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp; 