import React, { useEffect, useState } from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Input,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Tag,
  TagLabel,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import prices from '../assets/prices.json';
import { Coins } from 'lucide-react';
import { ChevronDownIcon } from '@chakra-ui/icons';
export const CryptoInput = ({
  text,
  onSetValueChange,
  onSetTokenChange,
  token,
  value,
  type,
  USDValue,
  walletBalance,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedToken, setSelectedToken] = useState(token); // Added state

  const handleTokenSelect = token => {
    setSelectedToken(token);
    onSetTokenChange(type, token);
    onClose();
  };

  // listen to change in currency
  useEffect(() => {
    setSelectedToken(token);
  }, [token]);

  return (
    <>
      <Card
        boxShadow={0}
        bg={useColorModeValue('primary.100', 'gray.800')}
        rounded={'lg'}
      >
        <CardHeader>
          <Heading size="md">{text}</Heading>
        </CardHeader>
        <Flex px={6}>
          <Input
            border={0}
            pl={-6}
            focusBorderColor="transparent"
            fontSize="2xl"
            fontWeight={'medium'}
            type="number"
            step="any"
            min={0}
            placeholder="0.00"
            value={value}
            onChange={e => onSetValueChange(type, e.target.value)}
          />

          <Button
            borderRadius={'full'}
            colorScheme="primary"
            px="6"
            variant={'outline'}
            onClick={onOpen}
            rightIcon={!selectedToken ? <ChevronDownIcon /> : ''}
          >
            <Avatar
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${selectedToken}.svg`}
              icon={<Coins />}
              hidden={!selectedToken}
              size={'xs'}
              ml={-1}
              mr={2}
            />
            {selectedToken || 'Choose Token'}
          </Button>
        </Flex>
        <CardFooter justifyContent="space-between">
          <Text as="span" color={useColorModeValue('gray.600', 'gray.400')}>
            ≃ USD$ {USDValue}
          </Text>
          <Text>Wallet: {walletBalance ? walletBalance : 0} </Text>
        </CardFooter>
      </Card>
      {/* Modal for selecting token */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent mx={[2, 0]}>
          <ModalHeader>Select a Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH={'16rem'} overflow={'scroll'}>
            {prices.map(price => (
              <Tag
                as={Button}
                key={price.currency}
                onClick={() => handleTokenSelect(price.currency)}
                mr={2}
                mb={2}
                borderRadius={'full'}
                px={4}
                size="lg"
              >
                <Avatar
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${price.currency}.svg`}
                  icon={<Coins />}
                  size={'xs'}
                  ml={-1}
                  mr={2}
                />
                <TagLabel>{price.currency}</TagLabel>
              </Tag>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
