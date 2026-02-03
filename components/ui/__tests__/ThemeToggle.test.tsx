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
  themes: ['light', 'dark', 'system'],
  forcedTheme: undefined,
  resolvedTheme: 'light'
};

jest.mock('next-themes', () => ({
  useTheme: () => mockUseTheme,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Sun: ({ className, ...props }: any) => <div data-testid="sun-icon" className={className} {...props} />,
  Moon: ({ className, ...props }: any) => <div data-testid="moon-icon" className={className} {...props} />,
  Monitor: ({ className, ...props }: any) => <div data-testid="monitor-icon" className={className} {...props} />
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.theme = 'light';
  });

  it('renders correctly when mounted', async () => {
    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
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

  it('handles keyboard navigation', async () => {
    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    
    const button = screen.getByRole('button');
    
    // Test Enter key
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
    
    // Test Space key
    mockSetTheme.mockClear();
    fireEvent.keyDown(button, { key: ' ' });
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('displays correct icon for dark theme', async () => {
    mockUseTheme.theme = 'dark';
    
    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    });
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to system theme');
  });

  it('displays correct icon for system theme', async () => {
    mockUseTheme.theme = 'system';
    
    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByTestId('monitor-icon')).toBeInTheDocument();
    });
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('supports different sizes', async () => {
    render(<ThemeToggle size="lg" />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-10', 'h-10', 'sm:w-12', 'sm:h-12');
  });

  it('shows label when showLabel is true', async () => {
    render(<ThemeToggle showLabel={true} />);
    
    await waitFor(() => {
      expect(screen.getByText('Light')).toBeInTheDocument();
    });
  });

  it('has proper ARIA attributes', async () => {
    render(<ThemeToggle />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('role', 'button');
    expect(button).toHaveAttribute('tabIndex', '0');
    
    // Check for live region
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});