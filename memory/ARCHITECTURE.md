# Architecture Memory

## System Overview

The system is a single-deployable Next.js portfolio application. Most user-facing content is statically rendered or server-rendered from local TypeScript and MDX files, while interactive sections use client components for navigation, filters, modals, theme switching, and contact form submission.

There is one backend boundary: `POST /api/contact`, implemented as a Next.js route handler. It validates a JSON contact payload and sends an email through SendGrid using environment configuration.

The application has no database, no authentication layer, no user accounts, and no persistent application state beyond browser theme preference.

## Major Components

- Page composition: `src/app/page.tsx` loads projects and composes the portfolio sections inside the shared header/status/footer shell. The current section order prioritizes projects before experience.
- Root document and SEO: `src/app/layout.tsx` defines metadata, structured data, analytics, speed insights, Google-hosted fonts through `next/font`, theme bootstrap script, and the global provider tree.
- Content layer: `lib/content.ts` reads project MDX files, parses frontmatter, renders markdown to sanitized HTML, validates content, and exposes query helpers.
- Content authoring helpers: `lib/content-manager.ts` provides filesystem create/update/delete/import helpers for project MDX files.
- Presentation components: `components/sections`, `components/layout`, and `components/ui` render the portfolio experience and own client-side interaction state.
- Shared contracts: `types/index.ts` defines content, UI, contact, SEO, and validation types.
- Contact API: `src/app/api/contact/route.ts` owns server-side contact validation and SendGrid delivery.

## Data Flow

Static portfolio data starts in `content/data/*.ts` and is imported directly by sections, metadata, sitemap, and robots helpers.

Project data starts as MDX files in `content/projects`. `getAllProjects()` reads filenames, skips hidden project IDs, loads each project by ID, parses frontmatter through `gray-matter`, converts markdown body through `marked`, sanitizes generated HTML with `sanitize-html`, validates with `ContentValidator`, and returns projects sorted by completion date. The home page passes this list into `ProjectGallery`, which applies client-side filters and modal selection.

Contact submissions start in `ContactForm`, are validated client-side by React Hook Form, then posted to `/api/contact`. The API route performs required-field and email validation, checks SendGrid configuration, sends an email, and returns a simple JSON success or error response.

Theme preference is client-side state managed by `next-themes`, persisted under `portfolio-theme`, and applied through the `class` attribute. A small inline theme script runs before hydration to reduce initial theme flicker.

## Authentication And Persistence

There is no application authentication, authorization, session management, database, queue, or server-side persistence. The only persisted user preference is the theme value in browser storage via `next-themes`.

## External Integrations

- SendGrid delivers contact form emails and requires production environment variables.
- Vercel hosts the application and provides Analytics and Speed Insights.
- GitHub Actions provide CI lint/test checks for pushes and pull requests to `main`.

## Architectural Boundaries

- Content schemas and validation belong in `types/index.ts`; content loading belongs in `lib/content.ts`; rendering belongs in components.
- Server-only filesystem reads and MDX parsing should stay in server-side utilities and not move into client components.
- Client components should receive already-loaded project data and own only UI state such as filters, modal selection, menu state, and form state.
- Contact delivery details should remain behind the API route; UI code should not import SendGrid or depend on provider-specific email behavior.
- Global metadata, sitemap, and robots should continue to read from the centralized SEO data module.

## Architectural Constraints

- The site is designed for Vercel and Node.js 20.
- The Next.js React Compiler is enabled in `next.config.ts`.
- Production builds run environment validation through `prebuild`; strict contact env validation applies in Vercel production or when explicitly requested.
- Project descriptions may render HTML derived from markdown, so sanitization is part of the content boundary.
- The public site is a single-page portfolio with hash navigation; section IDs and header navigation must stay coordinated.

## Extension Points

- Add portfolio content by editing `content/data/*.ts` or adding validated MDX files in `content/projects`.
- Add new sections by creating a `components/sections` component and composing it in `src/app/page.tsx`; update header navigation only when the section participates in hash navigation.
- Add new reusable controls in `components/ui` when behavior is shared across sections.
- Add API behavior under `src/app/api` when server-side secrets or external integrations are required.
