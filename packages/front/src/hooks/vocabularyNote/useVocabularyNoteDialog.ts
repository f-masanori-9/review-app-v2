import { useState } from 'react';

export const useVocabularyNoteDialog = () => {
  const [selectedVN, setSelectedVN] = useState<{
    id: string;
  } | null>(null);

  const openDialog = (vnId: string) => {
    setSelectedVN({ id: vnId });
  };

  const closeDialog = () => {
    setSelectedVN(null);
  };

  return {
    selectedVN,
    openDialog,
    closeDialog,
  };
};
