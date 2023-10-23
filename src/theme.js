import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    light: '#faf9f8',
    dark: '#fb9912',
    primary: {
      50: '#e7f5fe',
      100: '#c5dfec',
      200: '#a2c9de',
      300: '#7eb3d0',
      400: '#5c9dc2',
      500: '#4484a8',
      600: '#346684',
      700: '#244a5e',
      800: '#132c3a',
      900: '#001017',
    },
    secondary: {
      50: '#f6ffe1',
      100: '#e7fdb5',
      200: '#d9fb87',
      300: '#c9f957',
      400: '#baf72d',
      500: '#a1dd1b',
      600: '#7dad13',
      700: '#597b0a',
      800: '#354a02',
      900: '#111a00',
    },
  },
});

export default theme;
