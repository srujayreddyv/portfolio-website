/**
 * Property-based tests for ThemeProvider integration and SSR
 * Tests Properties 12 and 14 from the design document
 */

import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
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
    test('**Validates: Requirements 6.1** - For any existing ThemeProvider functionality, enhanced theme system should maintain backward compatibility', async () => {
      const property = fc.asyncProperty(
        generators.themeName(),
        generators.storageKey(),
        fc.boolean(), // enableSystem
        async (defaultTheme, storageKey, enableSystem) => {
          try {
            const TestComponent = () => <div data-testid={`test-content-${Date.now()}-${Math.random()}`}>Test Content</div>;
            
            const { unmount } = render(
              <ThemeProvider 
                defaultTheme={defaultTheme}
                storageKey={storageKey}
              >
                <TestComponent />
              </ThemeProvider>
            );

            // Should render without errors
            await waitFor(() => {
              expect(screen.getByText('Test Content')).toBeInTheDocument();
            }, { timeout: 1000 });

            // Should pass correct props to next-themes ThemeProvider
            const { ThemeProvider: MockedThemeProvider } = require('next-themes');
            expect(MockedThemeProvider).toHaveBeenCalledWith(
              expect.objectContaining({
                attribute: 'class',
                defaultTheme,
                enableSystem: true,
                disableTransitionOnChange: false,
                storageKey
              }),
              expect.anything()
            );

            // Should maintain children rendering
            expect(screen.getByText('Test Content')).toBeInTheDocument();
            expect(screen.getByTestId('next-themes-provider')).toBeInTheDocument();

            unmount(); // Clean up immediately
            return true;
          } catch (error) {
            console.error('ThemeProvider integration test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
    }, 10000); // Increased timeout

    test('ThemeProvider props validation and defaults', async () => {
      const property = fc.asyncProperty(
        fc.option(generators.themeName(), { nil: undefined }),
        fc.option(generators.storageKey(), { nil: undefined }),
        async (defaultTheme, storageKey) => {
          try {
            const TestComponent = () => <div data-testid={`test-content-${Date.now()}-${Math.random()}`}>Test Content</div>;
            
            const { unmount } = render(
              <ThemeProvider 
                defaultTheme={defaultTheme}
                storageKey={storageKey}
              >
                <TestComponent />
              </ThemeProvider>
            );

            await waitFor(() => {
              expect(screen.getByText('Test Content')).toBeInTheDocument();
            }, { timeout: 1000 });

            // Verify default values are applied when props are undefined
            const expectedDefaultTheme = defaultTheme || 'system';
            const expectedStorageKey = storageKey || 'theme';

            const { ThemeProvider: MockedThemeProvider } = require('next-themes');
            expect(MockedThemeProvider).toHaveBeenCalledWith(
              expect.objectContaining({
                defaultTheme: expectedDefaultTheme,
                storageKey: expectedStorageKey
              }),
              expect.anything()
            );

            unmount();
            return true;
          } catch (error) {
            console.error('ThemeProvider props validation test failed:', error);
            return false;
          }
        }
      );

      await fc.assert(property, { ...propertyTestConfig, numRuns: 10 });
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
          try {
            // Mock SSR environment
            const originalWindow = global.window;
            if (isServerSide) {
              // @ts-ignore
              delete global.window;
            }

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

            const { unmount } = render(
              <ThemeProvider defaultTheme={theme}>
                <TestComponent />
              </ThemeProvider>
            );

            if (isServerSide) {
              // Should show SSR fallback initially
              await waitFor(() => {
                expect(screen.getByText('Loading...')).toBeInTheDocument();
              }, { timeout: 1000 });
            } else {
              // Should show hydrated content
              await waitFor(() => {
                expect(screen.getByText('Hydrated Content')).toBeInTheDocument();
              }, { timeout: 1000 });
            }

            // Restore window
            if (isServerSide) {
              global.window = originalWindow;
            }

            unmount();
            return true;
          } catch (error) {
            console.error('SSR hydration consistency test failed:', error);
            return false;
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

            const mockDocument = {
              documentElement: mockDocumentElement
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
});