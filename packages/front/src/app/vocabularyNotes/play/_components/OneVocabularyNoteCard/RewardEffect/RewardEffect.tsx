"use client";

import React from "react";

interface RewardEffectProps {
  id: string;
}

export const RewardEffect: React.FC<RewardEffectProps> = ({ id }) => {
  return (
    <span
      id={id}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};