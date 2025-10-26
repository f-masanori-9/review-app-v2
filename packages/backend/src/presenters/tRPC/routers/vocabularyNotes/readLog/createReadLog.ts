import { z } from 'zod';

import { VocabularyNoteReviewLog } from '../../../../../models/VocabularyNoteReviewLog';
import { authRequiredProcedure } from '../../../trpc';

const inputSchema = z.object({
  vocabularyNoteId: z.string(),
});

const outputSchema = z.object({
  id: z.string(),
});

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const createReadLog = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .mutation(async ({ input, ctx }) => {
    const user = ctx.user;
    const vocabularyNoteReviewLog = VocabularyNoteReviewLog.createNew({
      userId: user.id,
      vocabularyNoteId: input.vocabularyNoteId,
    });

    await ctx.vocabularyNoteReviewLogRepository.create(vocabularyNoteReviewLog);

    return vocabularyNoteReviewLog;
  });
