import { afterAuth0Authentication } from './routers/afterAuth0Authentication';
import { editNoteToTagRelation } from './routers/noteToTagRelations/editNoteToTagRelation';
import { getNoteToTagRelations } from './routers/noteToTagRelations/getNoteToTagRelations';
import { createTag } from './routers/tags/createTag';
import { deleteTag } from './routers/tags/deleteTag';
import { getTags } from './routers/tags/getTags';
import { createVocabularyNote } from './routers/vocabularyNotes/createVocabularyNote';
import { deleteVocabularyNote } from './routers/vocabularyNotes/deleteVocabularyNote';
import { getVocabularyNote } from './routers/vocabularyNotes/getVocabularyNote';
import { getVocabularyNotes } from './routers/vocabularyNotes/getVocabularyNotes';
import { createReadLog } from './routers/vocabularyNotes/readLog/createReadLog';
import { updateVocabularyNote } from './routers/vocabularyNotes/updateVocabularyNote';
import { t } from './trpc';

export const tRPCRouter = t.router({
  afterAuth0Authentication,
  tags: {
    getTags,
    createTag,
    deleteTag,
  },
  vocabularyNotes: {
    getVocabularyNote,
    getVocabularyNotes,
    createVocabularyNote,
    updateVocabularyNote,
    deleteVocabularyNote,
    reviewLog: {
      createReadLog,
    },
  },
  noteToTagRelations: {
    getNoteToTagRelations,
    editNoteToTagRelation,
  },
});

export type TRPCRouter = typeof tRPCRouter;
