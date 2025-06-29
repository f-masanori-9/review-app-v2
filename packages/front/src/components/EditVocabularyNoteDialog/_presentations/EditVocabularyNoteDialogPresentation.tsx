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
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { 
          margin: 1,
          width: 'calc(100% - 16px)',
          maxWidth: 'calc(100% - 16px)'
        }
      }}
    >
      <DialogTitle sx={{ pb: 0.5 }}>単語帳編集</DialogTitle>
      <VocabularyNoteForm vocabularyNote={vocabularyNote} />
    </Dialog>
  );
};