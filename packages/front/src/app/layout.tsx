import { auth0 } from "@/libs/auth0";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import React from "react";
import { SWRConfig } from "swr";
import { AuthGuard } from "./AuthGuard";
import { Footer } from "./footer";
import "./globals.css";
import { Header } from "./header";
import theme from "./theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "review-notes",
  description: "復習ができるメモアプリです。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();
  return (
    <html lang="ja" className={roboto.variable}>
      <body
        // NOTE: padding-top 8 はヘッダーの高さを考慮
        // NOTE: padding-bottom 16 はフッターの高さを考慮
        // NOTE: ダークモードに設定されているスマホのために text-black と bg-white を指定
        // NOTE: スマホで不要に横スクロールしないように overflow-x-hidden を指定
        style={{
          fontFamily: roboto.style.fontFamily,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          overflow: "hidden",
          backgroundColor: "white",
          color: "black",
          marginTop: "40px",
          marginBottom: "60px",
        }}
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <SWRConfig
          value={{
            revalidateOnFocus: false,
          }}
        >
          <AppRouterCacheProvider>
            <Auth0Provider user={session?.user}>
              <ThemeProvider theme={theme}>
                <AuthGuard>
                  <Header />
                  {children}
                  <Footer />
                </AuthGuard>
              </ThemeProvider>
            </Auth0Provider>
          </AppRouterCacheProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
