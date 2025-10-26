import { z } from 'zod';

import { authRequiredProcedure } from '../../trpc';

const inputSchema = z.object({
  tagId: z.string().min(1, 'Tag id is required'),
});

const outputSchema = z.object({
  result: z.string(),
});

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const deleteTag = authRequiredProcedure
  .input(inputSchema)
  .output(outputSchema)
  .mutation(async ({ input, ctx }) => {
    const user = ctx.user;

    await ctx.dbClient.tag.delete({
      where: {
        id: input.tagId,
        userId: user.id,
      },
    });

    return { result: 'Tag deleted successfully' };
  });
