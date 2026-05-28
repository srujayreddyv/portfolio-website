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
    var theme = localStorage.getItem('portfolio-theme');
    var activeTheme = theme === 'dark' ? 'dark' : 'light';
    
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
 * Get the current theme from storage
 */
export function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  try {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored && ['light', 'dark'].includes(stored)) {
      return stored as 'light' | 'dark';
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  
  return 'light';
}

/**
 * Get the resolved theme from preference
 */
export function getResolvedTheme(preference: 'light' | 'dark'): 'light' | 'dark' {
  return preference;
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
export function storeTheme(theme: 'light' | 'dark'): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('portfolio-theme', theme);
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error);
  }
}

/**
 * Validate theme value
 */
export function isValidTheme(value: unknown): value is 'light' | 'dark' {
  return typeof value === 'string' && ['light', 'dark'].includes(value);
}
