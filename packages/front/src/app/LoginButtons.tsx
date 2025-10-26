'use client';

import { Box, Button } from '@mui/material';

export const LoginButtons = () => {
  return (
    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
      <Button
        variant="contained"
        size="large"
        href="/auth/login"
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        今すぐ始める
      </Button>
      <Button
        variant="outlined"
        size="large"
        href="/auth/login"
        sx={{
          borderColor: 'primary.main',
          color: 'primary.main',
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
          '&:hover': {
            borderColor: 'primary.dark',
            color: 'primary.dark',
          },
        }}
      >
        ログイン
      </Button>
    </Box>
  );
};
