/**
 * Theme utilities for preventing FOUC and managing theme state
 */

/**
 * Script to prevent FOUC by setting theme class before hydration
 * This should be injected into the document head
 */
export const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var activeTheme = theme === 'system' || !theme ? systemTheme : theme;
    
    if (activeTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Prevent flash by ensuring theme is applied before content renders
    document.documentElement.style.colorScheme = activeTheme;
  } catch (e) {
    // Fallback to light theme if there's any error
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
})();
`;

/**
 * Get the current theme from storage or system preference
 */
export function getInitialTheme(): 'light' | 'dark' | 'system' {
  if (typeof window === 'undefined') return 'system';
  
  try {
    const stored = localStorage.getItem('theme');
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as 'light' | 'dark' | 'system';
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  
  return 'system';
}

/**
 * Get the resolved theme (light or dark) from preference
 */
export function getResolvedTheme(preference: 'light' | 'dark' | 'system'): 'light' | 'dark' {
  if (preference !== 'system') return preference;
  
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Apply theme classes to document element
 */
export function applyTheme(theme: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  root.style.colorScheme = theme;
}

/**
 * Store theme preference in localStorage
 */
export function storeTheme(theme: 'light' | 'dark' | 'system'): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error);
  }
}

/**
 * Listen for system theme changes
 */
export function watchSystemTheme(callback: (isDark: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  
  mediaQuery.addEventListener('change', handler);
  
  return () => mediaQuery.removeEventListener('change', handler);
}

/**
 * Validate theme value
 */
export function isValidTheme(value: unknown): value is 'light' | 'dark' | 'system' {
  return typeof value === 'string' && ['light', 'dark', 'system'].includes(value);
}

/**
 * Get theme-aware CSS custom properties
 */
export function getThemeProperties(theme: 'light' | 'dark'): Record<string, string> {
  const lightTheme = {
    '--background': '255 255 255',
    '--foreground': '0 0 0',
    '--primary': '59 130 246',
    '--primary-foreground': '255 255 255',
    '--secondary': '243 244 246',
    '--secondary-foreground': '17 24 39',
    '--muted': '243 244 246',
    '--muted-foreground': '107 114 128',
    '--border': '229 231 235',
    '--input': '229 231 235',
    '--ring': '59 130 246'
  };
  
  const darkTheme = {
    '--background': '17 24 39',
    '--foreground': '255 255 255',
    '--primary': '96 165 250',
    '--primary-foreground': '17 24 39',
    '--secondary': '31 41 55',
    '--secondary-foreground': '243 244 246',
    '--muted': '31 41 55',
    '--muted-foreground': '156 163 175',
    '--border': '55 65 81',
    '--input': '55 65 81',
    '--ring': '96 165 250'
  };
  
  return theme === 'dark' ? darkTheme : lightTheme;
}

/**
 * Apply CSS custom properties to document
 */
export function applyThemeProperties(theme: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return;
  
  const properties = getThemeProperties(theme);
  const root = document.documentElement;
  
  Object.entries(properties).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}