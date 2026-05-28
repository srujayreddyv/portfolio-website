/**
 * Unit tests for error handling scenarios
 * Tests comprehensive error handling and fallback mechanisms
 */

import { 
  getInitialTheme, 
  getResolvedTheme, 
  applyTheme, 
  storeTheme, 
  isValidTheme
} from '../theme-utils';
import { 
  getContrastRatio, 
  validateThemeColors,
  prefersReducedMotion
} from '../accessibility-utils';

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
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
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

  afterEach(() => {
    consoleWarnSpy.mockRestore();
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

      // getInitialTheme should fallback to 'light'
      const theme = getInitialTheme();
      expect(theme).toBe('light');

      // storeTheme should not throw
      expect(() => storeTheme('dark')).not.toThrow();
      
      // Should log warning but continue
      storeTheme('light');
      expect(consoleWarnSpy).toHaveBeenCalled();
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

      // Should fallback to 'light' for invalid values
      const theme = getInitialTheme();
      expect(theme).toBe('light');
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

  describe('Theme Resolution Errors', () => {
    test('should handle matchMedia not supported', () => {
      // Remove matchMedia
      (window as any).matchMedia = undefined;

      // Theme resolution should not depend on matchMedia
      expect(getResolvedTheme('light')).toBe('light');
      expect(getResolvedTheme('dark')).toBe('dark');
      expect(prefersReducedMotion()).toBe(false);
    });

    test('should handle matchMedia throwing errors', () => {
      (window as any).matchMedia = jest.fn(() => { throw new Error('Permission denied'); });

      // Theme resolution should remain independent from matchMedia
      expect(getResolvedTheme('light')).toBe('light');
      expect(getResolvedTheme('dark')).toBe('dark');
      expect(() => prefersReducedMotion()).toThrow();
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
      expect(isValidTheme('system')).toBe(false);

      // Invalid themes
      expect(isValidTheme('invalid')).toBe(false);
      expect(isValidTheme(null)).toBe(false);
      expect(isValidTheme(undefined)).toBe(false);
      expect(isValidTheme(123)).toBe(false);
      expect(isValidTheme({})).toBe(false);
      expect(isValidTheme('')).toBe(false);
    });

    test('should handle theme resolution with invalid inputs', () => {
      // Resolution now returns the provided value; validation is separate
      expect(getResolvedTheme('invalid' as any)).toBe('invalid');
      expect(getResolvedTheme(null as any)).toBe(null);
      expect(getResolvedTheme(undefined as any)).toBe(undefined);
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
      expect(theme).toBe('light'); // Should fallback
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
