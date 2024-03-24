import type { Metadata } from "next";
import { Almarai } from "next/font/google";
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




const font = Almarai({ subsets: ["arabic"], weight: "700" });

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
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href="/favicon-194x194.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="google-site-verification"
          content="Pjrnb9ipmLRDAG9kfJPg87vlDZAve6cd4UD4RavnAUU"
        />
        <meta name="google-adsense-account" content="ca-pub-9565235633569563" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={cn(font.className)}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Toaster />
            <Navbar />
            {children}
          </ThemeProvider>
        </SessionProvider>
        <GoogleAnalytics gaId="G-2HSBZRBC6E" />
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
      </body>
    </html>
  );
}
