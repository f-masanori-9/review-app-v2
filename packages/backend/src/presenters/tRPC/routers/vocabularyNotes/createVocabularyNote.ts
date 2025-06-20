import { z } from "zod";

import { authRequiredProcedure } from "../../trpc";
import { CreateVocabularyNoteService } from "../../../../services/createVocabularyNote";

const inputSchema = z.object({
  noteId: z.string(),
  frontContent: z.string().optional(),
  backContent: z.string().optional(),
  relatedTagIds: z.array(z.string()).optional(),
});

const outputSchema = z.object({
  id: z.string(),
  frontContent: z.string(),
  backContent: z.string(),
});

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const createVocabularyNote = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .mutation(async ({ input, ctx }) => {
    const user = ctx.user;
    const service = new CreateVocabularyNoteService(ctx.dbClient);

    const vocabularyNote = await service.createVocabularyNote({
      vocabularyNoteId: input.noteId,
      userId: user.id,
      frontContent: input.frontContent || "",
      backContent: input.backContent || "",
      relatedTagIds: input.relatedTagIds || [],
    });
    return vocabularyNote;
  });
