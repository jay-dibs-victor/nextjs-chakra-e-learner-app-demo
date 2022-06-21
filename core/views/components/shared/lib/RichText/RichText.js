import React from 'react';
import { Box } from '@chakra-ui/react';

export const RichText = ({ label, ...props }) => {
  return <Box border="1px solid #ccc" p={4} minH="200px">Rich Text Editor Placeholder for {label}</Box>;
};
