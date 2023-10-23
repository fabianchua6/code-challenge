import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Flex,
} from '@chakra-ui/react';
import NavBar from './components/NavBar';
import theme from './theme';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
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
          <Text>
            Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
          </Text>
          <Box w="full">
            <Outlet />
          </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}
