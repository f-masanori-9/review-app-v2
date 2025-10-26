'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

interface BackContentContextType {
  openedVocabularies: Map<string, boolean>;
  setIsBackContentOpen: (vocabularyNoteId: string, isOpen: boolean) => void;
  isBackContentOpen: (vocabularyNoteId: string) => boolean;
}

const BackContentContext = createContext<BackContentContextType | undefined>(
  undefined,
);

export const BackContentProvider = ({ children }: { children: ReactNode }) => {
  const [openedVocabularies, setOpenedVocabularies] = useState<
    Map<string, boolean>
  >(new Map());

  const setIsBackContentOpen = (vocabularyNoteId: string, isOpen: boolean) => {
    setOpenedVocabularies((prev) => {
      const next = new Map(prev);
      next.set(vocabularyNoteId, isOpen);
      return next;
    });
  };

  const isBackContentOpen = (vocabularyNoteId: string) => {
    return openedVocabularies.get(vocabularyNoteId) ?? false;
  };

  return (
    <BackContentContext.Provider
      value={{
        openedVocabularies,
        setIsBackContentOpen,
        isBackContentOpen,
      }}
    >
      {children}
    </BackContentContext.Provider>
  );
};

export const useBackContentContext = () => {
  const context = useContext(BackContentContext);
  if (!context) {
    throw new Error(
      'useBackContentContext must be used within BackContentProvider',
    );
  }
  return context;
};
