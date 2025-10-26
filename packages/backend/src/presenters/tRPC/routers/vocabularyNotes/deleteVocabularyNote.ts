import { z } from 'zod';

import { authRequiredProcedure } from '../../trpc';

const inputSchema = z.object({
  noteId: z.string(),
});

const outputSchema = z.void();

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const deleteVocabularyNote = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .mutation(async ({ input, ctx }) => {
    const user = ctx.user;
    await ctx.vocabularyNoteRepository.delete({
      id: input.noteId,
      userId: user.id,
    });
  });
