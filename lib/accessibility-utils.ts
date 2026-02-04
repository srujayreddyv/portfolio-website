import React from 'react';

/**
 * Accessibility utilities for theme system
 * Provides color contrast validation and reduced motion support
 */

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 guidelines
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    throw new Error('Invalid color format. Use hex colors like #ffffff');
  }
  
  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAGAAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Validate theme colors against WCAG standards
 */
export function validateThemeColors(theme: 'light' | 'dark'): {
  isValid: boolean;
  violations: string[];
  ratios: Record<string, number>;
} {
  const violations: string[] = [];
  const ratios: Record<string, number> = {};
  
  // Define theme colors
  const colors = theme === 'light' ? {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#3b82f6',
    secondary: '#6b7280',
    muted: '#f3f4f6',
    mutedForeground: '#6b7280'
  } : {
    background: '#111827',
    foreground: '#ffffff',
    primary: '#60a5fa',
    secondary: '#9ca3af',
    muted: '#1f2937',
    mutedForeground: '#9ca3af'
  };
  
  // Test combinations
  const tests = [
    { name: 'body-text', fg: colors.foreground, bg: colors.background, large: false },
    { name: 'primary-text', fg: colors.primary, bg: colors.background, large: false },
    { name: 'secondary-text', fg: colors.secondary, bg: colors.background, large: false },
    { name: 'muted-text', fg: colors.mutedForeground, bg: colors.muted, large: false },
    { name: 'large-text', fg: colors.foreground, bg: colors.background, large: true }
  ];
  
  tests.forEach(test => {
    try {
      const ratio = getContrastRatio(test.fg, test.bg);
      ratios[test.name] = ratio;
      
      if (!meetsWCAGAA(test.fg, test.bg, test.large)) {
        violations.push(`${test.name}: ${ratio.toFixed(2)} (requires ${test.large ? '3.0' : '4.5'})`);
      }
    } catch (error) {
      violations.push(`${test.name}: Error calculating ratio - ${error}`);
    }
  });
  
  return {
    isValid: violations.length === 0,
    violations,
    ratios
  };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.matchMedia) return false; // Handle test environment
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get appropriate transition duration based on user preference
 */
export function getTransitionDuration(defaultMs = 300): number {
  return prefersReducedMotion() ? 0 : defaultMs;
}

/**
 * CSS class helper for reduced motion
 */
export function getTransitionClasses(
  defaultClasses: string,
  reducedMotionClasses = ''
): string {
  if (typeof window === 'undefined') return defaultClasses;
  
  return prefersReducedMotion() ? reducedMotionClasses : defaultClasses;
}

/**
 * Hook for reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}
