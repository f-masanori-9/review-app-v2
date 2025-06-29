"use client";

import { Box, Card } from "@mui/material";
import React, { useState } from "react";

import { useAddVocabularyNoteReview } from "@/hooks/useAddVocabularyNoteReview";
import { useReward } from "react-rewards";
import { VocabularyCardContent } from "./CardContent/CardContent";
import { RewardEffect } from "./RewardEffect/RewardEffect";

export const OneVocabularyNoteCard: React.FC<{
  vocabularyNoteId: string;
  frontContent: string;
  backContent: string;
  reviewCount: number;
  allCardsCount: number;
  cardOrder: number;
  onEdit: () => void;
}> = ({
  vocabularyNoteId,
  frontContent,
  backContent,
  reviewCount,
  allCardsCount,
  cardOrder,
  onEdit,
}) => {
  const [isShowBackContent, setIsShowBackContent] = useState<boolean>(false);
  const { addVocabularyNoteReview } = useAddVocabularyNoteReview();
  const { reward } = useReward("rewardId", "confetti");

  const handleReview = async () => {
    await addVocabularyNoteReview(vocabularyNoteId);
    reward();
  };

  return (
    <>
      <Box
        key={vocabularyNoteId}
        sx={{
          width: "100vw",
          scrollSnapAlign: "center",
          height: "calc(100vh - 100px)",
          position: "relative",
        }}
      >
        <Card
          sx={{
            width: "calc(100vw - 16px)",
            maxWidth: 448,
            display: "flex",
            flexDirection: "column",
            m: "8px auto",
            gap: 1,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <VocabularyCardContent
            vocabularyNoteId={vocabularyNoteId}
            frontContent={frontContent}
            backContent={backContent}
            reviewCount={reviewCount}
            isShowBackContent={isShowBackContent}
            setIsShowBackContent={setIsShowBackContent}
            allCardsCount={allCardsCount}
            cardOrder={cardOrder}
            onEdit={onEdit}
            onReview={handleReview}
          />
        </Card>
      </Box>
      <RewardEffect id="rewardId" />
    </>
  );
};
