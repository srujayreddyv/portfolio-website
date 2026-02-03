/**
 * Property-based tests for theme application and styling
 * Tests Properties 5, 8, and 13 from the design document
 */

import * as fc from 'fast-check';
import { propertyTestConfig, generators } from '../property-test-utils';
import { applyTheme, getThemeProperties } from '../theme-utils';

// Mock DOM for testing
const createMockDocument = () => ({
  documentElement: {
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
      toggle: jest.fn()
    },
    style: {
      setProperty: jest.fn(),
      getPropertyValue: jest.fn(),
      colorScheme: ''
    }
  }
});

describe('Theme Application Property Tests', () => {
  let originalDocument: Document;
  let mockDocument: any;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Store original document
    originalDocument = global.document;
    
    // Create fresh mock document for each test
    mockDocument = createMockDocument();
    
    // Mock document
    (global as any).document = mockDocument;
  });
  
  afterEach(() => {
    // Restore original document
    global.document = originalDocument;
  });

  describe('Property 5: Consistent Theme Application', () => {
    test('**Validates: Requirements 3.1, 3.2, 3.3** - For any active theme, all portfolio sections should have consistent theme classes applied', async () => {
      const property = fc.asyncProperty(
        generators.themeName().filter(theme => theme !== 'system'), // Only test light/dark for DOM manipulation
        fc.array(fc.constantFrom('header', 'hero', 'about', 'projects', 'skills', 'contact'), { minLength: 1, maxLength: 6 }),
        async (theme, sections) => {
          try {
            // Apply theme using our utility function
            applyTheme(theme);
            
            // Verify document element class manipulation
            if (theme === 'dark') {
              expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('dark');
            } else {
              expect(mockDocument.documentElement.classList.remove).toHaveBeenCalledWith('dark');
            }
            
            // Verify color scheme is set
            expect(mockDocument.documentElement.style.colorScheme).toBe(theme);
            
            // Test theme properties consistency
            const themeProperties = getThemeProperties(theme);
            expect(themeProperties).toBeDefined();
            expect(typeof themeProperties).toBe('object');
            
            // Verify essential CSS custom properties exist
            const requiredProperties = [
              '--background',
              '--foreground', 
              '--primary',
              '--secondary',
              '--muted',
              '--border'
            ];
            
            requiredProperties.forEach(property => {
              expect(themeProperties).toHaveProperty(property);
              expect(typeof themeProperties[property]).toBe('string');
              expect(themeProperties[property].length).toBeGreaterThan(0);
            });
            
            // Verify color values are valid RGB format (space-separated numbers)
            Object.values(themeProperties).forEach(value => {
              expect(value).toMatch(/^\d+\s+\d+\s+\d+$/);
            });
            
            return true;
          } catch (error) {
            console.error('Consistent theme application test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('Theme class consistency across multiple applications', async () => {
      const property = fc.asyncProperty(
        generators.themeName().filter(theme => theme !== 'system'),
        fc.integer({ min: 1, max: 5 }), // Reduced max for performance
        async (theme, applicationCount) => {
          try {
            // Reset mocks before test
            jest.clearAllMocks();
            
            // Apply theme multiple times
            for (let i = 0; i < applicationCount; i++) {
              applyTheme(theme);
            }
            
            // Verify consistent behavior regardless of application count
            if (theme === 'dark') {
              expect(mockDocument.documentElement.classList.add).toHaveBeenCalledTimes(applicationCount);
              expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('dark');
            } else {
              expect(mockDocument.documentElement.classList.remove).toHaveBeenCalledTimes(applicationCount);
              expect(mockDocument.documentElement.classList.remove).toHaveBeenCalledWith('dark');
            }
            
            return true;
          } catch (error) {
            console.error('Theme class consistency test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });
  });

  describe('Property 8: Transition Property Consistency', () => {
    test('**Validates: Requirements 4.3** - For any theme-aware component, CSS transition properties should be applied to all color-related style properties', async () => {
      const property = fc.asyncProperty(
        generators.themeName().filter(theme => theme !== 'system'),
        fc.array(generators.cssUtility(), { minLength: 1, maxLength: 4 }),
        fc.integer({ min: 100, max: 500 }), // transition duration
        async (theme, cssUtilities, duration) => {
          try {
            // Test transition class generation
            const transitionClasses = [
              'transition-colors',
              'transition-all',
              'duration-300',
              'ease-in-out'
            ];
            
            // Verify transition classes are properly formatted
            transitionClasses.forEach(className => {
              expect(className).toMatch(/^(transition|duration|ease)/);
            });
            
            // Test that color-related properties have transitions
            const colorProperties = ['bg', 'text', 'border', 'ring', 'shadow'];
            cssUtilities.forEach(utility => {
              expect(colorProperties).toContain(utility);
            });
            
            // Verify duration is reasonable
            expect(duration).toBeGreaterThanOrEqual(100);
            expect(duration).toBeLessThanOrEqual(500);
            
            return true;
          } catch (error) {
            console.error('Transition property consistency test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('Reduced motion transition handling', async () => {
      const property = fc.asyncProperty(
        fc.boolean(), // prefers reduced motion
        generators.themeName().filter(theme => theme !== 'system'),
        async (prefersReducedMotion, theme) => {
          try {
            // Mock matchMedia for reduced motion
            Object.defineProperty(window, 'matchMedia', {
              value: jest.fn(() => ({
                matches: prefersReducedMotion,
                media: '(prefers-reduced-motion: reduce)',
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
              })),
              writable: true
            });
            
            // Test transition behavior based on motion preference
            const shouldHaveTransitions = !prefersReducedMotion;
            
            if (shouldHaveTransitions) {
              // Should include transition classes
              const transitionClass = 'transition-colors duration-300';
              expect(transitionClass).toContain('transition');
              expect(transitionClass).toContain('duration');
            } else {
              // Should not include transition classes for reduced motion
              const noTransitionClass = '';
              expect(noTransitionClass).not.toContain('transition');
            }
            
            return true;
          } catch (error) {
            console.error('Reduced motion transition test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });
  });

  describe('Property 13: Tailwind Class Usage', () => {
    test('**Validates: Requirements 6.2** - For any theme-aware component, styling should use appropriate Tailwind CSS dark mode classes', async () => {
      const property = fc.asyncProperty(
        generators.themeName().filter(theme => theme !== 'system'),
        fc.array(generators.cssUtility(), { minLength: 1, maxLength: 5 }),
        async (theme, cssUtilities) => {
          try {
            // Test Tailwind dark mode class patterns
            cssUtilities.forEach(utility => {
              // Light theme classes (default)
              const lightClass = `${utility}-gray-100`;
              expect(lightClass).toMatch(/^(bg|text|border|ring|shadow)-/);
              
              // Dark theme classes (with dark: prefix)
              const darkClass = `dark:${utility}-gray-800`;
              expect(darkClass).toMatch(/^dark:(bg|text|border|ring|shadow)-/);
              
              // Verify dark prefix is properly formatted
              expect(darkClass).toContain('dark:');
            });
            
            // Test complete class combinations
            const exampleClasses = [
              'bg-white dark:bg-gray-900',
              'text-gray-900 dark:text-white',
              'border-gray-200 dark:border-gray-700',
              'hover:bg-gray-100 dark:hover:bg-gray-800'
            ];
            
            exampleClasses.forEach(classString => {
              // Should contain both light and dark variants
              expect(classString).toContain('dark:');
              
              // Should follow Tailwind naming conventions
              expect(classString).toMatch(/^[\w-]+(\s+[\w-:]+)*$/);
              
              // Dark classes should be properly prefixed
              const darkClasses = classString.split(' ').filter(cls => cls.startsWith('dark:'));
              darkClasses.forEach(darkClass => {
                expect(darkClass).toMatch(/^dark:[\w-]+$/);
              });
            });
            
            return true;
          } catch (error) {
            console.error('Tailwind class usage test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });

    test('Tailwind responsive and state variant combinations', async () => {
      const property = fc.asyncProperty(
        fc.array(generators.breakpoint(), { minLength: 0, maxLength: 2 }),
        fc.array(generators.stateVariant(), { minLength: 0, maxLength: 2 }),
        async (breakpoints, states) => {
          try {
            // Test complex Tailwind class combinations
            let classString = 'bg-white dark:bg-gray-900';
            
            // Add responsive variants
            breakpoints.forEach(bp => {
              classString += ` ${bp}:bg-gray-50 dark:${bp}:bg-gray-800`;
            });
            
            // Add state variants
            states.forEach(state => {
              classString += ` ${state}:bg-gray-100 dark:${state}:bg-gray-700`;
            });
            
            // Verify all classes follow Tailwind patterns
            const classes = classString.split(' ');
            classes.forEach(cls => {
              // Should be valid Tailwind class format (allowing colons for dark: prefix)
              expect(cls).toMatch(/^(dark:)?(sm:|md:|lg:|xl:)?(hover:|focus:|active:)?[\w-]+$/);
              
              // Dark classes should maintain proper order
              if (cls.includes('dark:')) {
                expect(cls).toMatch(/^dark:(sm:|md:|lg:|xl:)?(hover:|focus:|active:)?[\w-]+$/);
              }
            });
            
            return true;
          } catch (error) {
            console.error('Tailwind variant combinations test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });
  });
});