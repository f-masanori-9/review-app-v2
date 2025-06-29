"use client";

import { FC, useEffect, useRef, useState } from "react";
import { tRPCClient } from "@/libs/tRPCClient";
import { EditVocabularyNoteDialogPresentation } from "./_presentations/EditVocabularyNoteDialogPresentation";
import { VocabularyNote } from "./types";

export const EditVocabularyNoteDialog: FC<{
  vocabularyNoteId: string;
  onClose: () => void;
  isShowTagSelector?: boolean;
}> = ({ onClose, vocabularyNoteId }) => {
  const isFirstFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vocabularyNote, setVocabularyNote] = useState<VocabularyNote | null>(
    null
  );

  useEffect(() => {
    if (isFirstFetched.current) return;
    setIsLoading(true);
    isFirstFetched.current = true;

    tRPCClient.vocabularyNotes.getVocabularyNote
      .query({ vocabularyNoteId })
      .then(setVocabularyNote)
      .finally(() => setIsLoading(false));
  }, [vocabularyNoteId]);

  return (
    <EditVocabularyNoteDialogPresentation
      vocabularyNote={vocabularyNote}
      isLoading={isLoading}
      onClose={onClose}
    />
  );
};

export const EditVocabularyNoteDialogCore: FC<{
  vocabularyNoteId: string;
  onClose: () => void;
  isShowTagSelector?: boolean;
}> = ({ onClose, vocabularyNoteId }) => {
  const isFirstFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vocabularyNote, setVocabularyNote] = useState<VocabularyNote | null>(
    null
  );

  useEffect(() => {
    if (isFirstFetched.current) return;
    setIsLoading(true);
    isFirstFetched.current = true;

    tRPCClient.vocabularyNotes.getVocabularyNote
      .query({ vocabularyNoteId })
      .then(setVocabularyNote)
      .finally(() => setIsLoading(false));
  }, [vocabularyNoteId]);

  return (
    <EditVocabularyNoteDialogPresentation
      vocabularyNote={vocabularyNote}
      isLoading={isLoading}
      onClose={onClose}
    />
  );
};
