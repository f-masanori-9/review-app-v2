'use client';

import { debounce } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useUpdateVocabularyNote } from './vocabularyNote/useUpdateVocabularyNote';

export const useUpdateVocabularyNoteDebounced = (options?: {
  isMutateVocabularyNotes?: boolean;
}) => {
  const { updateNote } = useUpdateVocabularyNote(options);

  const updateVocabularyNoteDebounced = useMemo(() => {
    return debounce(updateNote, 1000, {
      maxWait: 2000,
    });
  }, [updateNote]);

  useEffect(() => {
    return () => {
      if (updateVocabularyNoteDebounced.flush) {
        updateVocabularyNoteDebounced.flush();
      }
      updateVocabularyNoteDebounced.cancel();
    };
  }, [updateVocabularyNoteDebounced]);

  return { updateVocabularyNoteDebounced };
};
