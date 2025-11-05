'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type Mode = 'light' | 'dark' | 'system';

interface ThemeStyles {
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

interface Settings {
  mode: Mode;
  theme: {
    styles?: ThemeStyles;
  };
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

const defaultSettings: Settings = {
  mode: 'light',
  theme: {
    styles: {
      light: {},
      dark: {},
    },
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

