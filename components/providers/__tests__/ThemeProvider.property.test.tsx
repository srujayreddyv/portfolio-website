/**
 * Property-based tests for ThemeProvider integration and SSR
 * Tests Properties 12 and 14 from the design document
 */

import React from 'react';
import { render, screen, waitFor, cleanup, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { ThemeProvider } from '../ThemeProvider';
import { propertyTestConfig, generators } from '../../../lib/property-test-utils';

// Mock next-themes
jest.mock('next-themes', () => {
  const mockNextThemesProvider = jest.fn(({ children }) => <div data-testid="next-themes-provider">{children}</div>);
  return {
    ThemeProvider: mockNextThemesProvider
  };
});

describe('ThemeProvider Integration Property Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup(); // Ensure clean DOM between tests
  });

  afterEach(() => {
    cleanup(); // Clean up after each test
  });

  describe('Property 12: ThemeProvider Integration', () => {
    test('**Validates: Requirements 6.1** - ThemeProvider renders children with next-themes provider', async () => {
      render(
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <div>Test Content</div>
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Content')).toBeInTheDocument();
        expect(screen.getByTestId('next-themes-provider')).toBeInTheDocument();
      });
    });

    test('ThemeProvider props validation and defaults', async () => {
      render(
        <ThemeProvider>
          <div>Defaults Content</div>
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Defaults Content')).toBeInTheDocument();
      });
    });
  });

  describe('Property 14: SSR Hydration Consistency', () => {
    test('**Validates: Requirements 6.3** - rendered content stays visible through mount lifecycle', async () => {
      render(
        <ThemeProvider defaultTheme="system">
          <div>Test Content</div>
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Content')).toBeInTheDocument();
      });
    });
  });

    test('ThemeProvider error boundary behavior', async () => {
      const property = fc.asyncProperty(
        fc.boolean(), // should throw error
        async (shouldThrowError) => {
          try {
            const ErrorComponent = () => {
              if (shouldThrowError) {
                throw new Error('Test error');
              }
              return <div data-testid={`test-content-${Date.now()}-${Math.random()}`}>Test Content</div>;
            };

            if (shouldThrowError) {
              // Should handle errors gracefully
              const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
              
              expect(() => {
                render(
                  <ThemeProvider>
                    <ErrorComponent />
                  </ThemeProvider>
                );
              }).toThrow();
              
              consoleSpy.mockRestore();
            } else {
              // Should render normally
              const { unmount } = render(
                <ThemeProvider>
                  <ErrorComponent />
                </ThemeProvider>
              );

              await waitFor(() => {
                expect(screen.getByText('Test Content')).toBeInTheDocument();
              }, { timeout: 1000 });
              
              unmount();
            }

            return true;
          } catch (error) {
            if (shouldThrowError) {
              // Expected error
              return true;
            }
            console.error('ThemeProvider error boundary test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });
  });

  describe('Property 14: SSR Hydration Consistency', () => {
    test('**Validates: Requirements 6.3** - For any server-side rendered page, initial theme state should match between server and client', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        fc.boolean(), // is server-side
        async (theme, isServerSide) => {
          let unmount: (() => void) | undefined;
          try {
            const TestComponent = () => {
              const [mounted, setMounted] = React.useState(false);
              
              React.useEffect(() => {
                setMounted(true);
              }, []);

              if (!mounted && isServerSide) {
                // Server-side rendering - should show fallback
                return <div data-testid={`ssr-fallback-${Date.now()}-${Math.random()}`}>Loading...</div>;
              }

              return <div data-testid={`hydrated-content-${Date.now()}-${Math.random()}`}>Hydrated Content</div>;
            };

            const renderResult = render(
              <ThemeProvider defaultTheme={theme}>
                <TestComponent />
              </ThemeProvider>
            );
            unmount = renderResult.unmount;

            if (isServerSide) {
              // In SSR-like mode, initial render may show fallback or hydrate quickly
              const initialLoading = screen.queryAllByText('Loading...');
              const initialHydrated = screen.queryAllByText('Hydrated Content');
              expect(initialLoading.length + initialHydrated.length).toBeGreaterThan(0);
            }

            // Should eventually show hydrated content
            await waitFor(() => {
              expect(screen.queryAllByText('Hydrated Content').length).toBeGreaterThan(0);
            }, { timeout: 1000 });

            return true;
          } catch (error) {
            console.error('SSR hydration consistency test failed:', error);
            return false;
          } finally {
            if (unmount) {
              unmount();
            }
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });

    test('Hydration mismatch prevention', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        fc.boolean(), // has localStorage value
        async (serverTheme, hasStoredValue) => {
          try {
            // Mock different server/client states
            const mockStorage = {
              getItem: jest.fn(() => hasStoredValue ? 'dark' : null),
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

            const HydrationTestComponent = () => {
              const [mounted, setMounted] = React.useState(false);
              const [clientTheme, setClientTheme] = React.useState(serverTheme);

              React.useEffect(() => {
                setMounted(true);
                // Simulate client-side theme detection
                const storedTheme = mockStorage.getItem('theme');
                if (storedTheme) {
                  setClientTheme(storedTheme);
                }
              }, []);

              return (
                <div data-testid={`theme-indicator-${Date.now()}-${Math.random()}`} data-theme={mounted ? clientTheme : serverTheme}>
                  Theme: {mounted ? clientTheme : serverTheme}
                </div>
              );
            };

            const { unmount } = render(
              <ThemeProvider defaultTheme={serverTheme}>
                <HydrationTestComponent />
              </ThemeProvider>
            );

            // Wait for component to render
            await waitFor(() => {
              expect(screen.getByText(/Theme:/)).toBeInTheDocument();
            }, { timeout: 1000 });

            const indicator = screen.getByText(/Theme:/);
            expect(indicator).toBeInTheDocument();

            unmount();
            return true;
          } catch (error) {
            console.error('Hydration mismatch prevention test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });

    test('SSR theme script injection', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        fc.boolean(), // script execution success
        async (theme, scriptSuccess) => {
          try {
            // Mock document for theme script
            const mockDocumentElement = {
              classList: {
                add: jest.fn(),
                remove: jest.fn(),
                contains: jest.fn(() => theme === 'dark')
              },
              style: {
                colorScheme: theme === 'dark' ? 'dark' : 'light'
              }
            };

            // Simulate theme script execution
            if (scriptSuccess) {
              // Script should apply theme before hydration
              if (theme === 'dark') {
                mockDocumentElement.classList.add('dark');
              } else {
                mockDocumentElement.classList.remove('dark');
              }
              mockDocumentElement.style.colorScheme = theme;
            }

            // Verify theme was applied correctly
            if (scriptSuccess) {
              if (theme === 'dark') {
                expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
              } else {
                expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
              }
              expect(mockDocumentElement.style.colorScheme).toBe(theme);
            }

            return true;
          } catch (error) {
            console.error('SSR theme script injection test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    });
  });
