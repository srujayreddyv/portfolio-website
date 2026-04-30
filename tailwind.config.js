/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        // ─────────────────────────────────────────────────────────────
        // System Architect — restrained, technical, single-accent dark
        // (Vercel/Linear school. Cyan is the only chromatic note.)
        // ─────────────────────────────────────────────────────────────

        // Surfaces (true black → near-black panels → elevated cards)
        base: '#0A0A0A',
        panel: '#0F0F10',
        elev: '#16161A',

        // Ink (text)
        ink: {
          DEFAULT: '#FAFAFA',   // primary text
          muted: '#A1A1AA',     // body / secondary
          subtle: '#71717A',    // labels / captions
        },

        // Hairlines (borders)
        line: {
          DEFAULT: '#27272A',
          subtle: '#1F1F23',
          strong: '#3F3F46',
        },

        // Signal (single accent — electric cyan)
        signal: {
          DEFAULT: '#22D3EE',
          dim: 'rgba(34, 211, 238, 0.12)',  // for tinted backgrounds
          glow: 'rgba(34, 211, 238, 0.35)', // for focus rings / shadows
        },

        // ─────────────────────────────────────────────────────────────
        // Legacy tokens — kept so unmigrated components don't break.
        // Will be removed once all components are refactored.
        // ─────────────────────────────────────────────────────────────
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        // Cyan glow ring for focus states / interactive accents
        signal: '0 0 0 3px rgba(34, 211, 238, 0.18)',
        'signal-lg': '0 8px 32px -4px rgba(34, 211, 238, 0.25)',
      },
      ringColor: {
        signal: 'rgba(34, 211, 238, 0.35)',
      },
    },
  },
  plugins: [],
}
