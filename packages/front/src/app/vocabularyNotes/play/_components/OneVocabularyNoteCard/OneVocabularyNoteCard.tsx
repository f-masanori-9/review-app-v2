"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useAddVocabularyNoteReview } from "@/hooks/useAddVocabularyNoteReview";
import { useReward } from "react-rewards";
import { Header } from "./header/Header";

export const OneVocabularyNoteCard: React.FC<{
  vocabularyNoteId: string;
  frontContent: string;
  backContent: string;
  reviewCount: number;
  isShowBackContent: boolean;
  setIsShowBackContent: React.Dispatch<React.SetStateAction<boolean>>;
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
  const { addVocabularyNoteReview } = useAddVocabularyNoteReview();
  const { reward } = useReward("rewardId", "confetti");
  const [isShowBackContent, setIsShowBackContent] = useState(false);

  return (
    <Box
      key={vocabularyNoteId}
      sx={{
        width: "100vw",
        scrollSnapAlign: "center",
        p: 2,
        alignContent: "center",
        height: "calc(100vh - 100px)",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 448,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
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
                await addVocabularyNoteReview(vocabularyNoteId);
                reward();
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

          {isShowBackContent ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  maxHeight: "48vh",
                  overflow: "scroll",
                }}
              >
                <Typography
                  sx={{
                    color: "text.secondary",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {backContent}
                </Typography>
              </Box>
              <Button
                onClick={() => setIsShowBackContent(false)}
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
              >
                回答を隠す
              </Button>
            </Box>
          ) : (
            <Button
              onClick={() => setIsShowBackContent(true)}
              variant="contained"
              color="primary"
              fullWidth
            >
              回答を見る
            </Button>
          )}
        </CardContent>
      </Card>
      {/* Reward effect element */}
      <span
        id="rewardId"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};
