import { tRPCClient } from "@/libs/tRPCClient";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

type NoteToTagRelation = {
  readonly id: string;
  readonly tagId: string;
  readonly tagName: string;
  readonly createdAt: Date;
};
export const generateSWRKey = (arg: { noteId: string }) => {
  return {
    path: "useNoteToTagRelations",
    query: {
      noteId: arg.noteId,
    },
  } as const;
};

export const useNoteToTagRelations = ({ noteId }: { noteId: string }) => {
  return useSWR<NoteToTagRelation[]>(generateSWRKey({ noteId }), async () => {
    const tagRelations =
      await tRPCClient.noteToTagRelations.getNoteToTagRelations.query({
        vocabularyNoteId: noteId,
      });

    return tagRelations;
  });
};

export const useMutateNoteToTagRelations = () => {
  const mutateNoteToTagRelations = useCallback(
    async ({ noteId }: { noteId: string }) => {
      await mutate<NoteToTagRelation>(generateSWRKey({ noteId }));
    },
    []
  );

  return { mutateNoteToTagRelations };
};
