import { ReviewButton } from "@/components/Buttons/ReviewButton";
import { IconButton, Box } from "@mui/material";
import { FC } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export const Footer: FC<{
  reviewCount: number;
  isReviewed: boolean;
  isLoadingMutate: boolean;
  onClickReview: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  noteId: string;
  onClickMenuButton?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ onClickReview, reviewCount, isReviewed, isLoadingMutate,
    onClickMenuButton
 }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", height: "32px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
        <ReviewButton
          onClick={onClickReview}
          //   onClick={async (e) => {
          //     e.stopPropagation();
          //     await addVocabularyNoteReview(note.id);
          //     setIsReviewed(true);
          //     reward();
          //     mutate();
          //   }}
          reviewCount={reviewCount}
          isReviewed={isReviewed}
          isLoading={isLoadingMutate}
        />
      </Box>
      <IconButton
        aria-label="more"
        id="long-button"
        // aria-controls={open ? "long-menu" : undefined}
        // aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={onClickMenuButton}
      >
        <MoreVertIcon />
      </IconButton>
      {/* <DropDownMenu
        menuButtonChildren={<BsThreeDotsVertical size={18} />}
        items={[
          {
            key: "delete",
            children: (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FaTrash />
                <span>削除</span>
              </Box>
            ),
            onClick: () => {
              if (confirm("削除しますか？")) {
                deleteVocabularyNote(note.id);
              }
            },
          },
        ]}
      /> */}
    </Box>
  );
};
