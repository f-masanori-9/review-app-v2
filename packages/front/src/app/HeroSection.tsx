"use client";

import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import { Typography, Box } from "@mui/material";
import { LoginButtons } from "./LoginButtons";

export const HeroSection = () => {
  const { user } = useUser();

  return (
    <Box
      sx={{
        maxWidth: '4xl',
        width: '100%',
        p: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          mb: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'navy',
            pb: 1,
            whiteSpace: 'nowrap',
          }}
        >
          ReviNotes
        </Typography>
        <Image
          src="/icon512_maskable.png"
          alt="homeIcon"
          height={90}
          width={90}
        />
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          mb: 3,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'navy',
            pb: 1,
            whiteSpace: 'nowrap',
          }}
        >
          復習を可視化し、
          <br />
          効率的な学習をサポート
        </Typography>
      </Box>
      
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.125rem',
          color: 'text.secondary',
          mb: 4,
        }}
      >
        ReviNotes
        は、「復習の回数」を見える化し、効率的な学習をサポートするアプリです。語学の単語はもちろん、資格試験の用語、仕事の知識、趣味のスキルなど、あらゆる学習内容を記録し、効果的に復習できます。
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.125rem',
          color: 'text.secondary',
          mb: 4,
        }}
      >
        「どれを何回復習したか」が一目でわかるから、忘れやすいポイントを重点的に学習可能。スキマ時間を活用しながら、あなたの知識を確実に積み上げていきましょう！
      </Typography>
      
      {!user && <LoginButtons />}
    </Box>
  );
};