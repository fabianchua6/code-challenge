import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Logo } from './Logo';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Links = {
  'Problem 1': '/problem1',
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
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Box>
                  <Logo />
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
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
          <Flex alignItems={'center'}>
            <Avatar
              size={'sm'}
              src={
                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              }
            />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link[0]}>{link[1]}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
