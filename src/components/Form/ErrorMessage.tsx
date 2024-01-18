import { Typography } from '@mui/material';
import React from 'react';
import { Colors } from '@ari/ui-components';

export default function ErrorMessage({ children }: any) {
  return (
    <Typography mt={1} ml={1} color={Colors.ERROR}>
      {children}
    </Typography>
  );
}
