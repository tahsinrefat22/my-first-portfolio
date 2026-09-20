import { ArrowRight, DownloadSimple } from '@phosphor-icons/react/dist/ssr';
import { Section } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { Button, ButtonIcon } from '@/components/ui/button';
import { CONTACT_MAILTO, CV_PDF_PATH, CV_FILENAME } from '@/lib/constants';

/*
  The one Persuade moment. Centred because the message is the design.
  No gradients, no overlay: a tinted band and space.
*/
export default function CTA() {
  return (
    <Section id="contact" tinted className="py-28 md:py-40">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-6xl">
          Ready to work together?
        </h2>
        {/* Copy: draft. Replace with what you are actually open to. */}
        <p className="prose-measure text-lg text-muted-foreground md:text-xl">
          Open to full-time roles, and to GoHighLevel work for agencies: apps, snapshots, automations,
          and fixes. Email is the fastest way to reach me.
        </p>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <a href={CONTACT_MAILTO}>
              Get in touch
              <ButtonIcon>
                <ArrowRight weight="bold" />
              </ButtonIcon>
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href={CV_PDF_PATH} download={CV_FILENAME}>
              <DownloadSimple weight="regular" className="opacity-60" />
              Download CV
            </a>
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
