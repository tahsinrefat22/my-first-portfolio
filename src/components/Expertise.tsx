import Image from 'next/image';
import { Section } from '@/components/section';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { SKILL_GROUPS } from '@/data/skills';

/*
  Informational section, so it stays still. Three labelled rows of logos, no names beside them.
  Logos are the existing PNGs rendered through a grayscale filter so mixed sources read as one set;
  the original colours return on hover, on transparent. Marks that are themselves black stay
  inverted (white) on hover in dark mode, since black on near-black would vanish.
*/
export default function Expertise() {
  return (
    <Section id="expertise">
      <SectionHeading
        title="Tools I work with"
        lede="The languages, frameworks, and infrastructure I use day to day."
      />

      <div className="mt-14 flex flex-col divide-y divide-border md:mt-16">
        {SKILL_GROUPS.map((group, gi) => (
          <Reveal
            key={group.label}
            delay={gi * 60}
            className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[12rem_1fr] md:gap-8 md:py-10"
          >
            <h3 className="text-sm font-medium text-muted-foreground md:pt-2">{group.label}</h3>
            {/* Logo only. Each name lives in alt and title, so it is still there for screen readers and on hover. */}
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-3 md:gap-x-5">
              {group.items.map((skill) => (
                <li key={skill.name} className="logo-chip px-2 py-1" title={skill.name} data-dark-mark={skill.darkMark ? '' : undefined} data-tile={skill.tile ? '' : undefined}>
                  <Image
                    src={skill.logo}
                    alt={skill.name}
                    width={112}
                    height={112}
                    className="logo-mark h-9 w-auto object-contain md:h-10"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
