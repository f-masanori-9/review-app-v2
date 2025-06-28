import { Button } from "@/components/Buttons/Button";
import {
  AutoCompleteOption,
  CreatableAutoComplete,
} from "@/components/CreatableAutoComplete";
import { Loading } from "@/components/Loading";
import { Box, Stack } from "@mui/material";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { ActionMeta } from "react-select";
import { Virtuoso } from "react-virtuoso";
import { AddTagDialog } from "../_components/AddTagDialog/AddTagDialog";
import { OneVocabularyNote } from "../_components/OneVocabularyNote/OneVocabularyNote";
import { EditVocabularyNoteDialogCore } from "../EditVocabularyNoteDialog";
import { VocabularyNote } from "../types";

interface VocabularyNotesPresentationProps {
  isLoading: boolean;
  tags: Array<{ id: string; name: string }>;
  filteredNotes: VocabularyNote[];
  selectedVN: { id: string } | null;
  isOpenAddTagDialog: boolean;
  isLoadingAdding: boolean;
  onTagChange: (
    selected: readonly AutoCompleteOption[],
    actionMeta: ActionMeta<AutoCompleteOption>
  ) => void;
  onCreateTag: (option: AutoCompleteOption) => Promise<void>;
  onVocabularyNoteClick: ({ vnId }: { vnId: string }) => void;
  onAddNote: () => void;
  onStartPlay: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCloseDialog: () => void;
  onAddTagDialogClose: (tagName: string) => void;
}

export const VocabularyNotesPresentation: React.FC<
  VocabularyNotesPresentationProps
> = ({
  isLoading,
  tags,
  filteredNotes,
  selectedVN,
  isOpenAddTagDialog,
  isLoadingAdding,
  onTagChange,
  onCreateTag,
  onVocabularyNoteClick,
  onAddNote,
  onStartPlay,
  onCloseDialog,
  onAddTagDialogClose,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Stack spacing={1} p={1}>
      <CreatableAutoComplete
        options={tags.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }))}
        onChange={(value, actionMeta) => onTagChange(value, actionMeta)}
        placeholder="タグを選択"
        onCreateItem={onCreateTag}
      />

      <Box sx={{ height: "calc(100vh - 100px)", pb: "80px" }}>
        <Virtuoso
          style={{ height: "100%" }}
          data={filteredNotes}
          totalCount={filteredNotes.length}
          itemContent={(_, note) => (
            <OneVocabularyNote
              key={note.id}
              note={note}
              tags={note.noteToTagRelations}
              reviewCount={note.reviewLogs.length}
              onClickVN={onVocabularyNoteClick}
            />
          )}
        />
      </Box>

      <Box
        sx={{
          position: "fixed",
          zIndex: 50,
          bottom: "96px",
          left: "8px",
          cursor: "pointer",
        }}
      >
        <Button
          variant="outlined"
          onClick={onAddNote}
          title="単語帳を追加"
          isLoading={isLoadingAdding}
        />
      </Box>

      <Box
        sx={{
          position: "fixed",
          zIndex: 50,
          bottom: "96px",
          right: "8px",
          cursor: "pointer",
        }}
      >
        <Button
          variant="outlined"
          onClick={onStartPlay}
          title="開始"
          isLoading={isLoadingAdding}
          startIcon={
            <FaPlay
              style={{
                border: "none",
                borderRadius: "6px",
                marginRight: "4px",
                marginLeft: "4px",
              }}
              color="#06b6d4"
              size={14}
            />
          }
        />
      </Box>

      {selectedVN && (
        <EditVocabularyNoteDialogCore
          vocabularyNoteId={selectedVN.id}
          onClose={onCloseDialog}
        />
      )}

      <AddTagDialog onClose={onAddTagDialogClose} isOpen={isOpenAddTagDialog} />
    </Stack>
  );
};
