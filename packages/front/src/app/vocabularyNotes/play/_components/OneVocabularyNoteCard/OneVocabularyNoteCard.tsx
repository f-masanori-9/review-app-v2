'use client';

import { Box, Card } from '@mui/material';
import type React from 'react';
import { useReward } from 'react-rewards';
import { Loading } from '@/components/Loading';
import { useAddVocabularyNoteReview } from '@/hooks/useAddVocabularyNoteReview';
import { useOneVocabularyNote } from '@/hooks/vocabularyNote/useOneVocabularyNote';
import { useBackContentContext } from '../../context/BackContentContext';
import { VocabularyCardContent } from './CardContent/CardContent';
import { RewardEffect } from './RewardEffect/RewardEffect';

export const OneVocabularyNoteCard: React.FC<{
  vocabularyNoteId: string;
  allCardsCount: number;
  cardOrder: number;
}> = ({ vocabularyNoteId, allCardsCount, cardOrder }) => {
  const { data: vocabularyNote, isLoading } =
    useOneVocabularyNote(vocabularyNoteId);
  const { isBackContentOpen, setIsBackContentOpen } = useBackContentContext();
  const { addVocabularyNoteReview } = useAddVocabularyNoteReview();
  const { reward } = useReward('rewardId', 'confetti');

  const isShowBackContent = isBackContentOpen(vocabularyNoteId);
  const setIsShowBackContent = (isOpen: boolean) => {
    setIsBackContentOpen(vocabularyNoteId, isOpen);
  };

  const handleReview = async () => {
    await addVocabularyNoteReview(vocabularyNoteId);
    reward();
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: 'calc(100vh - 180px)',
          position: 'relative',
        }}
      >
        <Loading />
      </Box>
    );
  }

  if (!vocabularyNote) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: 'calc(100vh - 180px)',
          position: 'relative',
        }}
      >{`Note not found`}</Box>
    );
  }

  return (
    <>
      <Box
        key={vocabularyNoteId}
        sx={{
          width: '100vw',
          scrollSnapAlign: 'center',
          height: 'calc(100vh - 180px)',
          position: 'relative',
        }}
      >
        <Card
          sx={{
            width: 'calc(100vw - 16px)',
            maxWidth: 448,
            display: 'flex',
            flexDirection: 'column',
            m: '8px auto',
            gap: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <VocabularyCardContent
            vocabularyNoteId={vocabularyNoteId}
            frontContent={vocabularyNote?.frontContent}
            backContent={vocabularyNote?.backContent}
            reviewCount={99} // TODO: reviewCountを取得する
            isShowBackContent={isShowBackContent}
            setIsShowBackContent={() => setIsShowBackContent(true)}
            allCardsCount={allCardsCount}
            cardOrder={cardOrder}
            onReview={handleReview}
          />
        </Card>
      </Box>
      <RewardEffect id="rewardId" />
    </>
  );
};
