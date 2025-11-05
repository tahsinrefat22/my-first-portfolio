'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useSettings } from '@/hooks/useSettings';
import type { Mode } from '@/contexts/settingsContext';
import { ThemeToggleButton } from '@/components/ui/shadcn-io/theme-toggle-button';

const ThemeToggle = () => {
  const { setTheme, theme: nextTheme, resolvedTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    // Get the actual resolved theme (resolvedTheme is the actual theme value, not 'system')
    const actualTheme = resolvedTheme || nextTheme || settings.mode;
    const currentMode = actualTheme === 'dark' ? 'dark' : 'light';
    const newMode: Mode = currentMode === 'dark' ? 'light' : 'dark';

    // Update theme (this is called inside startViewTransition by ThemeToggleButton)
    const updatedSettings = {
      ...settings,
      mode: newMode,
      theme: {
        ...settings.theme,
        styles: {
          light: settings.theme.styles?.light || {},
          dark: settings.theme.styles?.dark || {},
        },
      },
    };
    updateSettings(updatedSettings);
    setTheme(newMode);
  }, [settings, updateSettings, setTheme, resolvedTheme, nextTheme]);

  // Get current theme from resolvedTheme (which gives actual 'light' or 'dark', not 'system')
  const currentTheme = (resolvedTheme as 'light' | 'dark') || (nextTheme as 'light' | 'dark') || (settings.mode as 'light' | 'dark') || 'light';

  if (!mounted) {
    return (
      <div className="h-9 w-9" />
    );
  }

  return (
    <ThemeToggleButton
      theme={currentTheme}
      onClick={handleThemeToggle}
      variant="circle"
      start="center"
      className="h-9 w-9"
    />
  );
};

export default ThemeToggle;

