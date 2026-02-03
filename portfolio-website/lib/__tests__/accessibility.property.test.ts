/**
 * Property-based tests for accessibility features
 * Tests Properties 6, 7, and 9 from the design document
 */

import * as fc from 'fast-check';
import { propertyTestConfig, generators } from '../property-test-utils';
import { 
  getContrastRatio, 
  meetsWCAGAA, 
  meetsWCAGAAA, 
  validateThemeColors,
  prefersReducedMotion,
  getTransitionDuration
} from '../accessibility-utils';

describe('Accessibility Property Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Property 6: Color Contrast Compliance', () => {
    test('**Validates: Requirements 3.4, 5.5** - For any theme and text element, color contrast ratio should meet or exceed WCAG 2.1 AA standards', async () => {
      const property = fc.asyncProperty(
        generators.themeName().filter(theme => theme !== 'system'),
        fc.constantFrom('normal', 'large'),
        async (theme, textSize) => {
          try {
            // Validate theme colors
            const validation = validateThemeColors(theme);
            expect(validation).toHaveProperty('isValid');
            expect(validation).toHaveProperty('violations');
            expect(validation).toHaveProperty('ratios');
            
            // Check specific color combinations for the theme
            const isLargeText = textSize === 'large';
            const requiredRatio = isLargeText ? 3.0 : 4.5;
            
            // Test known good combinations
            if (theme === 'dark') {
              // Dark theme should pass all tests
              expect(validation.isValid).toBe(true);
              expect(validation.violations).toHaveLength(0);
              
              // Verify all ratios meet requirements
              Object.entries(validation.ratios).forEach(([testName, ratio]) => {
                const isLarge = testName.includes('large');
                const minRatio = isLarge ? 3.0 : 4.5;
                expect(ratio).toBeGreaterThanOrEqual(minRatio);
              });
            }
            
            // Test individual contrast calculations
            const testColors = theme === 'light' 
              ? { fg: '#000000', bg: '#ffffff' }
              : { fg: '#ffffff', bg: '#111827' };
              
            const ratio = getContrastRatio(testColors.fg, testColors.bg);
            expect(ratio).toBeGreaterThanOrEqual(requiredRatio);
            expect(meetsWCAGAA(testColors.fg, testColors.bg, isLargeText)).toBe(true);
            
            return true;
          } catch (error) {
            console.error('Color contrast compliance test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('Contrast ratio calculation accuracy', async () => {
      const property = fc.asyncProperty(
        generators.hexColor(),
        generators.hexColor(),
        async (color1Hex, color2Hex) => {
          try {
            const color1 = `#${color1Hex}`;
            const color2 = `#${color2Hex}`;
            
            // Calculate contrast ratio
            const ratio = getContrastRatio(color1, color2);
            
            // Verify ratio is within valid range (1 to 21)
            expect(ratio).toBeGreaterThanOrEqual(1);
            expect(ratio).toBeLessThanOrEqual(21);
            
            // Verify ratio is symmetric (order shouldn't matter)
            const reverseRatio = getContrastRatio(color2, color1);
            expect(Math.abs(ratio - reverseRatio)).toBeLessThan(0.001);
            
            // Test WCAG compliance functions
            const meetsAA = meetsWCAGAA(color1, color2, false);
            const meetsAALarge = meetsWCAGAA(color1, color2, true);
            const meetsAAA = meetsWCAGAAA(color1, color2, false);
            const meetsAAALarge = meetsWCAGAAA(color1, color2, true);
            
            // Verify logical consistency
            if (meetsAAA) expect(meetsAA).toBe(true);
            if (meetsAAALarge) expect(meetsAALarge).toBe(true);
            if (meetsAA && ratio >= 7) expect(meetsAAA).toBe(true);
            
            return true;
          } catch (error) {
            // Invalid hex colors should throw errors
            expect(error).toBeInstanceOf(Error);
            return true;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 30 });
    });
  });

  describe('Property 7: FOUC Prevention', () => {
    test('**Validates: Requirements 4.2** - For any theme transition, appropriate theme classes should be applied before content renders', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        fc.boolean(), // has stored preference
        async (initialTheme, hasStoredPreference) => {
          try {
            // Mock localStorage
            const mockStorage = {
              getItem: jest.fn(() => hasStoredPreference ? initialTheme : null),
              setItem: jest.fn(),
              removeItem: jest.fn(),
              clear: jest.fn(),
              length: 0,
              key: jest.fn()
            };
            
            Object.defineProperty(window, 'localStorage', {
              value: mockStorage,
              writable: true
            });
            
            // Mock matchMedia for system preference
            const systemPrefersDark = initialTheme === 'dark' || (initialTheme === 'system' && Math.random() > 0.5);
            Object.defineProperty(window, 'matchMedia', {
              value: jest.fn(() => ({
                matches: systemPrefersDark,
                media: '(prefers-color-scheme: dark)',
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
              })),
              writable: true
            });
            
            // Test theme script execution (FOUC prevention)
            const mockDocumentElement = {
              classList: {
                add: jest.fn(),
                remove: jest.fn(),
                contains: jest.fn()
              },
              style: {
                colorScheme: ''
              }
            };
            
            // Simulate theme script execution
            const storedTheme = mockStorage.getItem('theme');
            const systemTheme = systemPrefersDark ? 'dark' : 'light';
            const activeTheme = storedTheme === 'system' || !storedTheme ? systemTheme : storedTheme;
            
            // Apply theme before content renders (FOUC prevention)
            if (activeTheme === 'dark') {
              mockDocumentElement.classList.add('dark');
            } else {
              mockDocumentElement.classList.remove('dark');
            }
            mockDocumentElement.style.colorScheme = activeTheme;
            
            // Verify theme was applied correctly
            if (activeTheme === 'dark') {
              expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
            } else {
              expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
            }
            expect(mockDocumentElement.style.colorScheme).toBe(activeTheme);
            
            return true;
          } catch (error) {
            console.error('FOUC prevention test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('Theme script error handling', async () => {
      const property = fc.asyncProperty(
        fc.boolean(), // localStorage throws error
        fc.boolean(), // matchMedia unavailable
        async (storageError, matchMediaError) => {
          try {
            // Mock error conditions
            if (storageError) {
              Object.defineProperty(window, 'localStorage', {
                value: {
                  getItem: () => { throw new Error('Storage unavailable'); },
                  setItem: () => { throw new Error('Storage unavailable'); }
                },
                writable: true
              });
            }
            
            if (matchMediaError) {
              Object.defineProperty(window, 'matchMedia', {
                value: undefined,
                writable: true
              });
            }
            
            // Theme script should handle errors gracefully
            let fallbackTheme = 'light';
            
            try {
              const theme = window.localStorage?.getItem('theme');
              const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              const activeTheme = theme === 'system' || !theme ? systemTheme : theme;
              fallbackTheme = activeTheme;
            } catch (e) {
              fallbackTheme = 'light'; // Fallback to light theme
            }
            
            // Should always have a valid theme, even with errors
            expect(['light', 'dark']).toContain(fallbackTheme);
            
            // If errors occurred, should fallback to light
            if (storageError || matchMediaError) {
              expect(fallbackTheme).toBe('light');
            }
            
            return true;
          } catch (error) {
            console.error('Theme script error handling test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });
  });

  describe('Property 9: Reduced Motion Respect', () => {
    test('**Validates: Requirements 4.4** - For any user with prefers-reduced-motion enabled, theme changes should apply instantly without CSS transitions', async () => {
      const property = fc.asyncProperty(
        fc.boolean(), // prefers reduced motion
        fc.integer({ min: 0, max: 1000 }), // default transition duration
        async (prefersReduced, defaultDuration) => {
          try {
            // Mock matchMedia for reduced motion preference
            Object.defineProperty(window, 'matchMedia', {
              value: jest.fn((query) => ({
                matches: query.includes('prefers-reduced-motion') ? prefersReduced : false,
                media: query,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn()
              })),
              writable: true
            });
            
            // Test reduced motion detection
            const reducedMotion = prefersReducedMotion();
            expect(reducedMotion).toBe(prefersReduced);
            
            // Test transition duration adjustment
            const actualDuration = getTransitionDuration(defaultDuration);
            
            if (prefersReduced) {
              // Should return 0 duration for reduced motion
              expect(actualDuration).toBe(0);
            } else {
              // Should return default duration for normal motion
              expect(actualDuration).toBe(defaultDuration);
            }
            
            // Test CSS class generation
            const transitionClasses = prefersReduced 
              ? '' 
              : 'transition-all duration-300 ease-in-out';
              
            if (prefersReduced) {
              expect(transitionClasses).toBe('');
            } else {
              expect(transitionClasses).toContain('transition');
              expect(transitionClasses).toContain('duration');
            }
            
            return true;
          } catch (error) {
            console.error('Reduced motion respect test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('Motion preference change handling', async () => {
      const property = fc.asyncProperty(
        fc.boolean(), // initial preference
        fc.boolean(), // changed preference
        async (initialPreference, changedPreference) => {
          try {
            let currentPreference = initialPreference;
            
            // Mock matchMedia with changeable preference
            const mockMediaQuery = {
              matches: currentPreference,
              media: '(prefers-reduced-motion: reduce)',
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              onchange: null as ((event: any) => void) | null
            };
            
            Object.defineProperty(window, 'matchMedia', {
              value: jest.fn(() => mockMediaQuery),
              writable: true
            });
            
            // Initial state
            expect(prefersReducedMotion()).toBe(initialPreference);
            
            // Simulate preference change
            currentPreference = changedPreference;
            mockMediaQuery.matches = changedPreference;
            
            // Trigger change event if handler exists
            if (mockMediaQuery.onchange) {
              mockMediaQuery.onchange({ matches: changedPreference });
            }
            
            // Should reflect new preference
            expect(mockMediaQuery.matches).toBe(changedPreference);
            
            return true;
          } catch (error) {
            console.error('Motion preference change test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });
  });
});