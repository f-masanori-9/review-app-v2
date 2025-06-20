import { z } from "zod";

import { NoteToTagRelation } from "../../../../models/NoteToTagRelation";
import { authRequiredProcedure } from "../../trpc";

const inputSchema = z.object({
  noteId: z.string(),
  tagIds: z.array(z.string()),
});

const outputSchema = z.void();

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const editNoteToTagRelation = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .mutation(async ({ input, ctx }) => {
    const user = ctx.user;
    const { noteId, tagIds } = input;

    const currentTagRelations =
      await ctx.noteToTagRelationRepository.findUserByNoteId({
        userId: user.id,
        vocabularyNoteId: noteId,
      });
    const tagRelationsToDelete = currentTagRelations.filter(
      (relation) =>
        !tagIds.includes(relation.tagId) && relation.userId === user.id
    );
    const tagRelationsToCreate = tagIds.flatMap((tagId) => {
      const isExistingTagRelation = !!currentTagRelations.find(
        (relation) => relation.tagId === tagId && relation.userId === user.id
      );
      if (isExistingTagRelation) return [];
      return NoteToTagRelation.createNew({
        userId: user.id,
        vocabularyNoteId: noteId,
        tagId,
      });
    });
    await ctx.noteToTagRelationRepository.createMany(tagRelationsToCreate);
    await ctx.noteToTagRelationRepository.deleteMany({
      noteToTagRelationIds: tagRelationsToDelete.map((relation) => relation.id),
    });
  });
