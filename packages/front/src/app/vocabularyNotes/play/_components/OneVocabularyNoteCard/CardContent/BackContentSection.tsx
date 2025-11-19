'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
} from '@mui/material';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  type VirtualKeyboard = {
    overlaysContent: boolean;
    boundingRect: DOMRectReadOnly;
    addEventListener: (type: 'geometrychange', listener: () => void) => void;
    removeEventListener: (type: 'geometrychange', listener: () => void) => void;
  };

  const resolveVirtualKeyboard = (): VirtualKeyboard | undefined => {
    if ('virtualKeyboard' in navigator) {
      return (navigator as Navigator & { virtualKeyboard?: VirtualKeyboard })
        .virtualKeyboard;
    }
    return undefined;
  };

  useEffect(() => {
    // ユーザーが編集中でない場合のみ、backContentの変更を反映
    if (!isUserEditing && backContent !== localContent) {
      setLocalContent(backContent);
    }
  }, [backContent, isUserEditing, localContent]);

  useEffect(() => {
    const virtualKeyboard = resolveVirtualKeyboard();
    if (!virtualKeyboard) return;

    const handleGeometryChange = () => {
      setKeyboardOffset(
        virtualKeyboard.overlaysContent
          ? virtualKeyboard.boundingRect.height
          : 0,
      );
    };

    virtualKeyboard.addEventListener('geometrychange', handleGeometryChange);
    handleGeometryChange();

    return () => {
      virtualKeyboard.removeEventListener(
        'geometrychange',
        handleGeometryChange,
      );
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [resolveVirtualKeyboard]);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          role="button"
          tabIndex={0}
          onClick={handleOpenModal}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleOpenModal();
            }
          }}
          sx={{
            width: '100%',
            maxHeight: '48vh',
            overflowY: 'auto',
            p: 2,
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(0,0,0,0.03)',
            cursor: 'pointer',
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
          }}
        >
          {localContent.trim().length > 0
            ? localContent
            : 'まだ回答がありません。クリックして編集'}
        </Box>
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          fullScreen
          PaperProps={{
            sx: {
              height:
                keyboardOffset > 0
                  ? `calc(100vh - ${keyboardOffset}px)`
                  : '100vh',
            },
          }}
        >
          <DialogTitle>回答を編集</DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              pb: keyboardOffset > 0 ? `${keyboardOffset}px` : 0,
            }}
          >
            <TextareaAutosize
              value={localContent}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              minRows={12}
              style={{
                width: '100%',
                flex: 1,
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                fontSize: '18px',
                color: 'inherit',
                background: 'transparent',
              }}
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              color="primary"
            >
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Button
          onClick={() => setIsShowBackContent(false)}
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
        >
          回答を隠す
        </Button> */}
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
