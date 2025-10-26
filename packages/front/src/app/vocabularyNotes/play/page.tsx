'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import type { AutoCompleteOption } from '@/components/CreatableAutoComplete';
import { Loading } from '@/components/Loading';
import { useCreateTag } from '@/hooks/tag/useCreateTag';
import { useTags } from '@/hooks/tag/useTags';
import { useVocabularyNotesSWRImmutable } from '@/hooks/vocabularyNote/useVocabularyNotes';

import {
  type VocabularyNote,
  VocabularyNotesPlayPresentation,
} from './_presentations/VocabularyNotesPlayPresentation';
import { BackContentProvider } from './context/BackContentContext';

const useFilteredVocabularyNotes = (
  vocabularyNotes: VocabularyNote[],
  tagIds: string[],
) => {
  return useMemo(() => {
    return vocabularyNotes.filter((note) => {
      if (tagIds.length === 0) return true;
      return note.noteToTagRelations.some((relation) =>
        tagIds.includes(relation.tagId),
      );
    });
  }, [vocabularyNotes, tagIds]);
};

const Page = () => {
  // TODO: noteのIdの配列のみを取得するようにする
  const { data: vocabularyNotes = [], isLoading } =
    useVocabularyNotesSWRImmutable();

  const { data: tags = [] } = useTags();
  const { createTagWithId } = useCreateTag();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tagIds = searchParams.getAll('tagIds');
  const viewedVocabularyNotes = useFilteredVocabularyNotes(
    vocabularyNotes,
    tagIds,
  );
  const viewedVocabularyNoteIds = useMemo(() => {
    return viewedVocabularyNotes.map((note) => note.id);
  }, [viewedVocabularyNotes]);
  const handleTagChange = useCallback(
    (selected: readonly AutoCompleteOption[]) => {
      const queryParams = new URLSearchParams();
      selected.forEach((s) => queryParams.append('tagIds', s.value));
      router.push(`/vocabularyNotes/play?${queryParams.toString()}`);
    },
    [router],
  );

  const handleCreateTag = useCallback(
    async (option: AutoCompleteOption) => {
      createTagWithId({
        tagId: option.value,
        tagName: option.label,
      });
    },
    [createTagWithId],
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BackContentProvider>
      <VocabularyNotesPlayPresentation
        viewedVocabularyNoteIds={viewedVocabularyNoteIds}
        selectedTagIds={tagIds}
        tags={tags}
        onTagChange={handleTagChange}
        onCreateTag={handleCreateTag}
      />
    </BackContentProvider>
  );
};

export default Page;
