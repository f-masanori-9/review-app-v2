'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';
import { Loading } from '@/components/Loading';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') return;
    if (pathname == '/login') return;

    if (isLoading) return;
    if (!user) {
      router.push('/');
    }
  }, [user, router, pathname, isLoading]);

  if (isLoading) return <Loading />;

  if (!user) {
    if (pathname === '/login') return <>{children}</>;
    if (pathname === '/') return <>{children}</>;
    return <Loading />;
  }

  return <>{children}</>;
};
