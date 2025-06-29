import { tRPCClient } from "@/libs/tRPCClient";
import { useCallback } from "react";
import { useMutateOneVocabularyNote } from "./useOneVocabularyNote";
import { useMutateVocabularyNotes } from "./useVocabularyNotes";

// TODO: ミューテートの方法を選べるようにする
export const useUpdateVocabularyNote = () => {
  const { mutateVocabularyNotesLocalOnly } = useMutateVocabularyNotes();
  const { mutateNoteVN: mutateOneNoteVN } = useMutateOneVocabularyNote();

  const updateNote = useCallback(
    async (
      args: { noteId: string } & (
        | {
            kind: "frontContent";
            content: string;
          }
        | {
            kind: "backContent";
            content: string;
          }
      )
    ) => {
      const body = (() => {
        switch (args.kind) {
          case "frontContent":
            return {
              id: args.noteId,
              kind: "frontContent",
              frontContent: args.content,
            } as const;
          case "backContent":
            return {
              id: args.noteId,
              kind: "backContent",
              backContent: args.content,
            } as const;
        }
      })();
      await tRPCClient.vocabularyNotes.updateVocabularyNote.mutate({
        ...body,
      });

      await mutateVocabularyNotesLocalOnly({
        id: body.id,
        frontContent: body.frontContent,
        backContent: body.backContent,
      });
      await mutateOneNoteVN(body.id);
    },
    [mutateOneNoteVN, mutateVocabularyNotesLocalOnly]
  );

  return { updateNote };
};
