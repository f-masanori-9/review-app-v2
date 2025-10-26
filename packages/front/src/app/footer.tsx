'use client';
import { useUser } from '@auth0/nextjs-auth0';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import type { FC } from 'react';
import { FaPlay } from 'react-icons/fa';

export const Footer: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const onClickToVocabularyNotes = () => {
    router.push('/vocabularyNotes');
  };
  const onClickToTagManagement = () => {
    router.push('/tags');
  };
  const onClickToPlayMode = () => {
    router.push('/vocabularyNotes/play');
  };

  // 現在のパスに基づいて選択状態を判定
  const isVocabularyNotesSelected = pathname === '/vocabularyNotes';
  const isPlaySelected = pathname === '/vocabularyNotes/play';
  const isTagSelected = pathname === '/tags';

  if (!user) {
    return null;
  }
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 100,
        bottom: 0,
        width: '100%',
        bgcolor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #e5e7eb',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flex: 1,
          mb: 1,
        }}
      >
        <Box
          onClick={onClickToVocabularyNotes}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            opacity: isVocabularyNotesSelected ? 1 : 0.5,
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Image
            src="/icon192_maskable.png"
            alt="homeIcon"
            height={40}
            width={40}
          />
          <Typography
            variant="caption"
            sx={{
              color: isVocabularyNotesSelected ? '#06b6d4' : '#9ca3af',
              fontWeight: isVocabularyNotesSelected ? 600 : 400,
            }}
          >
            管理
          </Typography>
        </Box>
        <Box
          onClick={onClickToPlayMode}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            opacity: isPlaySelected ? 1 : 0.5,
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Box p={1}>
            <FaPlay size={24} color={isPlaySelected ? '#06b6d4' : '#9ca3af'} />
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: isPlaySelected ? '#06b6d4' : '#9ca3af',
              fontWeight: isPlaySelected ? 600 : 400,
            }}
          >
            単語帳
          </Typography>
        </Box>
        <Box
          onClick={onClickToTagManagement}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            opacity: isTagSelected ? 1 : 0.5,
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Box p={1}>
            <Image
              src="/tag_icon.png"
              alt="tagIcon"
              height={24}
              width={24}
              style={{
                filter: isTagSelected
                  ? 'hue-rotate(180deg) saturate(200%)'
                  : 'grayscale(100%)',
                opacity: isTagSelected ? 1 : 0.5,
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: isTagSelected ? '#06b6d4' : '#9ca3af',
              fontWeight: isTagSelected ? 600 : 400,
            }}
          >
            タグ管理
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
