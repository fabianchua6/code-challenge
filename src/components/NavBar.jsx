import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, Icon } from '@chakra-ui/icons';
import { Logo } from './Logo';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useAccount, useConnect, useDisconnect, useEnsAvatar } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Unlink, Wallet } from 'lucide-react';

const Links = {
  'Problem 2': '/problem2',
  'Problem 3': '/problem3',
};

const NavLink = (props: { children: React.ReactNode, href: string }) => {
  const { children, href } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('primary.700', 'secondary.200'),
        color: useColorModeValue('white', 'primary.700'),
      }}
      href={href}
    >
      {children}
    </Box>
  );
};

const ConnectWallet = () => {
  const { address, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <Flex alignItems="center">
        <Avatar size={'sm'} mr={2} src={ensAvatar} alt="ENS Avatar" />
        <Text>
          {address?.toString().slice(0, -36)}...
          {address?.toString().substring(38)}
        </Text>
        <IconButton
          ml="2"
          icon={<Unlink size={16} />}
          onClick={() => disconnect()}
        >
          Disconnect
        </IconButton>
      </Flex>
    );
  return (
    <Button onClick={() => connect()}>
      <Icon as={Wallet} size={16} mr={[0, 2]} />
      <Text hideBelow={'md'}>Connect Wallet</Text>
    </Button>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue('#F4F9FD', '#193B4D')}
        px={4}
        w="100%"
        justifyContent="center"
      >
        <Flex
          h={16}
          px={{ base: '1em', md: '0em' }}
          mx={{ base: 'auto' }}
          alignItems={'center'}
          justify={{ base: 'space-between' }}
          maxWidth={'1024px'}
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Logo />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Object.keys(Links).map(key => (
                <NavLink key={key} href={Links[key]}>
                  {key}
                </NavLink>
              ))}
              <ColorModeSwitcher />
            </HStack>
          </HStack>

          <ConnectWallet />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Object.keys(Links).map(key => (
                <NavLink key={key} href={Links[key]}>
                  {key}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
