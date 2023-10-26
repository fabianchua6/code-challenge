import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import walletData from './walletBalance.json';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

class Datasource {
  constructor(private url: string) {
    this.url = url;
  }

  async getPrices() {
    const res = await fetch(this.url);
    const data = await res.json();
    return data;
  }
}

interface BoxProps {
  children?: React.ReactNode;
}

interface Props extends BoxProps {}

const WalletRow: React.FC<any> = (props: any) => {
  const { currency, amount, usdValue, formattedAmount } = props;
  return (
    <Tr>
      <Td>{currency}</Td>
      <Td isNumeric>{amount}</Td>
      <Td isNumeric>{formattedAmount}</Td>
      <Td isNumeric>{usdValue}</Td>
    </Tr>
  );
};

const useWalletBalances = (): WalletBalance[] => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        // uncomment if fetch directly from wallet
        // const response = await fetch(
        //   'https://interview.switcheo.com/prices.json'
        // );
        setBalances(walletData);
      } catch (error) {
        console.error('Failed to fetch wallet balances:', error);
      }
    };

    fetchBalances();
  }, []);

  return balances;
};

const DECIMAL_PLACES = 6;

export const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource(
      'https://interview.switcheo.com/prices.json'
    );
    datasource
      .getPrices()
      .then(prices => {
        const currencyTokenMap = {};
        prices.forEach(entry => {
          currencyTokenMap[entry.currency] = entry.price;
        });

        setPrices(currencyTokenMap);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount >= 0 ? true : false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return leftPriority > rightPriority ? -1 : 1;
      });
  }, [balances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(DECIMAL_PLACES),
    };
  });

  return (
    <TableContainer {...rest}>
      <Table>
        <TableCaption>Your Wallets </TableCaption>
        <Thead>
          <tr>
            <th>Currency</th>
            <th>Amount</th>
            <th>Formatted Amount</th>
            <th>USD Value</th>
          </tr>
        </Thead>
        <Tbody>
          {formattedBalances.map(
            (balance: FormattedWalletBalance, index: number) => {
              const usdValue = prices[balance.currency] * balance.amount;
              return (
                <WalletRow
                  key={index}
                  currency={balance.currency}
                  amount={balance.amount}
                  usdValue={usdValue.toFixed(DECIMAL_PLACES)}
                  formattedAmount={balance.formatted}
                />
              );
            }
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
