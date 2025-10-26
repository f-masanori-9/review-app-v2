import {} from '@auth0/nextjs-auth0';
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextResponse } from 'next/server';
import { tRPCClient } from './tRPCClient';
export const runtime = 'nodejs'; // ← これが重要
// Initialize the Auth0 client
export const auth0 = new Auth0Client({
  // Options are loaded from environment variables by default
  // Ensure necessary environment variables are properly set
  // domain: process.env.AUTH0_DOMAIN,
  // clientId: process.env.AUTH0_CLIENT_ID,
  // clientSecret: process.env.AUTH0_CLIENT_SECRET,
  // appBaseUrl: process.env.APP_BASE_URL,
  // secret: process.env.AUTH0_SECRET,

  authorizationParameters: {
    // In v4, the AUTH0_SCOPE and AUTH0_AUDIENCE environment variables for API authorized applications are no longer automatically picked up by the SDK.
    // Instead, we need to provide the values explicitly.
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_AUDIENCE,
  },
  async onCallback(error, context, session) {
    // redirect the user to a custom error page
    if (error) {
      return NextResponse.redirect(
        new URL(`/error?error=${error.message}`, process.env.APP_BASE_URL),
      );
    }

    const sub = session?.user?.sub;
    if (sub) {
      await tRPCClient.afterAuth0Authentication.mutate({
        auth0_sub: sub,
        name: session?.user?.name,
        email: session?.user?.email,
      });
    }
    // complete the redirect to the provided returnTo URL
    return NextResponse.redirect(
      new URL(context.returnTo || '/', process.env.APP_BASE_URL),
    );
  },
});
