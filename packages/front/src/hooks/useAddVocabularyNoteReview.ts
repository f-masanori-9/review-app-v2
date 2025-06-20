import { tRPCClient } from "@/libs/tRPCClient";
import { useCallback } from "react";
import { useVocabularyNotes } from "./vocabularyNote/useVocabularyNotes";

export const useAddVocabularyNoteReview = () => {
  const { mutate } = useVocabularyNotes();

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
