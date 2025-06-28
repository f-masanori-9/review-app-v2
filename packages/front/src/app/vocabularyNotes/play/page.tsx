"use client";

import { Loading } from "@/components/Loading";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import { Virtuoso } from "react-virtuoso";
import { OneVocabularyNoteCard } from "./_components/OneVocabularyNoteCard/OneVocabularyNoteCard";

export default function Page() {
  const { data: vocabularyNotes = [], isLoading } = useVocabularyNotes();
  const searchParams = useSearchParams();
  const tagIds = searchParams.getAll("tagIds");
  const viewedVocabularyNotes = vocabularyNotes.filter((note) => {
    if (tagIds.length === 0) return true;
    return note.noteToTagRelations.some((relation) =>
      tagIds.includes(relation.tagId)
    );
  });

  const wordCardsAreaRef = React.useRef<HTMLDivElement>(null);

  // スクロールの処理をdebounceでラップ
  const handleScroll = useMemo(
    () =>
      debounce(() => {
        if (wordCardsAreaRef.current) {
        }
      }, 200),
    []
  );

  useEffect(() => {
    const element = wordCardsAreaRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
      handleScroll.cancel(); // debounceのキャンセル
    };
  }, [handleScroll]);

  const scrollToNextCard = useCallback(() => {
    if (wordCardsAreaRef.current) {
      const currentScrollLeft = wordCardsAreaRef.current.scrollLeft;
      const cardWidth = window.innerWidth;
      wordCardsAreaRef.current.scrollTo({
        left: currentScrollLeft + cardWidth,
        behavior: "smooth",
      });
    }
  }, []);
  const [isShowBackContent, setIsShowBackContent] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        ref={wordCardsAreaRef}
        className="w-screen overflow-x-scroll h-[calc(100vh-100px)] snap-x snap-mandatory"
      >
        <Virtuoso
          style={{ height: "100%" }}
          className="w-screen overflow-x-scroll h-[calc(100vh-100px)] snap-x snap-mandatory"
          data={viewedVocabularyNotes}
          horizontalDirection
          itemContent={(index, n) => (
            <OneVocabularyNoteCard
              key={n.id}
              vocabularyNoteId={n.id}
              frontContent={n.frontContent}
              backContent={n.backContent}
              reviewCount={n.reviewLogs.length}
              isShowBackContent={isShowBackContent}
              setIsShowBackContent={setIsShowBackContent}
              allCardsCount={viewedVocabularyNotes.length}
              cardOrder={index + 1}
            />
          )}
        />
      </div>
      <div
        className="fixed z-50 bottom-24 left-2  cursor-pointer"
        onClick={scrollToNextCard}
      >
        次へ
      </div>
    </div>
  );
}
