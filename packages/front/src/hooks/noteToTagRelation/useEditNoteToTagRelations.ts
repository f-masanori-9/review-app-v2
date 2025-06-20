import { tRPCClient } from "@/libs/tRPCClient";
import { useCallback } from "react";

export const generateSWRKey = (arg: { noteId: string }) => {
  return {
    path: "useNoteToTagRelations",
    query: {
      noteId: arg.noteId,
    },
  } as const;
};

export const editNoteToTagRelations = async ({
  noteId,
  tagIds,
}: {
  noteId: string;
  tagIds: string[];
}) => {
  await tRPCClient.noteToTagRelations.editNoteToTagRelation.mutate({
    noteId: noteId,
    tagIds: tagIds,
  });
};

export const useEditNoteToTagRelations = () => {
  const editNoteToTagRelations_ = useCallback(editNoteToTagRelations, []);

  return { editNoteToTagRelations: editNoteToTagRelations_ };
};
