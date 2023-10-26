import { SettingsIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { ArrowUpDown } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import prices from '../assets/prices.json';
import { useAccount, useBalance } from 'wagmi';
import { CryptoInput } from '../components/CryptoInput';

// TODO:
// 1. bottom review
// 4. Transaction confirmation with rates

export default function Problem2() {
  const [values, setValues] = useState({ buy: 0.0, sell: 0.0 });
  const [tokens, setTokens] = useState({ buy: 'ETH', sell: 'SWTH' });
  const [USDValue, setUSDValue] = useState({ buy: 0.0, sell: 0.0 });
  const [validTxn, setValidTxn] = useState(false);
  const [swapRate, setSwapRate] = useState(1);
  const [buttonMsg, setButtonMsg] = useState('Enter an amount');
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });

  const handleFlip = () => {
    // Swap tokens
    const newTokens = { buy: tokens.sell, sell: tokens.buy };
    setTokens(newTokens);

    // Swap values
    const newValues = { buy: values.sell, sell: values.buy };
    setValues(newValues);

    // Swap USDValues
    const newUSDValues = { buy: USDValue.sell, sell: USDValue.buy };
    setUSDValue(newUSDValues);
  };

  const updateSwapRate = useCallback(() => {
    const buyPrice = prices.find(price => price.currency === tokens.buy).price;
    const sellPrice = prices.find(
      price => price.currency === tokens.sell
    ).price;
    const rate = buyPrice / sellPrice;
    setSwapRate(rate);
  }, [tokens]);

  const checkValidTxn = useCallback(() => {
    // setValidTxn only if
    // 1. wallet connected
    if (!address) {
      setButtonMsg('Connect wallet');
      return false;
    }

    // 2. sending more than what is in wallet (consider gas fee?)
    if (values.buy > parseFloat(data?.formatted.substring(0, 8))) {
      setButtonMsg('Insufficient balance');
      return false;
    }

    // 3. sending 0
    if (values.buy === 0) {
      setButtonMsg('Enter an amount');
      return false;
    }

    // valid
    setButtonMsg('Swap');
    setValidTxn(true);
  }, [address, data, values.buy]);

  const handleValueChange = (type, val) => {
    // // block change if try to send more than wallet balance
    // if (parseFloat(val) > parseFloat(data?.formatted.substring(0, 8))) {
    //   return;
    // }

    setValues(prev => ({ ...prev, [type]: parseFloat(val) }));
    // Determine which value to update based on the type changed
    const oppositeType = type === 'buy' ? 'sell' : 'buy';

    // Find prices for each token
    const currentPrice = prices.find(
      price => price.currency === tokens[type]
    ).price;
    const oppositePrice = prices.find(
      price => price.currency === tokens[oppositeType]
    ).price;

    // Calculating the opposite value based on the ratio of their prices
    const oppositeValue = (currentPrice / oppositePrice) * val;

    // Update the opposite value
    setValues(prev => ({ ...prev, [oppositeType]: oppositeValue }));

    // Update USDValue for both buy and sell
    setUSDValue(prev => ({
      ...prev,
      [type]: parseFloat((val * currentPrice).toFixed(6)),
      [oppositeType]: parseFloat((oppositeValue * oppositePrice).toFixed(6)),
    }));
    checkValidTxn();
  };

  const handleTokenChange = (type, token) => {
    setUSDValue(prev => ({
      ...prev,
      [type]: parseFloat(
        (
          values[type] * prices.find(price => price.currency === token).price
        ).toFixed(6)
      ),
    }));
    setTokens(prev => ({ ...prev, [type]: token }));
    checkValidTxn();
  };

  // onRender check if validTxn
  useEffect(() => {
    checkValidTxn();
    updateSwapRate();
  }, [values, tokens, checkValidTxn, updateSwapRate]);

  return (
    <>
      <Heading size="2xl" mb={4}>
        Welcome!
      </Heading>
      <Text my={4}>
        <Text as="b">1 {tokens.buy}</Text> = {swapRate.toFixed(6)} {tokens.sell}
      </Text>
      <Card boxShadow={'lg'} size={'md'} rounded={'xl'} px={[0, 4]} py={[0, 2]}>
        <Tabs variant="soft-rounded" colorScheme="primary">
          <CardHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TabList w="full">
              <Tab rounded="lg">Swap</Tab>
              <Tab rounded="lg">Buy</Tab>
              <IconButton
                ml="auto"
                icon={<SettingsIcon />}
                isRound={true}
                variant={'ghost'}
              />
            </TabList>
          </CardHeader>
          <TabPanels>
            <TabPanel p={0}>
              <CardBody>
                <CryptoInput
                  text="You send"
                  type="buy"
                  onSetValueChange={handleValueChange}
                  onSetTokenChange={handleTokenChange}
                  token={tokens.buy}
                  value={values.buy}
                  USDValue={USDValue.buy}
                  walletBalance={data?.formatted.substring(0, 8)}
                />
                <Flex my={4} w="full">
                  <IconButton
                    isRound
                    icon={<ArrowUpDown size={16} />}
                    size="sm"
                    mx="auto"
                    onClick={handleFlip} // Trigger the flip when this b
                  />
                </Flex>
                <CryptoInput
                  text="You receive"
                  type="sell"
                  onSetValueChange={handleValueChange}
                  onSetTokenChange={handleTokenChange}
                  token={tokens.sell}
                  value={values.sell}
                  USDValue={USDValue.sell}
                  // walletBalance={data?.formatted.substring(0, 8)}
                />
              </CardBody>
              <CardFooter>
                <Button w="full" colorScheme="secondary" isDisabled={!validTxn}>
                  {validTxn ? 'Swap' : buttonMsg}
                </Button>
              </CardFooter>
            </TabPanel>
            <TabPanel>Exciting things ahead!</TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </>
  );
}
