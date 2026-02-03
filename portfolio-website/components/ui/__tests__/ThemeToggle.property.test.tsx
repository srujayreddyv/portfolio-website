/**
 * Property-based tests for ThemeToggle component
 * Tests Properties 1, 10, and 11 from the design document
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '../ThemeToggle';
import { propertyTestConfig, generators } from '../../../lib/property-test-utils';

// Mock next-themes with stable mock
const mockThemeState = {
  theme: 'light',
  setTheme: jest.fn(),
  resolvedTheme: 'light',
  systemTheme: 'light'
};

jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
  useTheme: () => mockThemeState
}));

// Mock accessibility utils
jest.mock('../../../lib/accessibility-utils', () => ({
  useReducedMotion: () => false,
  getTransitionDuration: (defaultMs: number) => defaultMs
}));

// Mock theme fallback hook
jest.mock('../../../lib/hooks/useThemeWithFallback', () => ({
  useThemeWithGracefulDegradation: () => ({
    theme: 'light' as const,
    setTheme: jest.fn(),
    mounted: true
  })
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider attribute="class" defaultTheme="system">
    {children}
  </ThemeProvider>
);

describe('ThemeToggle Property Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
    
    // Reset mock state
    mockThemeState.theme = 'light';
    mockThemeState.resolvedTheme = 'light';
    mockThemeState.systemTheme = 'light';
    mockThemeState.setTheme.mockClear();
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe('Property 1: Theme Toggle State Consistency', () => {
    test('**Validates: Requirements 1.1, 1.5** - For any initial theme state, clicking toggle should result in opposite theme and appropriate icon', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        fc.constantFrom('sm', 'md', 'lg'),
        fc.boolean(), // showLabel
        async (initialTheme, size, showLabel) => {
          try {
            // Mock useTheme to return controlled state
            mockThemeState.theme = initialTheme;
            mockThemeState.resolvedTheme = initialTheme === 'system' ? 'light' : initialTheme;
            mockThemeState.setTheme.mockClear();

            const { unmount } = render(
              <TestWrapper>
                <ThemeToggle size={size} showLabel={showLabel} />
              </TestWrapper>
            );

            await waitFor(() => {
              const buttons = screen.getAllByRole('button');
              expect(buttons.length).toBeGreaterThanOrEqual(1);
            }, { timeout: 1000 });

            // Get the first button (our ThemeToggle button)
            const button = screen.getAllByRole('button')[0];
            
            // Verify initial state
            expect(button).toBeInTheDocument();

            // Click the toggle
            await userEvent.click(button);

            // Verify setTheme was called with expected next theme
            const expectedNextTheme = getNextTheme(initialTheme);
            expect(mockThemeState.setTheme).toHaveBeenCalledWith(expectedNextTheme);

            unmount();
            return true;
          } catch (error) {
            console.error('Theme toggle state consistency test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });

    test('Theme cycle consistency - should cycle through light -> dark -> system -> light', async () => {
      const property = fc.asyncProperty(
        fc.constantFrom('sm', 'md', 'lg'),
        async (size) => {
          try {
            // Test complete cycle
            const themes = ['light', 'dark', 'system'] as const;
            const expectedCycle = ['dark', 'system', 'light'] as const;

            for (let i = 0; i < themes.length; i++) {
              const currentTheme = themes[i];
              const expectedNext = expectedCycle[i];

              mockThemeState.theme = currentTheme;
              mockThemeState.resolvedTheme = currentTheme === 'system' ? 'light' : currentTheme;
              mockThemeState.setTheme.mockClear();

              const { unmount } = render(
                <TestWrapper>
                  <ThemeToggle size={size} />
                </TestWrapper>
              );

              await waitFor(() => {
                const buttons = screen.getAllByRole('button');
                expect(buttons.length).toBeGreaterThanOrEqual(1);
              }, { timeout: 1000 });

              const button = screen.getAllByRole('button')[0];
              await userEvent.click(button);

              expect(mockThemeState.setTheme).toHaveBeenCalledWith(expectedNext);
              
              unmount();
            }

            return true;
          } catch (error) {
            console.error('Theme cycle consistency test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 5 });
    });
  });

  describe('Property 10: Keyboard Navigation Support', () => {
    test('**Validates: Requirements 5.1, 5.3** - For any keyboard interaction, theme toggle should be focusable and operable with appropriate focus indicators', async () => {
      const property = fc.asyncProperty(
        fc.constantFrom('Enter', 'Space', ' '),
        generators.themeName(),
        fc.constantFrom('sm', 'md', 'lg'),
        async (keyToPress, initialTheme, size) => {
          try {
            mockThemeState.theme = initialTheme;
            mockThemeState.resolvedTheme = initialTheme === 'system' ? 'light' : initialTheme;
            mockThemeState.setTheme.mockClear();

            const { unmount } = render(
              <TestWrapper>
                <ThemeToggle size={size} />
              </TestWrapper>
            );

            await waitFor(() => {
              const buttons = screen.getAllByRole('button');
              expect(buttons.length).toBeGreaterThanOrEqual(1);
            }, { timeout: 1000 });

            const button = screen.getAllByRole('button')[0];

            // Test focusability
            button.focus();
            expect(document.activeElement).toBe(button);

            // Test keyboard operation - use userEvent for better keyboard simulation
            if (keyToPress === 'Enter') {
              await userEvent.type(button, '{enter}');
            } else if (keyToPress === 'Space' || keyToPress === ' ') {
              await userEvent.type(button, '{space}');
            }

            // For Enter and Space keys, should trigger theme change
            if (keyToPress === 'Enter' || keyToPress === 'Space' || keyToPress === ' ') {
              await waitFor(() => {
                expect(mockThemeState.setTheme).toHaveBeenCalled();
              }, { timeout: 500 });
            }

            // Verify ARIA attributes for keyboard users
            expect(button).toHaveAttribute('aria-label');
            expect(button).toHaveAttribute('role', 'button');
            expect(button).toHaveAttribute('tabIndex', '0');

            unmount();
            return true;
          } catch (error) {
            console.error('Keyboard navigation test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });

    test('Focus management and tab navigation', async () => {
      const property = fc.asyncProperty(
        fc.constantFrom('sm', 'md', 'lg'),
        fc.boolean(), // showLabel
        async (size, showLabel) => {
          try {
            mockThemeState.theme = 'light';
            mockThemeState.resolvedTheme = 'light';
            mockThemeState.setTheme.mockClear();

            const { unmount } = render(
              <TestWrapper>
                <ThemeToggle size={size} showLabel={showLabel} />
              </TestWrapper>
            );

            await waitFor(() => {
              const buttons = screen.getAllByRole('button');
              expect(buttons.length).toBeGreaterThanOrEqual(1);
            }, { timeout: 1000 });

            const button = screen.getAllByRole('button')[0];

            // Test Tab navigation
            fireEvent.keyDown(document.body, { key: 'Tab' });
            
            // Button should be focusable
            expect(button.tabIndex).toBe(0);
            
            // Test focus styles (should have focus classes)
            button.focus();
            expect(button.className).toContain('focus:');

            unmount();
            return true;
          } catch (error) {
            console.error('Focus management test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });
  });

  describe('Property 11: ARIA State Accuracy', () => {
    test('**Validates: Requirements 5.2, 5.4** - For any theme state, theme toggle should have accurate ARIA labels and live region announcements', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        fc.constantFrom('sm', 'md', 'lg'),
        fc.boolean(), // showLabel
        async (currentTheme, size, showLabel) => {
          try {
            mockThemeState.theme = currentTheme;
            mockThemeState.resolvedTheme = currentTheme === 'system' ? 'light' : currentTheme;
            mockThemeState.setTheme.mockClear();

            const { unmount } = render(
              <TestWrapper>
                <ThemeToggle size={size} showLabel={showLabel} />
              </TestWrapper>
            );

            await waitFor(() => {
              const buttons = screen.getAllByRole('button');
              expect(buttons.length).toBeGreaterThanOrEqual(1);
            }, { timeout: 1000 });

            const button = screen.getAllByRole('button')[0];

            // Verify ARIA label describes current state and action
            const ariaLabel = button.getAttribute('aria-label');
            expect(ariaLabel).toBeTruthy();
            expect(ariaLabel).toContain('Switch to');

            // Verify appropriate ARIA attributes
            expect(button).toHaveAttribute('role', 'button');
            expect(button).toHaveAttribute('tabIndex', '0');

            // Check for live region (screen reader announcements)
            const liveRegion = screen.getByRole('status');
            expect(liveRegion).toBeInTheDocument();
            expect(liveRegion).toHaveAttribute('aria-live', 'polite');
            expect(liveRegion).toHaveAttribute('aria-atomic', 'true');

            // Test announcement after theme change
            await userEvent.click(button);

            // Should announce the change
            await waitFor(() => {
              const announcement = liveRegion.textContent;
              if (announcement) {
                expect(announcement).toContain('Switched to');
              }
            }, { timeout: 1500 });

            unmount();
            return true;
          } catch (error) {
            console.error('ARIA state accuracy test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });

    test('ARIA describedby and title attributes accuracy', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        fc.boolean(), // showLabel
        async (currentTheme, showLabel) => {
          try {
            mockThemeState.theme = currentTheme;
            mockThemeState.resolvedTheme = currentTheme === 'system' ? 'light' : currentTheme;
            mockThemeState.setTheme.mockClear();

            const { unmount } = render(
              <TestWrapper>
                <ThemeToggle showLabel={showLabel} />
              </TestWrapper>
            );

            await waitFor(() => {
              const buttons = screen.getAllByRole('button');
              expect(buttons.length).toBeGreaterThanOrEqual(1);
            }, { timeout: 1000 });

            const button = screen.getAllByRole('button')[0];

            // Verify title attribute provides context
            const title = button.getAttribute('title');
            expect(title).toBeTruthy();
            expect(title).toContain('Current:');
            expect(title).toContain('Click to switch');

            // If showLabel is true, should have describedby
            if (showLabel) {
              const describedBy = button.getAttribute('aria-describedby');
              if (describedBy) {
                const description = document.getElementById(describedBy);
                expect(description).toBeInTheDocument();
              }
            }

            unmount();
            return true;
          } catch (error) {
            console.error('ARIA attributes accuracy test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });
  });
});

// Helper functions
function getExpectedIcon(theme: string): string {
  switch (theme) {
    case 'light': return 'sun';
    case 'dark': return 'moon';
    case 'system': return 'monitor';
    default: return 'monitor';
  }
}

function getNextTheme(currentTheme: string): string {
  switch (currentTheme) {
    case 'light': return 'dark';
    case 'dark': return 'system';
    case 'system': return 'light';
    default: return 'light';
  }
}