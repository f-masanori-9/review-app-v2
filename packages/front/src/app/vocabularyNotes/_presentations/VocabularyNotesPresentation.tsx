import { Box, Stack } from '@mui/material';
import type React from 'react';
import { FaPlay, FaPlus } from 'react-icons/fa';
import type { ActionMeta } from 'react-select';
import { Virtuoso } from 'react-virtuoso';
import { Button } from '@/components/Buttons/Button';
import {
  type AutoCompleteOption,
  CreatableAutoComplete,
} from '@/components/CreatableAutoComplete';
import { EditVocabularyNoteDialog } from '@/components/EditVocabularyNoteDialog';
import { Loading } from '@/components/Loading';
import { AddTagDialog } from '../_components/AddTagDialog/AddTagDialog';
import { OneVocabularyNote } from '../_components/OneVocabularyNote/OneVocabularyNote';
import type { VocabularyNote } from '../types';

interface VocabularyNotesPresentationProps {
  isLoading: boolean;
  tags: Array<{ id: string; name: string }>;
  filteredNotes: VocabularyNote[];
  selectedVN: { id: string } | null;
  isOpenAddTagDialog: boolean;
  isLoadingAdding: boolean;
  onTagChange: (
    selected: readonly AutoCompleteOption[],
    actionMeta: ActionMeta<AutoCompleteOption>,
  ) => void;
  onCreateTag: (option: AutoCompleteOption) => Promise<void>;
  onVocabularyNoteClick: ({ vnId }: { vnId: string }) => void;
  onAddNote: () => void;
  onStartPlay: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCloseDialog: () => void;
  onAddTagDialogClose: (tagName: string) => void;
}

const StartButton: React.FC<{
  onStartPlay: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoadingAdding: boolean;
}> = ({ onStartPlay, isLoadingAdding }) => (
  <Box
    sx={{
      position: 'fixed',
      zIndex: 50,
      bottom: '96px',
      right: '8px',
      cursor: 'pointer',
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
            border: 'none',
            borderRadius: '6px',
            marginRight: '4px',
            marginLeft: '4px',
          }}
          color="#06b6d4"
          size={14}
        />
      }
    />
  </Box>
);

const AddNoteButton: React.FC<{
  onAddNote: () => void;
  isLoadingAdding: boolean;
}> = ({ onAddNote, isLoadingAdding }) => (
  <Box
    sx={{
      position: 'fixed',
      zIndex: 50,
      bottom: '96px',
      left: '8px',
      cursor: 'pointer',
    }}
  >
    <Button
      variant="outlined"
      onClick={onAddNote}
      title="単語帳を追加"
      isLoading={isLoadingAdding}
      startIcon={
        <FaPlus
          style={{
            border: 'none',
            borderRadius: '6px',
            marginRight: '4px',
            marginLeft: '4px',
          }}
          color="#06b6d4"
          size={14}
        />
      }
    />
  </Box>
);

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

      <Box sx={{ height: 'calc(100vh - 60px )', pb: '180px' }}>
        <Virtuoso
          style={{ height: '100%' }}
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

      <AddNoteButton onAddNote={onAddNote} isLoadingAdding={isLoadingAdding} />

      <StartButton
        onStartPlay={onStartPlay}
        isLoadingAdding={isLoadingAdding}
      />

      {selectedVN && (
        <EditVocabularyNoteDialog
          vocabularyNoteId={selectedVN.id}
          onClose={onCloseDialog}
        />
      )}

      <AddTagDialog onClose={onAddTagDialogClose} isOpen={isOpenAddTagDialog} />
    </Stack>
  );
};
