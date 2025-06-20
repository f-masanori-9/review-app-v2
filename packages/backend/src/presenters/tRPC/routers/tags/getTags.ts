import { z } from "zod";

import { authRequiredProcedure } from "../../trpc";

const inputSchema = z.object({});

const outputSchema = z.object({
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      order: z.number(),
    })
  ),
});

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const getTags = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .query(async ({ input, ctx }) => {
    const user = ctx.user;
    const tags = await ctx.dbClient.tag.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return { tags };
  });
