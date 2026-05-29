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
      // border-hairline, text-accent, etc.). Values resolve via the RGB-channel
      // CSS variables in globals.css using the `<alpha-value>` placeholder, so
      // both the theme swap AND opacity modifiers (text-ink/80, bg-accent/10,
      // border-accent/60, …) work correctly.
      colors: {
        canvas: 'rgb(var(--canvas-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          hover: 'var(--accent-hover)',
        },
        hairline: 'rgb(var(--hairline-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        destructive: 'rgb(var(--destructive-rgb) / <alpha-value>)',
      },
      // Tighter sizing/spacing helpers for the terminal vocabulary.
      letterSpacing: {
        'mono-wide': '0.08em',
      },
    },
  },
  plugins: [],
}
