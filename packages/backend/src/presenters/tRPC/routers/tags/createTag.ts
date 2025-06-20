import { z } from "zod";

import { authRequiredProcedure } from "../../trpc";

const inputSchema = z.object({
  tagId: z.string().uuid("Invalid tag ID format").optional(),
  tagName: z.string().max(100, "Tag name must be less than 100 characters"),
});
//   z.object({
//   tagName: z.string().min(1, "Tag name is required"),
// });

const outputSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  order: z.number(),
});

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const createTag = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .mutation(async ({ input, ctx }) => {
    const user = ctx.user;

    const tags = await ctx.dbClient.tag.findMany({
      where: { userId: user.id },
    });
    const tag = await ctx.dbClient.tag.create({
      data: {
        id: input.tagId || undefined, // Use provided tagId or generate a new one
        name: input.tagName,
        userId: user.id,
        order: tags.length + 1, // Set order based on current number of tags
      },
    });
    return tag;
  });
