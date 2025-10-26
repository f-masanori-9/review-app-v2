import { z } from 'zod';
import { VocabularyNoteRepository } from '../../../../repositories/VocabularyNoteRepository';
import { authRequiredProcedure } from '../../trpc';

const inputSchema = z.object({
  vocabularyNoteId: z.string(),
});

const outputSchema = z.array(
  z.object({
    id: z.string(),
    tagId: z.string(),
    tagName: z.string(),
    createdAt: z.date(),
  }),
);

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング

export const getNoteToTagRelations = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .query(async ({ input, ctx }) => {
    const user = ctx.user;

    const tagRelations = await ctx.dbClient.noteToTagRelation.findMany({
      where: {
        vocabularyNoteId: input.vocabularyNoteId,
        userId: user.id,
      },
      include: {
        tag: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return tagRelations.map((relation) => ({
      id: relation.id,
      tagId: relation.tag.id,
      tagName: relation.tag.name,
      createdAt: relation.createdAt,
    }));
  });
