import { AsyncLocalStorage } from 'async_hooks';

// NOTE: 用途
// AsyncLocalStorageを使用して、リクエストごとに一意のIDを管理する
export const asyncLocalStorage = new AsyncLocalStorage<{ requestId: string }>();
