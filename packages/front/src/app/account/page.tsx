'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

export default function Account() {
  const { user } = useUser();

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        p: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: '28rem',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              アカウント情報
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              メールアドレス: {user?.email}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              アクション
            </Typography>

            <Button
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                py: 1,
                px: 2,
                color: 'error.main',
                fontWeight: 'medium',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
              href="/auth/logout"
            >
              ログアウト
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
