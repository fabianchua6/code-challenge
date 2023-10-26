import React from 'react';
import { Box, ChakraProvider, Flex, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import theme from './theme';

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: `${process.env.ALCHEMY_APIKEY}` }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default function App() {
  return (
    <WagmiConfig config={config}>
      <ChakraProvider theme={theme}>
        <NavBar />
        <Flex
          p={{ base: '1em', sm: '0', md: '0' }}
          minW={{ base: '100%', sm: '720px' }}
          maxW={'1024'}
          alignItems="center"
          m="auto"
        >
          <VStack mt={4} spacing={8} minW={{ base: 'full' }}>
            <Box w="full">
              <Outlet />
            </Box>
          </VStack>
        </Flex>
      </ChakraProvider>
    </WagmiConfig>
  );
}
