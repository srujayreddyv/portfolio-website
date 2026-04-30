/**
 * Theme utilities for preventing FOUC and managing theme state.
 *
 * Default surface is dark (System Architect direction). Users can opt
 * into light or sky via the theme toggle; preferences persist in
 * localStorage under the key `portfolio-theme`.
 */

/**
 * Script to prevent FOUC by setting theme class before hydration.
 * Injected synchronously into <head>.
 *
 * Resolution order:
 *   1. Stored preference (`portfolio-theme` in localStorage)
 *   2. Falls through to dark — System Architect is dark by default.
 *
 * Note: legacy users with `theme=system` are honored; otherwise we
 * intentionally do NOT consult prefers-color-scheme — the design is
 * dark-first.
 */
export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved;

    if (stored === 'light') {
      resolved = 'light';
    } else if (stored === 'sky') {
      resolved = 'sky';
    } else if (stored === 'system') {
      resolved = systemPrefersDark ? 'dark' : 'light';
    } else {
      // No preference (or stored === 'dark') → dark default.
      resolved = 'dark';
    }

    var root = document.documentElement;
    root.classList.remove('light', 'dark', 'sky');

    if (resolved === 'sky') {
      root.classList.add('sky', 'dark');
      root.style.colorScheme = 'dark';
    } else if (resolved === 'light') {
      root.classList.add('light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    }
  } catch (e) {
    // Fail safe to dark — matches the default visual.
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`;

export type ThemePreference = 'light' | 'dark' | 'sky' | 'system';
export type ResolvedTheme = 'light' | 'dark' | 'sky';

const STORAGE_KEY = 'portfolio-theme';
const VALID_THEMES: ThemePreference[] = ['light', 'dark', 'sky', 'system'];

/**
 * Get the current theme preference from storage.
 * Returns 'dark' when nothing is stored — System Architect is dark-first.
 */
export function getInitialTheme(): ThemePreference {
  if (typeof window === 'undefined') return 'dark';

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_THEMES.includes(stored as ThemePreference)) {
      return stored as ThemePreference;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }

  return 'dark';
}

/**
 * Resolve a preference to a concrete applied theme.
 * 'system' resolves via prefers-color-scheme; everything else is identity.
 */
export function getResolvedTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === 'light' || preference === 'dark' || preference === 'sky') {
    return preference;
  }

  // preference === 'system'
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Apply theme classes to the document element.
 */
export function applyTheme(theme: ResolvedTheme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.classList.remove('light', 'dark', 'sky');

  if (theme === 'sky') {
    root.classList.add('sky', 'dark');
    root.style.colorScheme = 'dark';
  } else if (theme === 'light') {
    root.classList.add('light');
    root.style.colorScheme = 'light';
  } else {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  }
}

/**
 * Persist theme preference to localStorage.
 */
export function storeTheme(theme: ThemePreference): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error);
  }
}

/**
 * Subscribe to system theme changes. Returns an unsubscribe fn.
 */
export function watchSystemTheme(callback: (isDark: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches);

  mediaQuery.addEventListener('change', handler);

  return () => mediaQuery.removeEventListener('change', handler);
}

/**
 * Type guard for theme preference values.
 */
export function isValidTheme(value: unknown): value is ThemePreference {
  return typeof value === 'string' && VALID_THEMES.includes(value as ThemePreference);
}
