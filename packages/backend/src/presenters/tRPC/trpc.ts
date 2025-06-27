import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import superjson from "superjson";
import { logger } from "../../config/logger";
import { prismaClient } from "../../infra/prismaClient";
import { NoteToTagRelationRepository } from "../../repositories/NoteToTagRelationRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { VocabularyNoteRepository } from "../../repositories/VocabularyNoteRepository";
import { VocabularyNoteReviewLogRepository } from "../../repositories/VocabularyNoteReviewLogRepository";

const userRepository = new UserRepository(prismaClient);
const vocabularyNoteRepository = new VocabularyNoteRepository(prismaClient);
const noteToTagRelationRepository = new NoteToTagRelationRepository(
  prismaClient
);
const vocabularyNoteReviewLogRepository = new VocabularyNoteReviewLogRepository(
  prismaClient
);

export const createContext = async (opts: CreateExpressContextOptions) => {
  return {
    ...opts,
    userRepository,
    noteToTagRelationRepository,
    vocabularyNoteRepository,
    vocabularyNoteReviewLogRepository,
    dbClient: prismaClient,
  };
};

// TODO: 環境変数化
// TODO: リファクタリング
const AUTH0_DOMAIN = "https://f-masanori.jp.auth0.com";
const AUTH0_AUDIENCE = "https://f-masanori.jp.auth0.com/api/v2/";

// 1. JWK Set の URL を指定
const JWKS = createRemoteJWKSet(
  new URL(`${AUTH0_DOMAIN}/.well-known/jwks.json`)
);

export async function verifyIdToken(idToken: string) {
  try {
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: `${AUTH0_DOMAIN}/`,
      audience: AUTH0_AUDIENCE,
    });

    return payload;
  } catch (err) {
    logger.error("❌ IDトークンの検証失敗:", err);
    throw new Error("Invalid ID token");
  }
}

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const attachRepositoryMiddleware = t.middleware(async ({ next }) => {
  return next({
    ctx: { userRepository, dbClient: prismaClient },
  });
});

const baseProcedure = t.procedure.use(attachRepositoryMiddleware);

const authRequiredProcedure = baseProcedure.use(
  t.middleware(async ({ ctx, next }) => {
    const authHeader = ctx.req.header("Authorization");
    if (!authHeader) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "トークンがありません。",
      });
    }
    const verifiedToken = await verifyIdToken(
      authHeader.replace("Bearer ", "")
    );
    const users = await ctx.dbClient.user.findMany({
      where: {
        Auth0ToUserRelation: {
          auth0User: {
            sub: verifiedToken.sub,
          },
        },
      },
    });
    const user = users[0];
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "ユーザーが存在しません。",
      });
    }
    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  })
);

export { authRequiredProcedure, baseProcedure, t };
