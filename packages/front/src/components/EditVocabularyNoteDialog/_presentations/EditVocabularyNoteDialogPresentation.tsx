import { Loading } from "@/components/Loading";
import { Dialog, DialogTitle } from "@mui/material";
import { FC } from "react";
import { VocabularyNoteForm } from "../_components/VocabularyNoteForm";
import { VocabularyNote } from "../types";

interface EditVocabularyNoteDialogPresentationProps {
  vocabularyNote: VocabularyNote | null;
  isLoading: boolean;
  onClose: () => void;
}

export const EditVocabularyNoteDialogPresentation: FC<
  EditVocabularyNoteDialogPresentationProps
> = ({ vocabularyNote, isLoading, onClose }) => {
  if (isLoading || !vocabularyNote) return <Loading />;

  const isOpen = !!vocabularyNote;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>単語帳編集</DialogTitle>
      <VocabularyNoteForm vocabularyNote={vocabularyNote} />
    </Dialog>
  );
};