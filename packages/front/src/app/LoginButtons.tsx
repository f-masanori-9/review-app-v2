"use client";

import { useRouter } from "next/navigation";
import { Button, Box } from "@mui/material";

export const LoginButtons = () => {
  const router = useRouter();

  return (
    <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
      <Button
        variant="contained"
        size="large"
        onClick={() => router.push('/login')}
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
        onClick={() => router.push('/login')}
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