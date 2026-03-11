'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

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

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system', 
  storageKey = 'theme' 
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <div className="text-gray-900 dark:text-white min-h-screen" style={{ background: 'var(--sky-bg)' }}>
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
