import { useCallback } from 'react';
import useSWR, { mutate, type SWRConfiguration } from 'swr';
import { tRPCClient } from '@/libs/tRPCClient';

export const generateKey = (noteId: string) => ({
  noteId,
  name: 'useOneVocabularyNote',
});

export const useOneVocabularyNote = (
  noteId: string,
  options?: SWRConfiguration,
) => {
  return useSWR(
    generateKey(noteId),
    async ({ noteId }) => {
      const vocabularyNote =
        await tRPCClient.vocabularyNotes.getVocabularyNote.query({
          vocabularyNoteId: noteId,
        });

      return vocabularyNote;
    },
    options,
  );
};

export const useMutateOneVocabularyNote = () => {
  const mutateNoteVN = useCallback(async (noteId: string) => {
    await mutate(generateKey(noteId));
  }, []);

  return { mutateNoteVN };
};
