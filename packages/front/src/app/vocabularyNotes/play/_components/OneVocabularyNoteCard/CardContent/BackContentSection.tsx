"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface BackContentSectionProps {
  backContent: string;
  isShowBackContent: boolean;
  setIsShowBackContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BackContentSection: React.FC<BackContentSectionProps> = ({
  backContent,
  isShowBackContent,
  setIsShowBackContent,
}) => {
  if (isShowBackContent) {
    return (
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
    );
  }

  return (
    <Button
      onClick={() => setIsShowBackContent(true)}
      variant="contained"
      color="primary"
      fullWidth
    >
      回答を見る
    </Button>
  );
};