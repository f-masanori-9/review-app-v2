import { z } from "zod";

import { baseProcedure } from "../trpc";
import { randomUUID } from "crypto";

const inputSchema = z.object({
  auth0_sub: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
});

const outputSchema = z.object({
  userId: z.string(),
});

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const afterAuth0Authentication = baseProcedure
  .input(inputSchema)
  .output(outputSchema)
  .mutation(async ({ input, ctx }) => {
    const { auth0_sub, name, email } = input;
    const auth0AUser = await ctx.dbClient.auth0User.findUnique({
      where: { sub: auth0_sub },
    });

    const createApplicationUser = async ({
      auth0Sub,
    }: {
      auth0Sub: string;
    }) => {
      const user = {
        id: randomUUID(),
        name: "未設定", // Placeholder name, can be updated later
        email: "", // Placeholder email, can be updated later
      };
      await ctx.dbClient.$transaction(async (tx) => {
        await ctx.dbClient.user.create({
          data: user,
        });
        await ctx.dbClient.auth0ToUserRelation.create({
          data: {
            sub: auth0Sub,
            userId: user.id,
          },
        });
        return user.id;
      });
      return user.id;
    };

    if (auth0AUser) {
      const user = await ctx.dbClient.auth0ToUserRelation.findMany({
        where: { sub: auth0AUser.sub },
      });
      if (user.length > 0) {
        return {
          // TODO: 認証に複数ユーザーは初期リリースでは考慮しない
          userId: user[0].userId,
        };
      } else {
        // ユーザーが存在しない場合は新規作成
        const userId = await createApplicationUser({ auth0Sub: auth0_sub });
        return {
          userId,
        };
      }
    }
    await ctx.dbClient.auth0User.create({
      data: {
        sub: auth0_sub,
      },
    });
    const userId = await createApplicationUser({ auth0Sub: auth0_sub });
    return {
      userId,
    };
  });
