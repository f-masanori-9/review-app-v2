import { tRPCClient } from "@/libs/tRPCClient";
import { useCallback, useState } from "react";
import { useMutateVocabularyNotes } from "./useVocabularyNotes";

export const useAddVocabularyNote = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: mutateVocabularyNotes } = useMutateVocabularyNotes();
  const addVocabularyNote = useCallback(
    async ({ tagIds }: { tagIds?: string[] }) => {
      try {
        setIsLoading(true);
        const vocabularyNote =
          await tRPCClient.vocabularyNotes.createVocabularyNote.mutate({
            noteId: crypto.randomUUID(),
            frontContent: "未入力",
            backContent: "🥚",
            relatedTagIds: tagIds,
          });

        await mutateVocabularyNotes();

        return vocabularyNote;
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [mutateVocabularyNotes]
  );

  return { addVocabularyNote, isLoading };
};
