/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // next-themes uses class strategy — keep it.
  darkMode: 'class',
  theme: {
    extend: {
      // Direction 2 — Terminal typography.
      // Inter for sans (display + body); JetBrains Mono for nav, tags, CTAs,
      // command prompts, and small UI. Variables wired in src/app/layout.tsx.
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // Direction 2 — Semantic color tokens.
      // Components in restyled phases use these names (bg-canvas, text-ink,
      // border-hairline, text-accent, etc.). Values resolve via CSS variables
      // in globals.css, so they swap with the theme automatically.
      colors: {
        canvas: 'var(--canvas)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        hairline: 'var(--hairline)',
        surface: 'var(--surface)',
      },
      // Tighter sizing/spacing helpers for the terminal vocabulary.
      letterSpacing: {
        'mono-wide': '0.08em',
      },
    },
  },
  plugins: [],
}
