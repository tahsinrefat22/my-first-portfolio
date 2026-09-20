import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="container-page flex min-h-[80dvh] flex-col items-start justify-center gap-6 pt-28">
        <p className="font-mono text-sm text-muted-foreground tabular-nums">404</p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
          Nothing at this address.
        </h1>
        <p className="prose-measure text-lg text-muted-foreground">
          The page may have moved, or the link was never right. Everything that exists is one scroll away from the home page.
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft weight="regular" />
            Back home
          </Link>
        </Button>
      </main>
      <Footer />
    </>
  );
}
