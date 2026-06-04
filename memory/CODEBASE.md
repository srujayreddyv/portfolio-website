# Codebase Memory

## Repository Overview

This repository is a personal portfolio website for Srujay Reddy Vangoor. It is a Next.js App Router application using TypeScript, React 19, Tailwind CSS, file-based content, and a small contact API for email delivery.

The site is optimized for a public portfolio use case: profile content, experience, projects, skills, education, contact, SEO metadata, sitemap, robots.txt, analytics, and Vercel deployment.

## Applications

- `src/app`: Single public-facing Next.js application. The home page composes all major portfolio sections and loads project content server-side.
- `src/app/api/contact`: Server route that accepts contact form submissions and sends email through SendGrid.

There are no admin apps, background workers, databases, or separate services in this repository.

## Major Directories

- `components/layout`: Header and footer for the single-page portfolio shell.
- `components/sections`: Page sections such as hero, experience, project gallery, skills, education, and contact.
- `components/ui`: Reusable UI controls such as theme toggle, image modal, copy email button, responsive container, and hero image button.
- `components/providers`: React providers; currently wraps `next-themes`.
- `content/data`: TypeScript data modules for personal, SEO, skills, experience, and education content.
- `content/projects`: MDX project entries with frontmatter used by the project gallery and modal.
- `lib`: Content loading, content management helpers, theme/accessibility utilities, hooks, and test utilities.
- `types`: Shared TypeScript interfaces and content validators.
- `public`: Static images, project screenshots, logos, SVG architecture diagrams, and resume PDF.
- `docs`: Human-facing documentation for API, components, and testing.
- `scripts`: Deployment/setup and environment validation scripts.
- `templates`: Task and review templates for engineering workflow.

## External Dependencies

- Next.js, React, and TypeScript provide the web application runtime and type system.
- Tailwind CSS provides most component styling; `src/app/globals.css` defines global theme variables and shared utility classes.
- `next-themes` persists and applies light/dark mode using a class on the HTML tree.
- SendGrid (`@sendgrid/mail`) sends contact form emails from the API route.
- Vercel Analytics and Speed Insights are included in the root layout.
- `gray-matter`, `marked`, and `sanitize-html` parse project MDX frontmatter and render sanitized project descriptions.
- Jest, React Testing Library, and `fast-check` cover unit, integration, accessibility, and property-based tests.

## Build Commands

- `npm run dev`: Start local development server.
- `npm run build`: Validate environment when required and build with Next.js using webpack.
- `npm run start`: Run the production build locally.
- `npm run lint`: Run ESLint.
- `npm run validate:env`: Validate SendGrid/contact environment variables for production Vercel deployments or when `STRICT_ENV_VALIDATION=true`.

## Test Commands

- `npm test`: Run the Jest suite.
- `npm run test:watch`: Run Jest in watch mode.
- `npm run test:coverage`: Run Jest with coverage.

Tests live beside components in `__tests__` folders, under `lib/__tests__`, and in root-level integration tests.

## Deployment

Production deployment targets Vercel. `vercel.json` configures response headers and a `/resume` redirect. GitHub Actions run lint and tests on pushes and pull requests targeting `main`; deployment is handled by Vercel commands or Vercel project integration.

Required production contact environment variables are `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, and `CONTACT_EMAIL`.

## Known Risk Areas

- `src/app/api/contact/route.ts`: Handles untrusted form input and interpolates it into HTML email. Preserve validation and review escaping/sanitization when changing this route.
- `lib/content.ts` and `types/index.ts`: Project content is filesystem-backed and validated at load time. Schema changes must be reflected in content files, validators, components, and tests.
- Theme behavior spans `ThemeProvider`, `ThemeToggle`, `themeScript`, global CSS variables, and tests. Changes can cause hydration or accessibility regressions.
- SEO behavior is centralized in `content/data/seo.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts`; keep these aligned with canonical site URLs and public assets.
