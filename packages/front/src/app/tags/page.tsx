"use client";

import { Loading } from "@/components/Loading";
import { useCreateTag } from "@/hooks/tag/useCreateTag";
import { useDeleteTag } from "@/hooks/tag/useDeleteTag";
import { useTags } from "@/hooks/tag/useTags";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

interface Tag {
  id: string;
  name: string;
}

interface TagsPresenterProps {
  tags: Tag[];
  isLoading: boolean;
  onAddTag: () => void;
  onDeleteTag: (tagId: string) => void;
}

interface AddTagDialogPresenterProps {
  isOpen: boolean;
  content: string;
  onContentChange: (content: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const TagsPresenter: FC<TagsPresenterProps> = ({
  tags,
  isLoading,
  onAddTag,
  onDeleteTag,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        overflow: "auto",
        p: 1,
        bgcolor: "background.default",
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            タグ管理
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddTag}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            新しいタグを追加
          </Button>
        </Box>

        {tags.length === 0 ? (
          <Card
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "grey.50",
              border: "2px dashed",
              borderColor: "grey.300",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                タグがありません
              </Typography>
              <Typography variant="body2" color="text.secondary">
                「新しいタグを追加」ボタンから最初のタグを作成しましょう
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Stack spacing={1} pb={"100px"}>
            {tags.map((tag) => (
              <Card
                key={tag.id}
                variant="outlined"
                sx={{
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: 2,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                    "&:last-child": { pb: 1 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "medium",
                      color: "text.primary",
                    }}
                  >
                    {tag.name}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => onDeleteTag(tag.id)}
                    sx={{
                      "&:hover": {
                        bgcolor: "error.light",
                        color: "white",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

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

const AddTagDialogContainer: FC<{
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

const TagsContainer: FC = () => {
  const { data: tags = [], isLoading } = useTags();
  const [isOpenAddTagDialog, setIsOpenAddTagDialog] = useState(false);
  const { createTag } = useCreateTag();
  const { deleteTag } = useDeleteTag();

  const handleAddTag = () => {
    setIsOpenAddTagDialog(true);
  };

  const handleDeleteTag = (tagId: string) => {
    deleteTag({ tagId });
  };

  const handleCloseAddTagDialog = (tagName?: string) => {
    setIsOpenAddTagDialog(false);
    if (tagName) {
      createTag({ tagName });
    }
  };

  return (
    <>
      <TagsPresenter
        tags={tags}
        isLoading={isLoading}
        onAddTag={handleAddTag}
        onDeleteTag={handleDeleteTag}
      />
      <AddTagDialogContainer
        isOpen={isOpenAddTagDialog}
        onClose={handleCloseAddTagDialog}
      />
    </>
  );
};

export default function Page() {
  return <TagsContainer />;
}
