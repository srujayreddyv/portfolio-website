'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { Theme } from '@/types';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'dark', 
  storageKey = 'portfolio-theme' 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={false}
      disableTransitionOnChange
      storageKey={storageKey}
      themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  );
}
