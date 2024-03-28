import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@uploadthing/react/styles.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

const font = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "manitun",
  description:
    "مرحبًا بكم في منصة مانيتون، الوجهة المثالية للكتّاب والمبدعين، حيث يمكنكم نشر أفكاركم وإبداعاتكم بكل سهولة وتواصل مع جمهوركم بطريقة مميزة",
  keywords: "manitun,maniyn,kateeb,kotaab",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="ar">
      <head>
        <meta
          name="google-site-verification"
          content="Pjrnb9ipmLRDAG9kfJPg87vlDZAve6cd4UD4RavnAUU"
        />
        <meta name="google-adsense-account" content="ca-pub-9565235633569563" />
      </head>
      <body className={cn(font.className)}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
        <GoogleAnalytics gaId="G-2HSBZRBC6E" />
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      </body>
    </html>
  );
}
