"use client";

import { AutoCompleteOption } from "@/components/CreatableAutoComplete";
import { useAddTagDialog } from "@/hooks/tag/useAddTagDialog";
import { useCreateTag } from "@/hooks/tag/useCreateTag";
import { useMutateTags, useTags } from "@/hooks/tag/useTags";
import { useAddVocabularyNote } from "@/hooks/vocabularyNote/useAddVocabularyNote";
import { useVocabularyNoteDialog } from "@/hooks/vocabularyNote/useVocabularyNoteDialog";
import { useVocabularyNotesSWRImmutable } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { useVocabularyNotesFilter } from "@/hooks/vocabularyNote/useVocabularyNotesFilter";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { VocabularyNotesPresentation } from "../_presentations/VocabularyNotesPresentation";

export const VocabularyNotesContainer = () => {
  const { data: vocabularyNotes = [], isLoading } =
    useVocabularyNotesSWRImmutable();
  const router = useRouter();
  const { addVocabularyNote, isLoading: isLoadingAdding } =
    useAddVocabularyNote();

  const { data: tags = [] } = useTags();
  const { createTag, createTagWithId } = useCreateTag();
  const { mutateTags } = useMutateTags();

  const { selectedTagIds, setSelectedTagIds, filteredNotes } =
    useVocabularyNotesFilter(vocabularyNotes);
  const { selectedVN, openDialog, closeDialog } = useVocabularyNoteDialog();
  const {
    isOpen: isOpenAddTagDialog,

    closeDialog: closeAddTagDialog,
  } = useAddTagDialog();

  const onClickStartPlayVocabularyNote = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      const queryParams = new URLSearchParams();
      selectedTagIds.forEach((id) => queryParams.append("tagIds", id));
      router.push(`/vocabularyNotes/play?${queryParams.toString()}`);
    },
    [router, selectedTagIds]
  );

  const onClickAddNote = useCallback(async () => {
    const note = await addVocabularyNote({
      tagIds: selectedTagIds,
    });
    if (note) {
      openDialog(note.id);
    }
  }, [addVocabularyNote, selectedTagIds, openDialog]);

  const handleTagChange = useCallback(
    (selected: readonly AutoCompleteOption[]) => {
      setSelectedTagIds(selected.map((s) => s.value));
    },
    [setSelectedTagIds]
  );

  const handleCreateTag = useCallback(
    async (option: AutoCompleteOption) => {
      createTagWithId({
        tagId: option.value,
        tagName: option.label,
      }).then(() => {
        mutateTags();
      });
    },
    [createTagWithId, mutateTags]
  );

  const handleVocabularyNoteClick = useCallback(
    ({ vnId }: { vnId: string }) => {
      openDialog(vnId);
    },
    [openDialog]
  );

  const handleAddTagDialogClose = useCallback(
    (tagName: string) => {
      closeAddTagDialog();
      if (!tagName) return;
      createTag({ tagName });
    },
    [closeAddTagDialog, createTag]
  );

  return (
    <VocabularyNotesPresentation
      isLoading={isLoading}
      tags={tags}
      filteredNotes={filteredNotes}
      selectedVN={selectedVN}
      isOpenAddTagDialog={isOpenAddTagDialog}
      isLoadingAdding={isLoadingAdding}
      onTagChange={handleTagChange}
      onCreateTag={handleCreateTag}
      onVocabularyNoteClick={handleVocabularyNoteClick}
      onAddNote={onClickAddNote}
      onStartPlay={onClickStartPlayVocabularyNote}
      onCloseDialog={closeDialog}
      onAddTagDialogClose={handleAddTagDialogClose}
    />
  );
};
