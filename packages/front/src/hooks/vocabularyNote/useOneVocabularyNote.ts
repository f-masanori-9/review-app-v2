import { tRPCClient } from "@/libs/tRPCClient";
import { useCallback } from "react";
import useSWR, { mutate, SWRConfiguration } from "swr";

export const generateKey = (noteId: string) => ({
  noteId,
  name: "useOneVocabularyNote",
});

export const useOneVocabularyNote = (
  noteId: string,
  options?: SWRConfiguration
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
    options
  );
};

export const useMutateOneVocabularyNote = () => {
  const mutateNoteVN = useCallback(async (noteId: string) => {
    await mutate(generateKey(noteId));
  }, []);

  return { mutateNoteVN };
};
