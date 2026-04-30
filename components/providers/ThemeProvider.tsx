'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

/**
 * Keeps the `dark` class applied alongside `sky`, since the sky theme
 * is a stylized dark variant. Without this, Tailwind's dark: variants
 * stop firing the moment the user picks Sky.
 */
function SkyDarkSync() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'sky') {
      const enforceSkyDark = () => {
        if (!root.classList.contains('sky')) root.classList.add('sky');
        if (!root.classList.contains('dark')) root.classList.add('dark');
      };

      enforceSkyDark();
      const observer = new MutationObserver(enforceSkyDark);
      observer.observe(root, { attributes: true, attributeFilter: ['class'] });
      return () => observer.disconnect();
    }

    root.classList.toggle('dark', resolvedTheme === 'dark');
  }, [theme, resolvedTheme]);

  return null;
}

/**
 * Wraps next-themes with System Architect defaults.
 *
 * - `defaultTheme` is `dark` by default (overridable for per-page tests).
 * - Themes: light | dark | sky | system.
 * - Storage key defaults to `portfolio-theme` to match the FOUC script
 *   in `lib/theme-utils.ts`.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'portfolio-theme',
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Pre-hydration shell — bg-base matches the dark default so there is
  // no flash between the FOUC script and React's first paint.
  if (!mounted) {
    return (
      <div className="min-h-screen bg-base text-ink">
        {children}
      </div>
    );
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
      storageKey={storageKey}
      themes={['light', 'dark', 'system', 'sky']}
    >
      <SkyDarkSync />
      {children}
    </NextThemesProvider>
  );
}
