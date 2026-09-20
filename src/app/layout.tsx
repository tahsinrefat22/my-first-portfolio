import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LoadingProvider } from "@/components/preloader";

const geistSans = Geist({
  weight: ["400", "500", "600"],
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  weight: ["400"],
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const DESCRIPTION =
  "Full-stack developer building web products, GoHighLevel marketplace apps, and ERP systems. GHL snapshots, workflow automations, and integrations for agencies.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tahsin Ahmed Refat",
    template: "%s - Tahsin Ahmed Refat",
  },
  description: DESCRIPTION,
  authors: [{ name: "Tahsin Ahmed Refat" }],
  creator: "Tahsin Ahmed Refat",
  openGraph: {
    title: "Tahsin Ahmed Refat, full-stack developer",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Tahsin Ahmed Refat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tahsin Ahmed Refat, full-stack developer",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingProvider>{children}</LoadingProvider>
        </ThemeProvider>
        {/* Without JS the loader could never finish, so it is not shown at all */}
        <noscript>
          <style>{`.preloader { display: none; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
