import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Career - Tahsin Ahmed Refat",
  description: "My career journey and experience at various companies",
  openGraph: {
    title: "Career - Tahsin Ahmed Refat",
    description: "My career journey and experience at various companies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career - Tahsin Ahmed Refat",
    description: "My career journey and experience at various companies",
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

