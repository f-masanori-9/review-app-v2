"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import { useReward } from "react-rewards";

import { useAddVocabularyNoteReview } from "@/hooks/useAddVocabularyNoteReview";
import { useUpdateVocabularyNoteDebounced } from "@/hooks/useUpdateVocabularyNoteDebounced";
import { useDeleteVocabularyNote } from "@/hooks/vocabularyNote/useDeleteVocabularyNote";
import { useMutateVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { Menu, MenuItem, Stack } from "@mui/material";
import { differenceInDays } from "date-fns";
import { Content } from "./content/Content";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

export const OneVocabularyNote: FC<{
  note: {
    id: string;
    createdAt: Date;
    frontContent: string;
    backContent: string;
  };
  reviewCount: number;
  tags: {
    tagId: string;
    tagName: string;
  }[];
  onClickVN: (args: { vnId: string }) => void;
}> = ({ note, reviewCount, onClickVN, tags }) => {
  const { updateVocabularyNoteDebounced } = useUpdateVocabularyNoteDebounced();

  const { addVocabularyNoteReview } = useAddVocabularyNoteReview();
  const { mutate, isLoading: isLoadingMutate } = useMutateVocabularyNotes();

  const { reward } = useReward("rewardId", "confetti");
  const [isReviewed, setIsReviewed] = useState(false);

  const { deleteVocabularyNote } = useDeleteVocabularyNote();

  const opacity = getReviewOpacity(reviewCount);

  const menuAnchorRef = React.useRef<HTMLButtonElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickCard = useCallback(() => {
    onClickVN({ vnId: note.id });
  }, [note.id, onClickVN]);

  useEffect(() => {
    return () => {
      updateVocabularyNoteDebounced.flush();
    };
  }, [updateVocabularyNoteDebounced]);

  return (
    <Stack
      p={1}
      direction={"column"}
      spacing={1}
      sx={{
        transition: "background-color 0.3s ease",
        backgroundColor: `rgba(59, 130, 246, ${opacity / 100})`,
      }}
      onClick={onClickCard}
    >
      <Header
        tags={tags}
        daysAgo={differenceInDays(new Date(), note.createdAt)}
      />
      <Content
        note={{
          frontContent: note.frontContent,
          backContent: note.backContent,
        }}
      />
      <Footer
        reviewCount={reviewCount}
        isReviewed={isReviewed}
        isLoadingMutate={isLoadingMutate}
        onClickReview={async (e) => {
          e.stopPropagation();
          await addVocabularyNoteReview(note.id);
          setIsReviewed(true);
          reward();
          mutate();
        }}
        noteId={note.id}
        onClickMenuButton={(e) => {
          menuAnchorRef.current = e.currentTarget;
          e.stopPropagation();
          setIsMenuOpen(true);
        }}
      />
      <NoteMenu
        anchorEl={menuAnchorRef.current}
        open={isMenuOpen}
        handleClose={() => {
          menuAnchorRef.current = null;
          setIsMenuOpen(false);
        }}
        handleDelete={() => {
          if (confirm("このノートを削除しますか？")) {
            deleteVocabularyNote(note.id).then(() => {
              mutate();
            });
          }
          menuAnchorRef.current = null;
          setIsMenuOpen(false);
        }}
      />
    </Stack>
  );
};

const NoteMenu: FC<{
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}> = ({ anchorEl, open, handleClose, handleDelete }) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={(d: MouseEvent) => {
        d.stopPropagation();

        handleClose();
      }}
      MenuListProps={{
        onClick: (e) => e.stopPropagation(), // メニュー内クリックも親に伝播させない
      }}
    >
      <MenuItem onClick={handleDelete}>削除</MenuItem>
    </Menu>
  );
};

const getReviewOpacity = (count: number): number => {
  const maxReviews = 30;
  const maxOpacity = 100;
  return Math.min(
    Math.floor(((count / maxReviews) * maxOpacity) / 5) * 5,
    maxOpacity
  );
};
