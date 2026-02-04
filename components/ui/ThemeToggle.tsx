'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useReducedMotion } from '@/lib/accessibility-utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ThemeToggle({ 
  className = '', 
  size = 'md', 
  showLabel = false 
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [announceText, setAnnounceText] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-9 h-9 sm:w-10 sm:h-10',
      lg: 'w-10 h-10 sm:w-12 sm:h-12'
    };
    
    return (
      <div className={`${sizeClasses[size]} rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />
    );
  }

  const currentTheme = theme ?? 'system';

  const toggleTheme = () => {
    try {
      let newTheme: string;
      let announcement: string;
      
      if (currentTheme === 'light') {
        newTheme = 'dark';
        announcement = 'Switched to dark theme';
      } else if (currentTheme === 'dark') {
        newTheme = 'system';
        announcement = 'Switched to system theme';
      } else {
        newTheme = 'light';
        announcement = 'Switched to light theme';
      }
      
      setTheme(newTheme);
      setAnnounceText(announcement);
      
      // Clear announcement after screen reader has time to read it
      setTimeout(() => setAnnounceText(''), 1000);
    } catch (error) {
      console.error('Failed to toggle theme:', error);
      setAnnounceText('Theme toggle failed');
      setTimeout(() => setAnnounceText(''), 1000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Handle Enter and Space keys for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  };

  const getIcon = () => {
    const sizeClasses = {
      sm: 'w-3 h-3 sm:w-4 sm:h-4',
      md: 'w-4 h-4 sm:w-5 sm:h-5',
      lg: 'w-5 h-5 sm:w-6 sm:h-6'
    };
    
    const iconSize = sizeClasses[size];
    
    switch (currentTheme) {
      case 'light':
        return <Sun className={iconSize} aria-hidden="true" />;
      case 'dark':
        return <Moon className={iconSize} aria-hidden="true" />;
      default:
        return <Monitor className={iconSize} aria-hidden="true" />;
    }
  };

  const getThemeInfo = () => {
    switch (currentTheme) {
      case 'light':
        return {
          current: 'light theme',
          next: 'dark theme',
          action: 'Switch to dark mode'
        };
      case 'dark':
        return {
          current: 'dark theme',
          next: 'system theme',
          action: 'Switch to system theme'
        };
      default:
        return {
          current: 'system theme',
          next: 'light theme',
          action: 'Switch to light mode'
        };
    }
  };

  const themeInfo = getThemeInfo();
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 sm:w-10 sm:h-10 text-sm',
    lg: 'w-10 h-10 sm:w-12 sm:h-12 text-base'
  };

  // Get transition classes based on reduced motion preference
  const transitionClasses = prefersReducedMotion 
    ? '' 
    : 'transition-all duration-300 ease-in-out hover:scale-105 active:scale-95';

  const colorTransitionClasses = prefersReducedMotion
    ? ''
    : 'transition-colors duration-300';

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex items-center justify-center ${sizeClasses[size]}
          rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 
          ${transitionClasses}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
          dark:focus:ring-offset-gray-900 focus:ring-opacity-75
          border border-transparent hover:border-gray-300 dark:hover:border-gray-600
        `}
        aria-label={themeInfo.action}
        aria-describedby={showLabel ? 'theme-description' : undefined}
        aria-pressed={currentTheme === 'dark'}
        role="button"
        tabIndex={0}
        title={`Current: ${themeInfo.current}. Click to switch to ${themeInfo.next}.`}
      >
        <span className={`text-gray-700 dark:text-gray-300 ${colorTransitionClasses}`}>
          {getIcon()}
        </span>
        
        {showLabel && (
          <span className="ml-2 font-medium">
            {currentTheme === 'light' ? 'Light' : currentTheme === 'dark' ? 'Dark' : 'Auto'}
          </span>
        )}
      </button>
      
      {/* ARIA live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announceText}
      </div>
      
      {/* Hidden description for screen readers */}
      {showLabel && (
        <div id="theme-description" className="sr-only">
          Theme toggle button. Currently using {themeInfo.current}. 
          Activate to switch to {themeInfo.next}.
        </div>
      )}
    </div>
  );
}
