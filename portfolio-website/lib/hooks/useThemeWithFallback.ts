/**
 * Enhanced theme hook with comprehensive error handling and fallbacks
 */

import { useTheme } from 'next-themes';
import { useEffect, useState, useCallback } from 'react';

interface ThemeState {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
  systemTheme: string | undefined;
  mounted: boolean;
  error: string | null;
}

interface ThemeError {
  type: 'storage' | 'system' | 'unknown';
  message: string;
  originalError?: Error;
}

export function useThemeWithFallback(): ThemeState {
  const themeHook = useTheme();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackTheme, setFallbackTheme] = useState<string>('light');

  // Handle localStorage errors
  const safeSetTheme = useCallback((newTheme: string) => {
    try {
      themeHook.setTheme(newTheme);
      setError(null);
    } catch (err) {
      const error: ThemeError = {
        type: 'storage',
        message: 'Failed to save theme preference',
        originalError: err instanceof Error ? err : new Error(String(err))
      };
      
      console.warn('Theme storage error:', error);
      setError(error.message);
      
      // Fallback: set theme without persistence
      setFallbackTheme(newTheme);
      
      // Try to apply theme directly to document
      try {
        if (typeof document !== 'undefined') {
          const root = document.documentElement;
          if (newTheme === 'dark') {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      } catch (domError) {
        console.warn('Failed to apply theme to DOM:', domError);
      }
    }
  }, [themeHook]);

  // Detect system theme with error handling
  const getSystemTheme = useCallback((): string => {
    try {
      if (typeof window === 'undefined') return 'light';
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return mediaQuery.matches ? 'dark' : 'light';
    } catch (err) {
      console.warn('Failed to detect system theme:', err);
      return 'light';
    }
  }, []);

  // Initialize with error handling
  useEffect(() => {
    try {
      setMounted(true);
      
      // Validate current theme
      const currentTheme = themeHook.theme;
      if (currentTheme && !['light', 'dark', 'system'].includes(currentTheme)) {
        console.warn('Invalid theme detected, resetting to system');
        safeSetTheme('system');
      }
    } catch (err) {
      const error: ThemeError = {
        type: 'unknown',
        message: 'Failed to initialize theme system',
        originalError: err instanceof Error ? err : new Error(String(err))
      };
      
      console.error('Theme initialization error:', error);
      setError(error.message);
      setFallbackTheme('light');
    }
  }, [themeHook.theme, safeSetTheme]);

  // Monitor for storage quota exceeded errors
  useEffect(() => {
    const handleStorageError = (event: StorageEvent) => {
      // Check for theme-related storage changes (use default key if storageKey not available)
      const storageKey = 'theme'; // Default storage key used by next-themes
      if (event.key === storageKey || event.key === null) {
        console.warn('Storage event detected, theme may have been cleared');
        // Re-apply current theme if storage was cleared
        if (!event.newValue && themeHook.theme) {
          safeSetTheme(themeHook.theme);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageError);
      return () => window.removeEventListener('storage', handleStorageError);
    }
  }, [themeHook.theme, safeSetTheme]);

  // Provide fallback values when theme hook fails
  const safeTheme = error ? fallbackTheme : themeHook.theme;
  const safeResolvedTheme = error ? fallbackTheme : themeHook.resolvedTheme;
  const safeSystemTheme = error ? getSystemTheme() : themeHook.systemTheme;

  return {
    theme: safeTheme,
    setTheme: safeSetTheme,
    resolvedTheme: safeResolvedTheme,
    systemTheme: safeSystemTheme,
    mounted,
    error
  };
}

/**
 * Hook for theme with graceful degradation
 * Returns a safe theme value even when ThemeProvider is missing
 */
export function useThemeWithGracefulDegradation(): {
  theme: 'light' | 'dark';
  setTheme: (theme: string) => void;
  mounted: boolean;
} {
  const [mounted, setMounted] = useState(false);
  const [fallbackTheme, setFallbackTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);
    
    // Detect initial theme from document class or system preference
    try {
      if (typeof document !== 'undefined') {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          setFallbackTheme('dark');
        } else {
          // Check system preference
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setFallbackTheme(systemPrefersDark ? 'dark' : 'light');
        }
      }
    } catch (err) {
      console.warn('Failed to detect initial theme:', err);
    }
  }, []);

  // Try to use the theme hook, fall back to manual implementation
  try {
    const themeHook = useTheme();
    
    if (themeHook.theme !== undefined) {
      const resolvedTheme = themeHook.resolvedTheme === 'dark' ? 'dark' : 'light';
      return {
        theme: resolvedTheme,
        setTheme: themeHook.setTheme,
        mounted
      };
    }
  } catch (err) {
    console.warn('ThemeProvider not available, using fallback:', err);
  }

  // Fallback implementation
  const setTheme = useCallback((newTheme: string) => {
    const theme = newTheme === 'dark' ? 'dark' : 'light';
    setFallbackTheme(theme);
    
    try {
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
    } catch (err) {
      console.warn('Failed to apply fallback theme:', err);
    }
  }, []);

  return {
    theme: fallbackTheme,
    setTheme,
    mounted
  };
}