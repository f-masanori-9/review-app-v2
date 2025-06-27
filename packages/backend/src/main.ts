import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { createContext } from "./presenters/tRPC/trpc";

import cors from "cors";
import { randomUUID } from "crypto";
import { asyncLocalStorage } from "./asyncLocalStorage";
import { logger } from "./config/logger";
import { tRPCRouter } from "./presenters/tRPC/router";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000", // ローカル開発時
      "https://review-app-v2-front.vercel.app", //  本番環境
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  const requestId = randomUUID();
  // ログのため、リクエストごとにユニークなIDを生成
  asyncLocalStorage.run({ requestId }, () => {
    next();
  });
});
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
  });
  next();
});
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: tRPCRouter,
    createContext,
    onError: ({ error }) => {
      logger.error(new Error("tRPC Error", { cause: error }));
    },
  })
);

console.log("Server is running on http://localhost:4000/trpc");
app.listen(4000);
