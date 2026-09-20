'use client';

import { GithubLogo, CaretDown, ArrowUpRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GITHUB_ACCOUNTS } from '@/lib/constants';

/* Two real GitHub accounts, so a menu is justified. Plain secondary button, no theatrics. */
export function GithubMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="group [&[data-state=open]_svg:last-child]:rotate-180">
          <GithubLogo weight="regular" />
          GitHub
          <CaretDown weight="bold" className="size-3.5! opacity-60 transition-transform duration-300 ease-out-expo" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-64 rounded-2xl p-1.5 shadow-soft">
        <ul className="flex flex-col">
          {GITHUB_ACCOUNTS.map((account) => (
            <li key={account.handle}>
              <a
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-[calc(1rem-0.375rem)] px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-foreground/[0.04]"
              >
                <span className="font-medium">{account.handle}</span>
                <ArrowUpRight
                  weight="regular"
                  className="size-4 text-muted-foreground transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </a>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
