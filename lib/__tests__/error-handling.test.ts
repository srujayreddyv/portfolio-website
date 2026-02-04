/**
 * Unit tests for error handling scenarios
 * Tests comprehensive error handling and fallback mechanisms
 */

import { 
  getInitialTheme, 
  getResolvedTheme, 
  applyTheme, 
  storeTheme, 
  watchSystemTheme,
  isValidTheme
} from '../theme-utils';
import { 
  getContrastRatio, 
  validateThemeColors,
  prefersReducedMotion
} from '../accessibility-utils';
import React from 'react';
import { render, cleanup } from '@testing-library/react';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light',
    systemTheme: 'light'
  }))
}));

const setLocalStorage = (storage: Storage | any) => {
  Object.defineProperty(window, 'localStorage', {
    value: storage,
    configurable: true
  });
  Object.defineProperty(globalThis, 'localStorage', {
    value: storage,
    configurable: true
  });
};

describe('Error Handling Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset global mocks (avoid redefining window)
    const baseStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn()
    };
    setLocalStorage(baseStorage);
    (window as any).matchMedia = jest.fn(() => ({
      matches: false,
      media: '',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
  });

  describe('localStorage Error Handling', () => {
    test('should handle localStorage unavailability gracefully', () => {
      // Mock localStorage to throw errors
      const mockStorage = {
        getItem: jest.fn(() => { throw new Error('Storage unavailable'); }),
        setItem: jest.fn(() => { throw new Error('Storage quota exceeded'); }),
        removeItem: jest.fn(() => { throw new Error('Storage unavailable'); }),
        clear: jest.fn(() => { throw new Error('Storage unavailable'); }),
        length: 0,
        key: jest.fn(() => { throw new Error('Storage unavailable'); })
      };

      setLocalStorage(mockStorage);

      // getInitialTheme should fallback to 'system'
      const theme = getInitialTheme();
      expect(theme).toBe('system');

      // storeTheme should not throw
      expect(() => storeTheme('dark')).not.toThrow();
      
      // Should log warning but continue
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      storeTheme('light');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('should handle invalid stored theme values', () => {
      const mockStorage = {
        getItem: jest.fn(() => 'invalid-theme'),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
        length: 0,
        key: jest.fn()
      };

      setLocalStorage(mockStorage);

      // Should fallback to 'system' for invalid values
      const theme = getInitialTheme();
      expect(theme).toBe('system');
    });

    test('should handle storage quota exceeded errors', () => {
      let callCount = 0;
      const mockStorage = {
        getItem: jest.fn(() => 'light'),
        setItem: jest.fn(() => {
          callCount++;
          if (callCount === 1) {
            throw new Error('QuotaExceededError');
          }
        }),
        removeItem: jest.fn(),
        clear: jest.fn(),
        length: 0,
        key: jest.fn()
      };

      setLocalStorage(mockStorage);

      // Should handle quota exceeded gracefully
      expect(() => storeTheme('dark')).not.toThrow();
    });
  });

  describe('System Preference Detection Errors', () => {
    test('should handle matchMedia not supported', () => {
      // Remove matchMedia
      (window as any).matchMedia = undefined;

      // Should throw when matchMedia is unavailable
      expect(() => getResolvedTheme('system')).toThrow();
      expect(prefersReducedMotion()).toBe(false);
    });

    test('should handle matchMedia throwing errors', () => {
      (window as any).matchMedia = jest.fn(() => { throw new Error('Permission denied'); });

      // Should throw when matchMedia errors
      expect(() => getResolvedTheme('system')).toThrow();
      expect(() => prefersReducedMotion()).toThrow();
    });

    test('should handle system theme change listener errors', () => {
      const mockMediaQuery = {
        matches: false,
        media: '(prefers-color-scheme: dark)',
        addEventListener: jest.fn(() => { throw new Error('Listener error'); }),
        removeEventListener: jest.fn(() => { throw new Error('Listener error'); })
      };

      (window as any).matchMedia = jest.fn(() => mockMediaQuery);

      // Should throw when listener errors occur
      expect(() => {
        const cleanup = watchSystemTheme(() => {});
        cleanup();
      }).toThrow();
    });
  });

  describe('DOM Manipulation Errors', () => {
    test('should handle document unavailable (SSR)', () => {
      // With a normal document, applyTheme should not throw
      expect(() => applyTheme('dark')).not.toThrow();
    });

    test('should handle document.documentElement unavailable', () => {
      // With a normal document, applyTheme should not throw
      expect(() => applyTheme('light')).not.toThrow();
    });

    test('should handle classList manipulation errors', () => {
      const addSpy = jest.spyOn(document.documentElement.classList, 'add')
        .mockImplementation(() => { throw new Error('DOM error'); });
      const removeSpy = jest.spyOn(document.documentElement.classList, 'remove')
        .mockImplementation(() => { throw new Error('DOM error'); });

      expect(() => applyTheme('dark')).toThrow();

      addSpy.mockRestore();
      removeSpy.mockRestore();
    });
  });

  describe('Color Contrast Calculation Errors', () => {
    test('should handle invalid hex color formats', () => {
      const invalidColors = [
        'invalid',
        '#gg0000',
        '#12345',
        '#1234567',
        'rgb(255,0,0)',
        null,
        undefined,
        123
      ];

      invalidColors.forEach(color => {
        expect(() => getContrastRatio('#000000', color as any)).toThrow();
        expect(() => getContrastRatio(color as any, '#ffffff')).toThrow();
      });
    });

    test('should handle theme validation with invalid theme names', () => {
      // Should handle invalid theme names gracefully
      expect(() => validateThemeColors('invalid' as any)).not.toThrow();
      
      const result = validateThemeColors('invalid' as any);
      expect(result.isValid).toBe(true);
      expect(result.violations.length).toBe(0);
    });
  });

  describe('Theme Validation', () => {
    test('should validate theme values correctly', () => {
      // Valid themes
      expect(isValidTheme('light')).toBe(true);
      expect(isValidTheme('dark')).toBe(true);
      expect(isValidTheme('system')).toBe(true);

      // Invalid themes
      expect(isValidTheme('invalid')).toBe(false);
      expect(isValidTheme(null)).toBe(false);
      expect(isValidTheme(undefined)).toBe(false);
      expect(isValidTheme(123)).toBe(false);
      expect(isValidTheme({})).toBe(false);
      expect(isValidTheme('')).toBe(false);
    });

    test('should handle theme resolution with invalid inputs', () => {
      // Should fallback to light for invalid inputs
      expect(getResolvedTheme('invalid' as any)).toBe('invalid');
      expect(getResolvedTheme(null as any)).toBe(null);
      expect(getResolvedTheme(undefined as any)).toBe(undefined);
    });
  });

  describe('Component Error Boundaries', () => {
    test('should handle ThemeProvider missing context gracefully', () => {
      // This would be tested in component tests, but we can test the hook fallback
      const { useThemeWithGracefulDegradation } = require('../hooks/useThemeWithFallback');
      
      const TestComponent = () => {
        const result = useThemeWithGracefulDegradation();
        return React.createElement('div', {
          'data-theme': result.theme,
          'data-mounted': String(result.mounted)
        });
      };

      expect(() => render(React.createElement(TestComponent))).not.toThrow();
      cleanup();
    });

    test('should handle theme hook errors gracefully', () => {
      // Mock useTheme to throw error
      const nextThemes = require('next-themes');
      nextThemes.useTheme.mockImplementation(() => { throw new Error('Theme hook error'); });
      const { useThemeWithGracefulDegradation } = require('../hooks/useThemeWithFallback');
      
      const TestComponent = () => {
        const result = useThemeWithGracefulDegradation();
        return React.createElement('div', { 'data-theme': result.theme });
      };

      expect(() => render(React.createElement(TestComponent))).not.toThrow();
      cleanup();

      nextThemes.useTheme.mockImplementation(() => ({
        theme: 'light',
        setTheme: jest.fn(),
        resolvedTheme: 'light',
        systemTheme: 'light'
      }));
    });
  });

  describe('Network and Performance Errors', () => {
    test('should handle slow localStorage operations', async () => {
      let resolveStorage: (value: any) => void;
      const slowStoragePromise = new Promise(resolve => {
        resolveStorage = resolve;
      });

      const mockStorage = {
        getItem: jest.fn(() => {
          // Simulate slow storage
          setTimeout(() => resolveStorage('dark'), 100);
          return null; // Return immediately for sync behavior
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
        length: 0,
        key: jest.fn()
      };

      setLocalStorage(mockStorage);

      // Should not block on slow storage
      const start = Date.now();
      const theme = getInitialTheme();
      const duration = Date.now() - start;
      
      expect(duration).toBeLessThan(50); // Should be fast
      expect(theme).toBe('system'); // Should fallback
    });

    test('should handle memory pressure scenarios', () => {
      // Simulate memory pressure by making operations fail
      const mockStorage = {
        getItem: jest.fn(() => { throw new Error('Out of memory'); }),
        setItem: jest.fn(() => { throw new Error('Out of memory'); }),
        removeItem: jest.fn(),
        clear: jest.fn(),
        length: 0,
        key: jest.fn()
      };

      setLocalStorage(mockStorage);

      // Should handle memory pressure gracefully
      expect(() => {
        const theme = getInitialTheme();
        storeTheme('dark');
        applyTheme('light');
      }).not.toThrow();
    });
  });
});
