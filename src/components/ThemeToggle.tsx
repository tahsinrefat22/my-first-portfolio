'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { ThemeToggleButton } from '@/components/ui/shadcn-io/theme-toggle-button';

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  // Hydration-safe mounted flag: false on the server, true once on the client
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const current = resolvedTheme === 'dark' ? 'dark' : 'light';

  const toggle = useCallback(() => {
    setTheme(current === 'dark' ? 'light' : 'dark');
  }, [current, setTheme]);

  // Reserve the slot before hydration so the nav does not shift
  if (!mounted) return <div className="size-9" aria-hidden />;

  return (
    <ThemeToggleButton
      theme={current}
      onClick={toggle}
      variant="circle"
      start="center"
      className="size-9 rounded-full border-0 bg-transparent text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
    />
  );
};

export default ThemeToggle;
