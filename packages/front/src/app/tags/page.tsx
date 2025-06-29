"use client";

import { Loading } from "@/components/Loading";
import { useCreateTag } from "@/hooks/tag/useCreateTag";
import { useDeleteTag } from "@/hooks/tag/useDeleteTag";
import { useTags } from "@/hooks/tag/useTags";
import {
  Box,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Fab,
  Button,
} from "@mui/material";
import { FC, useState } from "react";

export default function Page() {
  const { data: tags = [], isLoading } = useTags();
  const [isOpenAddTagDialog, setIsOpenAddTagDialog] = useState(false);
  const { createTag } = useCreateTag();
  const { deleteTag } = useDeleteTag();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        p: 0.5,
        position: "relative",
        overflow: "hidden",
        height: "calc(100vh - 40px)",
      }}
    >
      <Fab
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
        }}
        onClick={() => setIsOpenAddTagDialog(true)}
        size="small"
        variant="extended"
      >
        タグを追加
      </Fab>
      <List>
        {tags.map((tag) => (
          <ListItem
            key={tag.id}
            sx={{
              py: 1,
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                mr: 1,
                width: "112px",
              }}
            >
              {tag.name}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteTag({ tagId: tag.id })}
              title="削除"
              sx={{
                ml: 1,
                width: "80px",
              }}
            >
              削除
            </Button>
          </ListItem>
        ))}
      </List>
      <AddTagDialog
        isOpen={isOpenAddTagDialog}
        onClose={(tagName) => {
          setIsOpenAddTagDialog(false);
          if (!tagName) return;
          createTag({ tagName });
        }}
      />
    </Box>
  );
}

const AddTagDialog: FC<{
  isOpen: boolean;
  onClose: (inputName: string) => void;
}> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState("");

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose(content);
        setContent("");
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>タグ追加</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="タグ名"
          sx={{ mt: 1 }}
        />
      </DialogContent>
    </Dialog>
  );
};
