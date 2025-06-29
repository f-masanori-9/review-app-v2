import { ReviewButton } from "@/components/Buttons/ReviewButton";
import { Box, IconButton, Typography } from "@mui/material";
import { FaEdit } from "react-icons/fa";

export const Header: React.FC<{
  onClickReviewButton: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  allCardsCount: number;
  cardOrder: number;
  reviewCount: number;
  onEdit: () => void;
}> = ({
  onClickReviewButton,
  allCardsCount,
  cardOrder,
  reviewCount,
  onEdit,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width={"100%"}
    >
      <Typography variant="h6" color="text.secondary">
        {cardOrder} / {allCardsCount}
      </Typography>

      <Box display="flex" gap={1}>
        <IconButton
          onClick={onEdit}
          size="small"
          sx={{ color: "primary.main" }}
        >
          <FaEdit size={16} />
        </IconButton>
        <Box display="flex" alignItems="center" gap={1}>
          <ReviewButton
            onClick={onClickReviewButton}
            reviewCount={reviewCount}
          />
        </Box>
      </Box>
    </Box>
  );
};
