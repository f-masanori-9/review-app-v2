"use client";

import { Loading } from "@/components/Loading";
import { useMemo, useState } from "react";

import { useVocabularyNotesSWRImmutable } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { useSearchParams } from "next/navigation";

import {
  VocabularyNotesPlayPresentation,
  type VocabularyNote,
} from "./_presentations/VocabularyNotesPlayPresentation";

const useFilteredVocabularyNotes = (
  vocabularyNotes: VocabularyNote[],
  tagIds: string[]
) => {
  return useMemo(() => {
    return vocabularyNotes.filter((note) => {
      if (tagIds.length === 0) return true;
      return note.noteToTagRelations.some((relation) =>
        tagIds.includes(relation.tagId)
      );
    });
  }, [vocabularyNotes, tagIds]);
};

const Page = () => {
  const { data: vocabularyNotes = [], isLoading } =
    useVocabularyNotesSWRImmutable();
  const searchParams = useSearchParams();
  const tagIds = searchParams.getAll("tagIds");
  const viewedVocabularyNotes = useFilteredVocabularyNotes(
    vocabularyNotes,
    tagIds
  );

  const [isShowBackContent, setIsShowBackContent] = useState(false);
  const [selectedVN, setSelectedVN] = useState<{ id: string } | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VocabularyNotesPlayPresentation
      viewedVocabularyNotes={viewedVocabularyNotes}
      isShowBackContent={isShowBackContent}
      setIsShowBackContent={setIsShowBackContent}
      selectedVN={selectedVN}
      onEdit={(id) => setSelectedVN({ id })}
      onCloseEdit={() => setSelectedVN(null)}
    />
  );
};

export default Page;
