export interface Tag {
  id: string;
  name: string;
}

export interface TagsPresenterProps {
  tags: Tag[];
  isLoading: boolean;
  onAddTag: () => void;
  onDeleteTag: (tagId: string) => void;
}

export interface AddTagDialogPresenterProps {
  isOpen: boolean;
  content: string;
  onContentChange: (content: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}