import { z } from 'zod';
import { VocabularyNoteRepository } from '../../../../repositories/VocabularyNoteRepository';
import { authRequiredProcedure } from '../../trpc';

const inputSchema = z.object({
  vocabularyNoteId: z.string(),
});

const outputSchema = z
  .object({
    id: z.string(),
    frontContent: z.string(),
    backContent: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .nullable();
// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング

export const getVocabularyNote = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .query(async ({ input, ctx }) => {
    const user = ctx.user;
    const vocabularyNoteRepository = new VocabularyNoteRepository(ctx.dbClient);

    const vocabularyNote = await vocabularyNoteRepository.findById({
      userId: user.id,
      id: input.vocabularyNoteId,
    });
    if (!vocabularyNote) {
      return null; // or throw an error if preferred
    }
    return { ...vocabularyNote };
  });
