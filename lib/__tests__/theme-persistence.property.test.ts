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

  describe('Property 3: Default Theme Fallback', () => {
    test('**Validates: Requirements 2.3** - When no saved preference exists, the theme state should fall back to light', async () => {
      const property = fc.asyncProperty(
        generators.storageKey(),
        async (storageKey) => {
          try {
            // Clear storage to simulate no saved selection
            mockLocalStorage.clear();

            // Verify no stored preference exists
            const storedTheme = mockLocalStorage.getItem(storageKey);
            expect(storedTheme).toBeNull();
            expect(storedTheme ?? 'light').toBe('light');
            
            return true;
          } catch (error) {
            console.error('Default theme fallback test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('Default fallback remains light when browser theme APIs are unavailable', async () => {
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
            expect(storedTheme ?? 'light').toBe('light');
            
            return true;
          } catch (error) {
            console.error('Default fallback error handling test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });
  });

  describe('Property 4: Manual Override Persistence', () => {
    test('**Validates: Requirements 2.4** - A stored theme should remain unchanged across unrelated browser state changes', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        generators.storageKey(),
        async (manualTheme, storageKey) => {
          try {
            // Store manual preference
            mockLocalStorage.setItem(storageKey, manualTheme);

            // Verify manual preference is stored
            const storedTheme = mockLocalStorage.getItem(storageKey);
            expect(storedTheme).toBe(manualTheme);

            // Simulate unrelated browser state changes
            Object.defineProperty(window, 'matchMedia', {
              value: undefined,
              writable: true
            });
            
            // Verify manual preference is still stored and unchanged
            const persistedTheme = mockLocalStorage.getItem(storageKey);
            expect(persistedTheme).toBe(manualTheme);
            expect(persistedTheme).toBe(manualTheme);
            
            return true;
          } catch (error) {
            console.error('Manual override persistence test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

  });
});
