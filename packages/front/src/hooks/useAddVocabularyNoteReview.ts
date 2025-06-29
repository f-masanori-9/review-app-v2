import { useMutateVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { tRPCClient } from "@/libs/tRPCClient";
import { useCallback } from "react";

export const useAddVocabularyNoteReview = () => {
  const { mutate } = useMutateVocabularyNotes();

  const addVocabularyNoteReview = useCallback(
    async (noteId: string) => {
      await tRPCClient.vocabularyNotes.reviewLog.createReadLog.mutate({
        vocabularyNoteId: noteId,
      });

      mutate();
    },
    [mutate]
  );

  return { addVocabularyNoteReview };
};
