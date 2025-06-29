"use client";

import { Box, CardContent, Divider, Typography } from "@mui/material";
import React from "react";
import { Header } from "../header/Header";
import { BackContentSection } from "./BackContentSection";

interface CardContentProps {
  vocabularyNoteId: string;
  frontContent: string;
  backContent: string;
  reviewCount: number;
  isShowBackContent: boolean;
  setIsShowBackContent: React.Dispatch<React.SetStateAction<boolean>>;
  allCardsCount: number;
  cardOrder: number;
  onEdit: () => void;
  onReview: () => Promise<void>;
}

export const VocabularyCardContent: React.FC<CardContentProps> = ({
  frontContent,
  backContent,
  reviewCount,
  isShowBackContent,
  setIsShowBackContent,
  allCardsCount,
  cardOrder,
  onEdit,
  onReview,
}) => {
  return (
    <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header
          onClickReviewButton={async (e) => {
            e.stopPropagation();
            await onReview();
          }}
          allCardsCount={allCardsCount}
          cardOrder={cardOrder}
          reviewCount={reviewCount}
          onEdit={onEdit}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontWeight: 600,
        }}
      >
        {frontContent}
      </Typography>
      <Divider />
      <BackContentSection
        backContent={backContent}
        isShowBackContent={isShowBackContent}
        setIsShowBackContent={setIsShowBackContent}
      />
    </CardContent>
  );
};