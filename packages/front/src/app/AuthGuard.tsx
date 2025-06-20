"use client";

import { Loading } from "@/components/Loading";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") return;
    if (pathname === "/login") return;

    if (isLoading) return;
    if (!user) {
      router.push("/");
    }
  }, [user, router, pathname]);

  if (isLoading) return <Loading />;

  if (!user) {
    if (pathname === "/login") return <>{children}</>;
    if (pathname === "/") return <>{children}</>;
    return <Loading />;
  }

  return <>{children}</>;
};
