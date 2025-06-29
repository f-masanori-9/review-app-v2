"use client";

import { useCreateTag } from "@/hooks/tag/useCreateTag";
import { useDeleteTag } from "@/hooks/tag/useDeleteTag";
import { useTags } from "@/hooks/tag/useTags";
import { FC, useState } from "react";
import { AddTagDialog } from "../components/AddTagDialog";
import { TagsPresenter } from "../components/TagsPresenter";

export const TagsContainer: FC = () => {
  const { data: tags = [], isLoading } = useTags();
  const [isOpenAddTagDialog, setIsOpenAddTagDialog] = useState(false);
  const { createTag } = useCreateTag();
  const { deleteTag } = useDeleteTag();

  const handleAddTag = () => {
    setIsOpenAddTagDialog(true);
  };

  const handleDeleteTag = (tagId: string) => {
    if (confirm("このタグを削除しますか？")) {
      deleteTag({ tagId });
    }
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
      <AddTagDialog
        isOpen={isOpenAddTagDialog}
        onClose={handleCloseAddTagDialog}
      />
    </>
  );
};