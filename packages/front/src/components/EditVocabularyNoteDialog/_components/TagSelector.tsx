"use client";

import { CreatableAutoComplete } from "@/components/CreatableAutoComplete";
import { Loading } from "@/components/Loading";
import { useEditNoteToTagRelations } from "@/hooks/noteToTagRelation/useEditNoteToTagRelations";
import {
  useMutateNoteToTagRelations,
  useNoteToTagRelations,
} from "@/hooks/noteToTagRelation/useNoteToTagRelations";
import { useCreateTag } from "@/hooks/tag/useCreateTag";
import { useMutateTags, useTags } from "@/hooks/tag/useTags";
import { useMutateVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { VocabularyNote } from "../types";

interface TagSelectorProps {
  vocabularyNote: VocabularyNote;
  isLoading: boolean;
}

export function TagSelector({ vocabularyNote, isLoading }: TagSelectorProps) {
  const { data: tags = [] } = useTags();
  const { data: noteToTagsRelations = [] } = useNoteToTagRelations({
    noteId: vocabularyNote.id,
  });
  const { mutateNoteToTagRelations } = useMutateNoteToTagRelations();
  const { mutateTags } = useMutateTags();
  const { mutate: mutateVocabularyNotes } = useMutateVocabularyNotes();
  const { editNoteToTagRelations } = useEditNoteToTagRelations();
  const { createTagWithId } = useCreateTag();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <CreatableAutoComplete
      onCreateItem={async (item) => {
        createTagWithId({
          tagId: item.value,
          tagName: item.label,
        }).then(() => {
          mutateTags();
        });
      }}
      defaultValueIds={noteToTagsRelations.map((r) => r.tagId)}
      onChange={(e) => {
        editNoteToTagRelations({
          noteId: vocabularyNote.id,
          tagIds: e.map((v) => v.value),
        }).then(() => {
          mutateNoteToTagRelations({
            noteId: vocabularyNote.id,
          });
          mutateVocabularyNotes();
        });
      }}
      options={tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      }))}
      placeholder="タグを選択"
    />
  );
}
