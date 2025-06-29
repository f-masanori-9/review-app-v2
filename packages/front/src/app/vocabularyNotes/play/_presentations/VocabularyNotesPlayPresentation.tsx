"use client";

import { EditVocabularyNoteDialog } from "@/components/EditVocabularyNoteDialog";
import { Box } from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import { OneVocabularyNoteCard } from "../_components/OneVocabularyNoteCard/OneVocabularyNoteCard";

type VocabularyNote = {
  id: string;
  frontContent: string;
  backContent: string;
  reviewLogs: unknown[];
  noteToTagRelations: { tagId: string }[];
};

interface VocabularyNoteListProps {
  viewedVocabularyNotes: VocabularyNote[];
  isShowBackContent: boolean;
  setIsShowBackContent: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: (id: string) => void;
}

const VocabularyNoteList = ({
  viewedVocabularyNotes,
  isShowBackContent,
  setIsShowBackContent,
  onEdit,
}: VocabularyNoteListProps) => {
  return (
    <Virtuoso
      style={{
        width: "100vw",
        overflowX: "scroll",
        height: "calc(100vh - 100px)",
        scrollSnapType: "x mandatory",
        overflowY: "hidden",
      }}
      overscan={2}
      data={viewedVocabularyNotes}
      horizontalDirection
      totalCount={viewedVocabularyNotes.length}
      itemContent={(index, n) => (
        <VocabularyNoteCardWrapper
          key={n.id}
          note={n}
          index={index}
          isShowBackContent={isShowBackContent}
          setIsShowBackContent={setIsShowBackContent}
          allCardsCount={viewedVocabularyNotes.length}
          onEdit={onEdit}
        />
      )}
    />
  );
};

interface VocabularyNoteCardWrapperProps {
  note: VocabularyNote;
  index: number;
  isShowBackContent: boolean;
  setIsShowBackContent: React.Dispatch<React.SetStateAction<boolean>>;
  allCardsCount: number;
  onEdit: (id: string) => void;
}

const VocabularyNoteCardWrapper = ({
  note,
  index,
  isShowBackContent,
  setIsShowBackContent,
  allCardsCount,
  onEdit,
}: VocabularyNoteCardWrapperProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
      }}
    >
      <OneVocabularyNoteCard
        vocabularyNoteId={note.id}
        frontContent={note.frontContent}
        backContent={note.backContent}
        reviewCount={note.reviewLogs.length}
        isShowBackContent={isShowBackContent}
        setIsShowBackContent={setIsShowBackContent}
        allCardsCount={allCardsCount}
        cardOrder={index + 1}
        onEdit={() => onEdit(note.id)}
      />
    </Box>
  );
};

interface EditDialogProps {
  selectedVN: { id: string } | null;
  onClose: () => void;
}

const EditDialog = ({ selectedVN, onClose }: EditDialogProps) => {
  if (!selectedVN) return null;

  return (
    <EditVocabularyNoteDialog
      vocabularyNoteId={selectedVN.id}
      onClose={onClose}
    />
  );
};

interface VocabularyNotesPlayPresentationProps {
  viewedVocabularyNotes: VocabularyNote[];
  isShowBackContent: boolean;
  setIsShowBackContent: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVN: { id: string } | null;
  onEdit: (id: string) => void;
  onCloseEdit: () => void;
}

export const VocabularyNotesPlayPresentation = ({
  viewedVocabularyNotes,
  isShowBackContent,
  setIsShowBackContent,
  selectedVN,
  onEdit,
  onCloseEdit,
}: VocabularyNotesPlayPresentationProps) => {
  return (
    <Box>
      <VocabularyNoteList
        viewedVocabularyNotes={viewedVocabularyNotes}
        isShowBackContent={isShowBackContent}
        setIsShowBackContent={setIsShowBackContent}
        onEdit={onEdit}
      />
      {selectedVN && (
        <EditDialog selectedVN={selectedVN} onClose={onCloseEdit} />
      )}
    </Box>
  );
};

export type { VocabularyNote };
