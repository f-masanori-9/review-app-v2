"use client";
import { useUser } from "@auth0/nextjs-auth0";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const Footer: FC = () => {
  const router = useRouter();
  const { user } = useUser();

  const onClickToVocabularyNotes = () => {
    router.push("/vocabularyNotes");
  };
  const onClickToTagManagement = () => {
    router.push("/tags");
  };

  if (!user) {
    return null;
  }
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 100,
        bottom: 0,
        width: "100%",
        bgcolor: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Box />
        <Box
          onClick={onClickToVocabularyNotes}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Image
            src="/icon192_maskable.png"
            alt="homeIcon"
            height={40}
            width={40}
          />
          <Typography variant="caption">単語帳</Typography>
        </Box>
        <Box
          onClick={onClickToTagManagement}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Box p={1}>
            <Image src="/tag_icon.png" alt="tagIcon" height={24} width={24} />
          </Box>
          <Typography variant="caption">タグ管理</Typography>
        </Box>
        <Box />
      </Box>
    </Box>
  );
};
