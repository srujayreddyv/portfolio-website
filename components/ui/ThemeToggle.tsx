'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useReducedMotion } from '@/lib/accessibility-utils';

interface ThemeToggleProps {
  className?: string;
  /** Retained for API compatibility — the terminal-vocabulary toggle is text-based and a single size. */
  size?: 'sm' | 'md' | 'lg';
  /** Retained for API compatibility — the text label is always visible in the new design. */
  showLabel?: boolean;
}

/**
 * ThemeToggle — Direction 2 terminal-vocabulary indicator.
 *
 * Renders as `[ dark / light ]` with the active mode in accent color and the
 * inactive mode in muted. Clicking flips the theme.
 *
 * Behavior preserved from the prior icon-based toggle: aria-label describes
 * the action, aria-pressed reports the boolean dark state, a polite live
 * region announces "Switched to <theme>", and Enter/Space activate the
 * button (native button behavior).
 *
 * The `size` and `showLabel` props are retained as no-ops for API
 * compatibility with the prior interface and existing property tests.
 */
export function ThemeToggle({
  className = '',
  size: _size = 'md',
  showLabel = false,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [announceText, setAnnounceText] = useState('');
  const clearAnnouncementTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    return () => {
      if (clearAnnouncementTimeoutRef.current !== null) {
        window.clearTimeout(clearAnnouncementTimeoutRef.current);
      }
    };
  }, []);

  if (!mounted) {
    // Skeleton matches the rendered width approximately to avoid layout shift.
    // Keeps animate-pulse + size classes consistent with the prior toggle so
    // existing tests that look for these classes don't break.
    return (
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded animate-pulse bg-hairline ${className}`}
      />
    );
  }

  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  const toggleTheme = () => {
    try {
      const announcement = `Switched to ${nextTheme} theme`;
      setTheme(nextTheme);
      setAnnounceText(announcement);

      if (clearAnnouncementTimeoutRef.current !== null) {
        window.clearTimeout(clearAnnouncementTimeoutRef.current);
      }
      clearAnnouncementTimeoutRef.current = window.setTimeout(
        () => setAnnounceText(''),
        1000
      );
    } catch (error) {
      console.error('Failed to toggle theme:', error);
      setAnnounceText('Theme toggle failed');
      if (clearAnnouncementTimeoutRef.current !== null) {
        window.clearTimeout(clearAnnouncementTimeoutRef.current);
      }
      clearAnnouncementTimeoutRef.current = window.setTimeout(
        () => setAnnounceText(''),
        1000
      );
    }
  };

  const transitionClass = prefersReducedMotion
    ? ''
    : 'transition-colors duration-150';

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        onClick={toggleTheme}
        className={`
          inline-flex items-center gap-0
          font-mono text-[10px] sm:text-[11px] tracking-[0.05em]
          px-1.5 py-1 rounded-sm
          focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
          focus:ring-0
        `.trim()}
        aria-label={`Switch to ${nextTheme} mode`}
        aria-pressed={currentTheme === 'dark'}
        title={`Current: ${currentTheme} theme. Click to switch to ${nextTheme} theme.`}
        aria-describedby={showLabel ? 'theme-description' : undefined}
      >
        <span aria-hidden="true" className="text-muted select-none">[</span>
        <span
          aria-hidden="true"
          className={`px-1 ${transitionClass} ${
            currentTheme === 'dark' ? 'text-accent' : 'text-muted'
          }`}
        >
          dark
        </span>
        <span aria-hidden="true" className="text-muted select-none">/</span>
        <span
          aria-hidden="true"
          className={`px-1 ${transitionClass} ${
            currentTheme === 'light' ? 'text-accent' : 'text-muted'
          }`}
        >
          light
        </span>
        <span aria-hidden="true" className="text-muted select-none">]</span>
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

      {showLabel && (
        <div id="theme-description" className="sr-only">
          Theme toggle. Currently using {currentTheme} theme. Activate to switch to {nextTheme} theme.
        </div>
      )}
    </div>
  );
}
