"use client";

import { Box, DialogContent } from "@mui/material";
import { useState } from "react";

import { useNoteToTagRelations } from "@/hooks/noteToTagRelation/useNoteToTagRelations";
import { useUpdateVocabularyNoteDebounced } from "@/hooks/useUpdateVocabularyNoteDebounced";
import { ContentField } from "./ContentField";
import { TagSelector } from "./TagSelector";
import { VocabularyNote } from "../types";

interface VocabularyNoteFormProps {
  vocabularyNote: VocabularyNote;
}

export function VocabularyNoteForm({
  vocabularyNote,
}: VocabularyNoteFormProps) {
  const { updateVocabularyNoteDebounced } = useUpdateVocabularyNoteDebounced();
  const { isLoading: isLoadingNoteToTagRelations } = useNoteToTagRelations({
    noteId: vocabularyNote.id,
  });

  const [content, setContent] = useState({
    frontContent: vocabularyNote?.frontContent || "",
    backContent: vocabularyNote?.backContent || "",
  });

  const handleContentChange = (
    kind: "frontContent" | "backContent",
    newContent: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [kind]: newContent,
    }));
    updateVocabularyNoteDebounced({
      noteId: vocabularyNote.id,
      kind,
      content: newContent,
    });
  };

  return (
    <DialogContent sx={{ p: 0.5 }}>
      <Box sx={{ height: "40px", mb: 0.5 }}>
        <TagSelector
          vocabularyNote={vocabularyNote}
          isLoading={isLoadingNoteToTagRelations}
        />
      </Box>
      <ContentField
        value={content.frontContent}
        onChange={(value) => handleContentChange("frontContent", value)}
        placeholder="表面"
        rows={2}
      />
      <ContentField
        value={content.backContent}
        onChange={(value) => handleContentChange("backContent", value)}
        placeholder="裏面"
        rows={5}
      />
    </DialogContent>
  );
}
