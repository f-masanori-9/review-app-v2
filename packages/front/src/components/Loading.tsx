import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center' }}
      aria-label="読み込み中"
    >
      <CircularProgress size={16} />
    </Box>
  );
};
