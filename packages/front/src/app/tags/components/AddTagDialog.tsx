"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { AddTagDialogPresenterProps } from "../types/tag";

const AddTagDialogPresenter: FC<AddTagDialogPresenterProps> = ({
  isOpen,
  content,
  onContentChange,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
          margin: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.25rem",
        }}
      >
        新しいタグを追加
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            fullWidth
            autoFocus
            label="タグ名"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              onClick={onClose}
              sx={{
                textTransform: "none",
                fontWeight: "medium",
              }}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={!content.trim()}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 2,
              }}
            >
              追加
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export const AddTagDialog: FC<{
  isOpen: boolean;
  onClose: (tagName?: string) => void;
}> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState("");

  const handleClose = () => {
    onClose();
    setContent("");
  };

  const handleSubmit = () => {
    if (content.trim()) {
      onClose(content.trim());
      setContent("");
    }
  };

  return (
    <AddTagDialogPresenter
      isOpen={isOpen}
      content={content}
      onContentChange={setContent}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};