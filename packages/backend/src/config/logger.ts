import winston from 'winston';

import { asyncLocalStorage } from '../asyncLocalStorage';

// ログフォーマットの定義
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format((info) => {
    const store = asyncLocalStorage.getStore();
    if (store?.requestId) {
      info.requestId = store.requestId;
    }
    return info;
  })(),
  winston.format.json(),
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: `${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '')}.error.log`,
      level: 'error',
    }),
  ],
});

// 開発環境の場合はコンソールにも出力
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: logFormat,
    }),
  );
}
