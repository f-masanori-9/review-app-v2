'use client';

import { Box, Button, TextareaAutosize } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useUpdateVocabularyNoteDebounced } from '@/hooks/useUpdateVocabularyNoteDebounced';

interface BackContentSectionProps {
  vocabularyNoteId: string;
  backContent: string;
  isShowBackContent: boolean;
  setIsShowBackContent: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BackContentSection: React.FC<BackContentSectionProps> = ({
  vocabularyNoteId,
  backContent,
  isShowBackContent,
  setIsShowBackContent,
}) => {
  const { updateVocabularyNoteDebounced } = useUpdateVocabularyNoteDebounced({
    isMutateVocabularyNotes: false,
  });
  const [localContent, setLocalContent] = useState(backContent);
  const [isUserEditing, setIsUserEditing] = useState(false);

  useEffect(() => {
    // ユーザーが編集中でない場合のみ、backContentの変更を反映
    if (!isUserEditing && backContent !== localContent) {
      setLocalContent(backContent);
    }
  }, [backContent, isUserEditing, localContent]);

  const handleChange = (newContent: string) => {
    setLocalContent(newContent);
    setIsUserEditing(true);
    updateVocabularyNoteDebounced({
      noteId: vocabularyNoteId,
      kind: 'backContent',
      content: newContent,
    });
  };

  const handleBlur = () => {
    setIsUserEditing(false);
  };

  if (isShowBackContent) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            maxHeight: '48vh',
            overflow: 'scroll',
            width: '100%',
          }}
        >
          <TextareaAutosize
            value={localContent}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            minRows={3}
            maxRows={12}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontFamily: 'inherit',
              fontSize: '16px',
              color: 'inherit',
              background: 'transparent',
            }}
          />
        </Box>
        <Button
          onClick={() => setIsShowBackContent(false)}
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
        >
          回答を隠す
        </Button>
      </Box>
    );
  }

  return (
    <Button
      onClick={() => setIsShowBackContent(true)}
      variant="contained"
      color="primary"
      fullWidth
    >
      回答を見る
    </Button>
  );
};
