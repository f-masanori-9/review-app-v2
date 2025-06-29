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
  onEdit: (id: string) => void;
}

const VocabularyNoteList = ({
  viewedVocabularyNotes,
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
      overscan={4}
      data={viewedVocabularyNotes}
      horizontalDirection
      totalCount={viewedVocabularyNotes.length}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Item: ({ item: _, ...p }) => (
          <div
            {...p}
            style={{
              display: "inline-block",
              overflowAnchor: "none",
              height: "calc(100vh - 100px)",
              width: "100vw",
            }}
          >
            {p.children}
          </div>
        ),
      }}
      itemContent={(index, n) => (
        <VocabularyNoteCardWrapper
          key={n.id}
          note={n}
          index={index}
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
  allCardsCount: number;
  onEdit: (id: string) => void;
}

const VocabularyNoteCardWrapper = ({
  note,
  index,
  allCardsCount,
  onEdit,
}: VocabularyNoteCardWrapperProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <OneVocabularyNoteCard
        vocabularyNoteId={note.id}
        frontContent={note.frontContent}
        backContent={note.backContent}
        reviewCount={note.reviewLogs.length}
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
  selectedVN: { id: string } | null;
  onEdit: (id: string) => void;
  onCloseEdit: () => void;
}

export const VocabularyNotesPlayPresentation = ({
  viewedVocabularyNotes,
  selectedVN,
  onEdit,
  onCloseEdit,
}: VocabularyNotesPlayPresentationProps) => {
  return (
    <Box>
      <VocabularyNoteList
        viewedVocabularyNotes={viewedVocabularyNotes}
        onEdit={onEdit}
      />
      {selectedVN && (
        <EditDialog selectedVN={selectedVN} onClose={onCloseEdit} />
      )}
    </Box>
  );
};

export type { VocabularyNote };
