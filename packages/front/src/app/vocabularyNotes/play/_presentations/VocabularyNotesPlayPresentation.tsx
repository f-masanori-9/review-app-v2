'use client';

import { Box, Stack } from '@mui/material';
import type { ActionMeta } from 'react-select';
import { Virtuoso } from 'react-virtuoso';
import type { AutoCompleteOption } from '@/components/CreatableAutoComplete';
import { CreatableAutoComplete } from '@/components/CreatableAutoComplete';
import { OneVocabularyNoteCard } from '../_components/OneVocabularyNoteCard/OneVocabularyNoteCard';

type VocabularyNote = {
  id: string;
  frontContent: string;
  backContent: string;
  reviewLogs: unknown[];
  noteToTagRelations: { tagId: string }[];
};

interface VocabularyNoteListProps {
  viewedVocabularyNoteIds: string[];
}

const VocabularyNoteList = ({
  viewedVocabularyNoteIds,
}: VocabularyNoteListProps) => {
  return (
    <Virtuoso
      style={{
        width: '100vw',
        overflowX: 'scroll',
        height: 'calc(100vh - 180px)',
        scrollSnapType: 'x mandatory',
        overflowY: 'hidden',
      }}
      overscan={4}
      data={viewedVocabularyNoteIds}
      horizontalDirection
      totalCount={viewedVocabularyNoteIds.length}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Item: ({ item: _, ...p }) => (
          <div
            {...p}
            style={{
              display: 'inline-block',
              overflowAnchor: 'none',
              height: 'calc(100vh - 180px)',
              width: '100vw',
            }}
          >
            {p.children}
          </div>
        ),
      }}
      itemContent={(index, vocabularyNoteId) => (
        <VocabularyNoteCardWrapper
          key={vocabularyNoteId}
          vocabularyNoteId={vocabularyNoteId}
          index={index}
          allCardsCount={viewedVocabularyNoteIds.length}
        />
      )}
    />
  );
};

interface VocabularyNoteCardWrapperProps {
  vocabularyNoteId: string;
  index: number;
  allCardsCount: number;
}

const VocabularyNoteCardWrapper = ({
  vocabularyNoteId,
  index,
  allCardsCount,
}: VocabularyNoteCardWrapperProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <OneVocabularyNoteCard
        vocabularyNoteId={vocabularyNoteId}
        allCardsCount={allCardsCount}
        cardOrder={index + 1}
      />
    </Box>
  );
};

interface VocabularyNotesPlayPresentationProps {
  viewedVocabularyNoteIds: string[];
  selectedTagIds: string[];
  tags: Array<{ id: string; name: string }>;
  onTagChange: (
    selected: readonly AutoCompleteOption[],
    actionMeta: ActionMeta<AutoCompleteOption>,
  ) => void;
  onCreateTag: (option: AutoCompleteOption) => Promise<void>;
}

export const VocabularyNotesPlayPresentation = ({
  viewedVocabularyNoteIds,
  selectedTagIds,
  tags,
  onTagChange,
  onCreateTag,
}: VocabularyNotesPlayPresentationProps) => {
  return (
    <Stack spacing={1}>
      <Box p={1}>
        <CreatableAutoComplete
          options={tags.map((tag) => ({
            value: tag.id,
            label: tag.name,
          }))}
          onChange={onTagChange}
          placeholder="タグを選択"
          onCreateItem={onCreateTag}
          defaultValueIds={selectedTagIds}
        />
      </Box>
      <Box>
        <VocabularyNoteList viewedVocabularyNoteIds={viewedVocabularyNoteIds} />
      </Box>
    </Stack>
  );
};

export type { VocabularyNote };
