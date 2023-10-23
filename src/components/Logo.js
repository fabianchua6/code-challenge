import React from 'react';
import { Image, useColorModeValue } from '@chakra-ui/react';
import logo_dark from '../assets/logo.svg';
import logo_light from '../assets/logo_light.svg';

export const Logo = props => {
  return <Image src={useColorModeValue(logo_dark, logo_light)} {...props} />;
};
