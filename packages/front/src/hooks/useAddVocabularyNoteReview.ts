import { useCallback } from 'react';
import { useMutateVocabularyNotes } from '@/hooks/vocabularyNote/useVocabularyNotes';
import { tRPCClient } from '@/libs/tRPCClient';

export const useAddVocabularyNoteReview = () => {
  const { mutateVocabularyNotesLocalOnly } = useMutateVocabularyNotes();

  const addVocabularyNoteReview = useCallback(
    async (noteId: string) => {
      await tRPCClient.vocabularyNotes.reviewLog.createReadLog.mutate({
        vocabularyNoteId: noteId,
      });

      mutateVocabularyNotesLocalOnly({ id: noteId }, true);
    },
    [mutateVocabularyNotesLocalOnly],
  );

  return { addVocabularyNoteReview };
};
