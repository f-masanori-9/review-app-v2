"use client";

import { Loading } from "@/components/Loading";
import React, { FC } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";
import { resolvedConfig } from "../../../tailwind.config";
import { useReward } from "react-rewards";

export const ReviewButton: FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  reviewCount: number;
  isReviewed?: boolean;
  isLoading?: boolean;
}> = ({ onClick, isReviewed, reviewCount, isLoading }) => {
  const { reward } = useReward("rewardId", "confetti");

  return (
    <button
      id="rewardId"
      onClick={(e) => {
        reward();
        onClick(e);
      }}
      className="flex items-center gap-1"
      disabled={isLoading || isReviewed}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isReviewed ? (
            <FaEye size={20} color={resolvedConfig.colors.primaryGray} />
          ) : (
            <IoEyeOutline size={20} />
          )}
          <span className={isReviewed ? `text-primaryGray` : ""}>
            {reviewCount}
          </span>
        </>
      )}
    </button>
  );
};
