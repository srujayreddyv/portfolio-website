# Implementation Patterns

## Component Pattern

Use App Router defaults: server components for page composition and data loading, client components only when hooks, browser APIs, or user interaction are required. Mark interactive components with `'use client'`.

Keep section-level UI in `components/sections`, shared controls in `components/ui`, layout chrome in `components/layout`, and providers in `components/providers`.

Component styling is primarily Tailwind utility classes with global CSS variables and shared classes in `src/app/globals.css` for theme surfaces, buttons, cards, focus states, and layout shell behavior. The active visual language is terminal/infrastructure-oriented: semantic Tailwind tokens such as `canvas`, `ink`, `muted`, `accent`, `hairline`, and `surface`; square hairline frames; compact mono labels; and restrained motion.

## Content Pattern

Typed static content lives in `content/data/*.ts`. Project detail content lives in `content/projects/*.mdx` with frontmatter matching the `Project` interface.

Load projects through `lib/content.ts` instead of reading files from components. Validate content with `ContentValidator` before rendering, and sanitize markdown-derived HTML before it enters UI.

When changing content schema, update the TypeScript interface, validator, content files, rendering components, and relevant tests together.

## API Pattern

API routes live under `src/app/api`. The current API shape uses Next.js route handlers and returns `NextResponse.json(...)` with HTTP status codes.

The contact route expects JSON with `name`, `email`, `subject`, and `message`. It returns `{ error: string }` on validation/configuration/send failure and `{ message: string }` on success.

Keep provider SDK usage and secret access inside API routes or server-only utilities. Do not expose SendGrid details to client components.

## Error Handling Pattern

Content loading failures log warnings/errors and return safe fallbacks such as `null` or empty arrays so the public page can continue rendering.

Contact form errors are shown to the user through form state. API errors should return short user-safe messages; detailed failures can be logged server-side.

Avoid logging during tests where existing helpers suppress output. Do not log secrets or full environment configuration.

## Theme And Accessibility Pattern

Theme support is class-based through `next-themes` with `light` and `dark` themes only. Preserve `suppressHydrationWarning`, the inline `themeScript`, mounted-state guards where components depend on the resolved theme, and the terminal-style text theme toggle contract.

Interactive controls should have accessible names, visible focus states, keyboard behavior, and mobile-friendly touch targets. Respect reduced-motion utilities for optional animation.

## Testing Pattern

Use Jest with jsdom, React Testing Library for component behavior, and `fast-check` for property-based coverage where broad input invariants matter.

Test files are colocated in `__tests__` folders or placed under `lib/__tests__`; property tests use the `.property.test.ts` or `.property.test.tsx` suffix. Prefer user-facing assertions over implementation details.

Use `lib/test-utils.tsx` and `lib/property-test-utils.ts` where applicable. Keep mocks in `__mocks__` or local test setup when external modules are hard to run in Jest.

## Dependency Management Pattern

Use npm and keep `package-lock.json` authoritative. The runtime target is Node.js 20.

Prefer existing dependencies before adding new ones. New client-side dependencies should justify bundle cost and fit the existing React/Tailwind/Next.js stack; new server dependencies should be compatible with Vercel and the Next.js route runtime.
