import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SettingsProvider } from "@/contexts/settingsContext";

const parkinsans = Parkinsans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-parkinsans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Tahsin's Portfolio",
  description: "My Personal Portfolio Which Shows My Skills and Projects",
  authors: [{ name: "Tahsin Ahmed Refat" }],
  creator: "Tahsin Ahmed Refat",
  publisher: "Tahsin Ahmed Refat",
  openGraph: {
    title: "Tahsin Ahmed Refat - Full Stack Software Developer",
    description: "My Personal Portfolio Which Shows My Skills and Projects",
    url: "https://tahsinahmedrefat.com",
    siteName: "Tahsin's Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tahsin Ahmed Refat - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tahsin Ahmed Refat - Full Stack Software Developer",
    description: "My Personal Portfolio Which Shows My Skills and Projects",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${parkinsans.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
