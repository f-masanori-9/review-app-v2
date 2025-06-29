"use client";

import { Loading } from "@/components/Loading";
import { Box, Button, Typography } from "@mui/material";
import React, { FC } from "react";
import { FaEye } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { useReward } from "react-rewards";

export const ReviewButton: FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  reviewCount: number;
  isReviewed?: boolean;
  isLoading?: boolean;
}> = ({ onClick, isReviewed, reviewCount, isLoading }) => {
  const { reward } = useReward("rewardId", "confetti");

  return (
    <Button
      id="rewardId"
      onClick={(e) => {
        reward();
        onClick(e);
      }}
      variant="text"
      disabled={isLoading || isReviewed}
      sx={{ minWidth: "auto", p: 0 }}
    >
      <Box display="flex" alignItems="center" gap={0.5}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isReviewed ? (
              <FaEye size={20} color="text.disabled" />
            ) : (
              <IoEyeOutline size={20} color="gray" />
            )}
            <Typography
              variant="body2"
              color={isReviewed ? "text.disabled" : "text.primary"}
            >
              {reviewCount}
            </Typography>
          </>
        )}
      </Box>
    </Button>
  );
};
