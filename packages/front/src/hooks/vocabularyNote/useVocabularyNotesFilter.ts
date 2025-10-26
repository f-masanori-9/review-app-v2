import { intersection } from 'lodash';
import { useMemo, useState } from 'react';
import type { VocabularyNote } from '@/app/vocabularyNotes/types';

export const useVocabularyNotesFilter = (vocabularyNotes: VocabularyNote[]) => {
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const filteredNotes = useMemo(() => {
    return vocabularyNotes.filter((note) => {
      if (!selectedTagIds.length) return true;
      const noteTagsIds = note.noteToTagRelations.map((d) => d.tagId);
      return intersection(selectedTagIds, noteTagsIds).length > 0;
    });
  }, [selectedTagIds, vocabularyNotes]);

  return {
    selectedTagIds,
    setSelectedTagIds,
    filteredNotes,
  };
};
