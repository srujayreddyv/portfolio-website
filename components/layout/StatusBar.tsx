/**
 * StatusBar — thin terminal-style strip rendered above the main nav.
 *
 * Direction 2 vocabulary: a small JetBrains Mono row carrying the theme toggle,
 * location, and availability signal. Reads like an editor's status bar.
 *
 * Mobile: location is hidden, availability text is truncated. The toggle and
 * the status dot stay visible at every breakpoint.
 */

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { personalData } from '@/content/data/personal';

export default function StatusBar() {
  // Trim the availability note into a short mono-friendly label.
  // Source: "Open to AI Software Engineer and AI Engineer roles." → "open to ai engineer roles"
  const availabilityShort = personalData.availabilityNote
    .replace(/\.$/, '')
    .toLowerCase();

  // "Sacramento, CA" → "sacramento, ca"
  const locationShort = personalData.location.toLowerCase();

  return (
    <div className="border-b border-hairline bg-canvas">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-7 sm:h-8 font-mono text-[10px] sm:text-[11px] tracking-[0.02em]">
          {/* Left: theme toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>

          {/* Right: location · availability */}
          <div className="flex items-center gap-3 sm:gap-4 text-muted">
            <span className="hidden sm:inline-flex items-center" aria-label={`Location: ${personalData.location}`}>
              {locationShort}
            </span>
            <span className="hidden sm:inline text-hairline" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5" aria-label={personalData.availabilityNote}>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span className="truncate max-w-[60vw] sm:max-w-none">
                {availabilityShort}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
