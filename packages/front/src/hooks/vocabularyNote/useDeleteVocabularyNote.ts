import { useCallback } from 'react';
import { tRPCClient } from '@/libs/tRPCClient';
import { useMutateVocabularyNotes } from './useVocabularyNotes';

export const useDeleteVocabularyNote = () => {
  const { mutate } = useMutateVocabularyNotes();
  const deleteVocabularyNote = useCallback(
    async (noteId: string) => {
      await tRPCClient.vocabularyNotes.deleteVocabularyNote.mutate({
        noteId,
      });

      mutate();

      return;
    },
    [mutate],
  );

  return { deleteVocabularyNote };
};
