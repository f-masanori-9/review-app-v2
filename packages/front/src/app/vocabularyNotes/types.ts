export type VocabularyNote = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  frontContent: string;
  backContent: string;
  reviewLogs: {
    id: string;
    createdAt: Date;
  }[];
  noteToTagRelations: {
    id: string;
    tagName: string;
    tagId: string;
  }[];
};
