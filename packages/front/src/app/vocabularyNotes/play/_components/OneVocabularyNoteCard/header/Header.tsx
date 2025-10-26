import { Box, Typography } from '@mui/material';
import { ReviewButton } from '@/components/Buttons/ReviewButton';

export const Header: React.FC<{
  onClickReviewButton: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  allCardsCount: number;
  cardOrder: number;
  reviewCount: number;
}> = ({ onClickReviewButton, allCardsCount, cardOrder, reviewCount }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width={'100%'}
    >
      <Typography variant="h6" color="text.secondary">
        {cardOrder} / {allCardsCount}
      </Typography>

      <Box display="flex" gap={1} alignItems="center">
        <ReviewButton onClick={onClickReviewButton} reviewCount={reviewCount} />
      </Box>
    </Box>
  );
};
