import { z } from "zod";

import { authRequiredProcedure } from "../../trpc";
import { VocabularyNoteRepository } from "../../../../repositories/VocabularyNoteRepository";

const inputSchema = z.object({});

const outputSchema = z.object({
  vocabularyNotes: z.array(
    z.object({
      id: z.string(),
      frontContent: z.string(),
      backContent: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      reviewLogs: z.array(
        z.object({
          id: z.string(),
          createdAt: z.date(),
        })
      ),
      noteToTagRelations: z.array(
        z.object({
          id: z.string(),
          tagId: z.string(),
          tagName: z.string(),
        })
      ),
    })
  ),
});

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング

export const getVocabularyNotes = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .query(async ({ input, ctx }) => {
    const user = ctx.user;
    const vocabularyNoteRepository = new VocabularyNoteRepository(ctx.dbClient);

    const vocabularyNotes = await vocabularyNoteRepository.findByUserId({
      userId: user.id,
    });
    return { vocabularyNotes };
  });
