import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career',
  description: 'Where I have worked, what I built there, and who I built it with.',
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
