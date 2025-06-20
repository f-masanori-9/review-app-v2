import { z } from "zod";

import { authRequiredProcedure } from "../../trpc";
import { CreateVocabularyNoteService } from "../../../../services/createVocabularyNote";
import { VocabularyNoteRepository } from "../../../../repositories/VocabularyNoteRepository";
import { TRPCError } from "@trpc/server";
import { prismaClient } from "../../../../infra/prismaClient";

const inputSchema = z.discriminatedUnion("kind", [
  z.object({
    id: z.string().uuid(),
    kind: z.literal("frontContent"),
    frontContent: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    kind: z.literal("backContent"),
    backContent: z.string(),
  }),
]);

const outputSchema = z.object({
  id: z.string(),
  frontContent: z.string(),
  backContent: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const updateVocabularyNote = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .mutation(async ({ input, ctx }) => {
    const user = ctx.user;

    const service = new CreateVocabularyNoteService(ctx.dbClient);
    const vocabularyNoteRepository = new VocabularyNoteRepository(prismaClient);
    let vocabularyNote = await vocabularyNoteRepository.findById({
      id: input.id,
      userId: user.id,
    });

    // TODO: エラー時の処理をミドルウェアとして共通化
    if (!vocabularyNote) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Vocabulary note not found",
      });
    }

    switch (input.kind) {
      case "frontContent":
        vocabularyNote = vocabularyNote.update({
          frontContent: input.frontContent,
        });
        break;
      case "backContent":
        vocabularyNote = vocabularyNote.update({
          backContent: input.backContent,
        });
        break;
      default: {
        const _exhaustiveCheck: never = input;
      }
    }
    const VNote = await vocabularyNoteRepository.update(vocabularyNote);

    return { ...VNote };
  });
