import type { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { baseProcedure } from '../trpc';

const inputSchema = z.object({
  auth0_sub: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
});

const outputSchema = z.object({
  userId: z.string(),
});

const createSampleData = async (userId: string, dbClient: PrismaClient) => {
  // Create sample tags
  const basicTag = await dbClient.tag.create({
    data: {
      id: randomUUID(),
      name: '基本単語',
      order: 0,
      userId: userId,
    },
  });

  const greetingTag = await dbClient.tag.create({
    data: {
      id: randomUUID(),
      name: '挨拶',
      order: 1,
      userId: userId,
    },
  });

  // Create sample vocabulary notes
  const helloNote = await dbClient.vocabularyNote.create({
    data: {
      id: randomUUID(),
      frontContent: 'Hello',
      backContent: 'こんにちは',
      userId: userId,
    },
  });

  const thanksNote = await dbClient.vocabularyNote.create({
    data: {
      id: randomUUID(),
      frontContent: 'Thank you',
      backContent: 'ありがとう',
      userId: userId,
    },
  });

  const goodbyeNote = await dbClient.vocabularyNote.create({
    data: {
      id: randomUUID(),
      frontContent: 'Goodbye',
      backContent: 'さようなら',
      userId: userId,
    },
  });

  // Create note-to-tag relations
  await dbClient.noteToTagRelation.createMany({
    data: [
      {
        id: randomUUID(),
        userId: userId,
        vocabularyNoteId: helloNote.id,
        tagId: basicTag.id,
      },
      {
        id: randomUUID(),
        userId: userId,
        vocabularyNoteId: helloNote.id,
        tagId: greetingTag.id,
      },
      {
        id: randomUUID(),
        userId: userId,
        vocabularyNoteId: thanksNote.id,
        tagId: basicTag.id,
      },
      {
        id: randomUUID(),
        userId: userId,
        vocabularyNoteId: thanksNote.id,
        tagId: greetingTag.id,
      },
      {
        id: randomUUID(),
        userId: userId,
        vocabularyNoteId: goodbyeNote.id,
        tagId: greetingTag.id,
      },
    ],
  });
};

// TODO: エラーハンドリング
// TODO: ロギング
// TODO: リファクタリング
export const afterAuth0Authentication = baseProcedure
  .input(inputSchema)
  .output(outputSchema)
  .mutation(async ({ input, ctx }) => {
    const { auth0_sub } = input;
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
        name: '未設定', // Placeholder name, can be updated later
        email: '', // Placeholder email, can be updated later
      };
      await ctx.dbClient.$transaction(async () => {
        await ctx.dbClient.user.create({
          data: user,
        });
        await ctx.dbClient.auth0ToUserRelation.create({
          data: {
            sub: auth0Sub,
            userId: user.id,
          },
        });

        await createSampleData(user.id, ctx.dbClient);

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
