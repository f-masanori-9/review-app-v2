import { createTRPCClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { TRPCRouter } from '@/_gen/types/presenters/tRPC/router';

let accessTokenDataCache: {
  token: string;
  expiresAt: number;
} | null = null;

const getCurrentAccessToken = async () => {
  if (typeof window === 'undefined') return null;

  // キャッシュの期限切れでなければキャッシュを返す
  if (
    accessTokenDataCache &&
    accessTokenDataCache.expiresAt > Date.now() / 1000
  ) {
    console.log('Using cached access token:', accessTokenDataCache.token);
    return accessTokenDataCache.token;
  }

  console.log('Fetching new access token...');

  const session = await fetch('/auth/access-token');
  if (!session.ok) return null;

  const data = await session.json();
  // ex) expiredAt=1749997169
  accessTokenDataCache = {
    token: data.token,
    expiresAt: data.expires_at,
  };

  return data?.token || null;
};

export const tRPCClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_ENDPOINT}/trpc`,
      transformer: superjson,
      headers: async () => {
        const idToken = await getCurrentAccessToken();
        if (!idToken) {
          console.warn(
            'No access token available, returning empty Authorization header.',
          );
          return {
            // If no token is available, return an empty Authorization header
            Authorization: '',
          };
        }
        return {
          Authorization: `Bearer ${idToken}`,
        };
      },
    }),
  ],
});
