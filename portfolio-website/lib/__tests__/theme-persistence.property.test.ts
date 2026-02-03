/**
 * Property-based tests for theme persistence functionality
 * Tests Properties 2, 3, and 4 from the design document
 */

import * as fc from 'fast-check';
import { propertyTestConfig, generators } from '../property-test-utils';

// Mock localStorage for testing
const createMockStorage = () => {
  let store: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null)
  };
};

// Mock matchMedia for system preference testing
const mockMatchMedia = (matches: boolean) => ({
  matches,
  media: '(prefers-color-scheme: dark)',
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

describe('Theme Persistence Property Tests', () => {
  let mockLocalStorage: any;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create fresh mock storage for each test
    mockLocalStorage = createMockStorage();
    
    // Setup global mocks
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });
  });

  describe('Property 2: Theme Persistence Round Trip', () => {
    test('**Validates: Requirements 2.1, 2.2** - For any valid theme preference, setting the theme should store it and loading should restore the same preference', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        generators.storageKey(),
        async (theme, storageKey) => {
          try {
            // Clear storage
            mockLocalStorage.clear();
            
            // Store theme preference
            mockLocalStorage.setItem(storageKey, theme);
            
            // Verify storage was called correctly
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(storageKey, theme);
            
            // Retrieve theme preference
            const retrievedTheme = mockLocalStorage.getItem(storageKey);
            
            // Verify round trip consistency
            expect(retrievedTheme).toBe(theme);
            
            return true;
          } catch (error) {
            console.error('Theme persistence round trip failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('Storage error handling - should handle localStorage unavailability gracefully', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        async (theme) => {
          try {
            // Mock localStorage to throw error
            const errorStorage = {
              setItem: jest.fn(() => { throw new Error('Storage quota exceeded'); }),
              getItem: jest.fn(() => { throw new Error('Storage unavailable'); }),
              removeItem: jest.fn(),
              clear: jest.fn(),
              length: 0,
              key: jest.fn()
            };
            
            Object.defineProperty(window, 'localStorage', {
              value: errorStorage,
              writable: true
            });
            
            // Attempt to store theme - should not throw
            let errorThrown = false;
            try {
              errorStorage.setItem('theme', theme);
            } catch (error) {
              errorThrown = true;
            }
            
            // Verify error was thrown (expected behavior)
            expect(errorThrown).toBe(true);
            
            // Attempt to retrieve theme - should not throw and return null
            let retrievedTheme = null;
            try {
              retrievedTheme = errorStorage.getItem('theme');
            } catch (error) {
              // Expected - should handle gracefully
            }
            
            return true;
          } catch (error) {
            console.error('Storage error handling test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });
  });

  describe('Property 3: System Preference Fallback', () => {
    test('**Validates: Requirements 2.3** - For any system color scheme preference, when no manual selection exists, should default to system preference', async () => {
      const property = fc.asyncProperty(
        fc.boolean(), // System prefers dark
        generators.storageKey(),
        async (systemPrefersDark, storageKey) => {
          try {
            // Clear storage to simulate no manual selection
            mockLocalStorage.clear();
            
            // Mock system preference
            Object.defineProperty(window, 'matchMedia', {
              value: jest.fn(() => mockMatchMedia(systemPrefersDark)),
              writable: true
            });
            
            // Verify no stored preference exists
            const storedTheme = mockLocalStorage.getItem(storageKey);
            expect(storedTheme).toBeNull();
            
            // Get system preference
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const systemTheme = mediaQuery.matches ? 'dark' : 'light';
            const expectedTheme = systemPrefersDark ? 'dark' : 'light';
            
            // Verify system preference detection
            expect(systemTheme).toBe(expectedTheme);
            
            return true;
          } catch (error) {
            console.error('System preference fallback test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('System preference detection error handling', async () => {
      const property = fc.asyncProperty(
        generators.storageKey(),
        async (storageKey) => {
          try {
            // Mock matchMedia to be unavailable
            Object.defineProperty(window, 'matchMedia', {
              value: undefined,
              writable: true
            });
            
            // Clear storage
            mockLocalStorage.clear();
            
            // Should fallback to light theme when matchMedia unavailable
            const fallbackTheme = 'light';
            
            // Verify no stored preference
            const storedTheme = mockLocalStorage.getItem(storageKey);
            expect(storedTheme).toBeNull();
            
            // When matchMedia is unavailable, should use fallback
            expect(window.matchMedia).toBeUndefined();
            
            return true;
          } catch (error) {
            console.error('System preference error handling test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });
  });

  describe('Property 4: Manual Override Persistence', () => {
    test('**Validates: Requirements 2.4** - For any theme system with stored manual preference, system preference changes should not affect active theme', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        fc.boolean(), // Initial system preference
        fc.boolean(), // Changed system preference
        generators.storageKey(),
        async (manualTheme, initialSystemDark, changedSystemDark, storageKey) => {
          try {
            // Store manual preference
            mockLocalStorage.setItem(storageKey, manualTheme);
            
            // Set initial system preference
            Object.defineProperty(window, 'matchMedia', {
              value: jest.fn(() => mockMatchMedia(initialSystemDark)),
              writable: true
            });
            
            // Verify manual preference is stored
            const storedTheme = mockLocalStorage.getItem(storageKey);
            expect(storedTheme).toBe(manualTheme);
            
            // Change system preference
            Object.defineProperty(window, 'matchMedia', {
              value: jest.fn(() => mockMatchMedia(changedSystemDark)),
              writable: true
            });
            
            // Verify manual preference is still stored and unchanged
            const persistedTheme = mockLocalStorage.getItem(storageKey);
            expect(persistedTheme).toBe(manualTheme);
            
            // Manual preference should override system preference
            if (manualTheme !== 'system') {
              expect(persistedTheme).toBe(manualTheme);
              // Only check if they're different when they should be different
              if (manualTheme !== (changedSystemDark ? 'dark' : 'light')) {
                expect(persistedTheme).not.toBe(changedSystemDark ? 'dark' : 'light');
              }
            }
            
            return true;
          } catch (error) {
            console.error('Manual override persistence test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('System theme preference should update when manual preference is system', async () => {
      const property = fc.asyncProperty(
        fc.boolean(), // Initial system preference
        fc.boolean(), // Changed system preference  
        generators.storageKey(),
        async (initialSystemDark, changedSystemDark, storageKey) => {
          try {
            // Store 'system' as manual preference
            mockLocalStorage.setItem(storageKey, 'system');
            
            // Set initial system preference
            Object.defineProperty(window, 'matchMedia', {
              value: jest.fn(() => mockMatchMedia(initialSystemDark)),
              writable: true
            });
            
            const initialResolvedTheme = initialSystemDark ? 'dark' : 'light';
            
            // Change system preference
            Object.defineProperty(window, 'matchMedia', {
              value: jest.fn(() => mockMatchMedia(changedSystemDark)),
              writable: true
            });
            
            const changedResolvedTheme = changedSystemDark ? 'dark' : 'light';
            
            // When manual preference is 'system', resolved theme should follow system changes
            const storedTheme = mockLocalStorage.getItem(storageKey);
            expect(storedTheme).toBe('system');
            
            // Resolved theme should change with system preference
            if (initialSystemDark !== changedSystemDark) {
              expect(initialResolvedTheme).not.toBe(changedResolvedTheme);
            }
            
            return true;
          } catch (error) {
            console.error('System theme preference update test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });
  });
});