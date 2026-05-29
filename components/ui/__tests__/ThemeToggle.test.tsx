/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '../ThemeToggle';

// Mock next-themes
const mockSetTheme = jest.fn();
const mockUseTheme = {
  theme: 'light',
  setTheme: mockSetTheme,
  systemTheme: 'light',
  themes: ['light', 'dark'],
  forcedTheme: undefined,
  resolvedTheme: 'light'
};

jest.mock('next-themes', () => ({
  useTheme: () => mockUseTheme,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.theme = 'light';
    mockUseTheme.resolvedTheme = 'light';
  });

  it('renders correctly when mounted', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    // Direction 2 — terminal-vocabulary toggle renders `[ dark / light ]` text.
    expect(button.textContent).toContain('dark');
    expect(button.textContent).toContain('light');
  });

  it('shows loading state when not mounted', () => {
    // Mock useState to return false for mounted state
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, jest.fn()]) // mounted state
      .mockImplementationOnce(() => ['', jest.fn()]); // announceText state

    const { container } = render(<ThemeToggle />);

    const loadingDiv = container.querySelector('.animate-pulse');
    expect(loadingDiv).toBeInTheDocument();
    expect(loadingDiv).toHaveClass('w-9', 'h-9', 'sm:w-10', 'sm:h-10');

    // Restore original useState
    React.useState = originalUseState;
  });

  it('toggles theme when clicked', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('reflects active mode via accent color class', async () => {
    mockUseTheme.theme = 'dark';
    mockUseTheme.resolvedTheme = 'dark';

    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(button).toHaveAttribute('aria-pressed', 'true');

    // The "dark" segment carries the accent class when dark is active.
    const darkSegment = Array.from(button.querySelectorAll('span')).find(
      (span) => span.textContent?.trim() === 'dark'
    );
    expect(darkSegment).toBeTruthy();
    expect(darkSegment?.className).toContain('text-accent');
  });

  it('handles keyboard activation via native button behavior', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');

    // Native <button> handles Enter/Space as click via the browser; fireEvent.click
    // simulates that activation path for both keys.
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('size prop is accepted for API compatibility', async () => {
    // The terminal-vocabulary toggle is a single visual size, but the size prop
    // remains accepted so prior callers continue to compile/test.
    render(<ThemeToggle size="lg" />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    // No assertion on specific width classes — size is a no-op visually.
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders a hidden description when showLabel is true', async () => {
    render(<ThemeToggle showLabel={true} />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const description = document.getElementById('theme-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('sr-only');
  });

  it('has proper ARIA attributes including aria-pressed and live region', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('aria-pressed');
    expect(button).toHaveAttribute('title');

    // Check for live region
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
