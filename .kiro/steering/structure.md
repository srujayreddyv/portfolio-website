# Project Structure & Organization

## Root Directory Layout

```
portfolio-website/
├── src/app/                 # Next.js App Router (pages & layouts)
├── components/              # Reusable React components
├── content/                 # Content management & data
├── lib/                     # Utilities, hooks, and helpers
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
└── [config files]           # Configuration files
```

## Component Organization

### `components/ui/`

- Basic, reusable UI components
- Current components: `ThemeToggle.tsx`, `ResponsiveContainer.tsx`, `ImageModal.tsx`
- Should be framework-agnostic and highly reusable

### `components/sections/`

- Page-specific sections and layouts
- Current components: `Hero.tsx`, `Skills.tsx`, `ProjectGallery.tsx`, `Experience.tsx`, `Education.tsx`, `Contact.tsx`, `ContactForm.tsx`, `Publications.tsx`
- Business logic and content-specific components
- Includes `ProjectCard.tsx` and `ProjectModal.tsx` for project display
- `SkillCategory.tsx` for skills organization

### `components/layout/`

- Layout-related components
- Navigation, headers, footers, page wrappers
- Current components: `Header.tsx`, `Footer.tsx`

### `components/providers/`

- React context providers
- Example: `ThemeProvider.tsx`

### `components/debug/`

- Development and debugging components
- Temporary components for testing and development

## Content Management

### `content/data/`

- Static data files (TypeScript)
- `personal.ts`, `skills.ts`, `experience.ts`, `education.ts`, `seo.ts`

### `content/projects/`

- Project descriptions in MDX format
- Each project gets its own `.mdx` file
- Supports frontmatter for metadata

## Library Organization

### `lib/`

- `content-manager.ts` - Content loading and processing
- `content.ts` - Content utilities and project loading
- `test-utils.tsx` - React Testing Library setup
- `property-test-utils.ts` - Property-based testing utilities

### `lib/hooks/`

- Custom React hooks
- Example: `useResponsive.ts` - Responsive design utilities

## API Routes

### `src/app/api/`

- Next.js API routes for server-side functionality
- `contact/route.ts` - Contact form submission handling with SendGrid integration

## Testing Structure

### Test Co-location

- Tests live in `__tests__/` directories next to components
- Unit tests: `ComponentName.test.tsx`
- Property-based tests: `ComponentName.property.test.tsx`

### Test Categories

- **Unit Tests**: Specific behavior validation
- **Property Tests**: Universal property validation across inputs
- **Integration Tests**: Component interaction testing

## Path Aliases & Imports

### TypeScript Paths

- `@/*` → `./src/*` and root level
- `@/types` → `./types`
- `@/content/*` → `./content/*`

### Import Conventions

- Use path aliases for cleaner imports
- Prefer named exports over default exports
- Group imports: external → internal → relative

## File Naming Conventions

### Components

- PascalCase for component files: `ThemeToggle.tsx`
- camelCase for utility files: `content-manager.ts`

### Tests

- `ComponentName.test.tsx` for unit tests
- `ComponentName.property.test.tsx` for property-based tests
- Test files should mirror the component structure

### Content

- kebab-case for project files: `fastchat-app.mdx`
- camelCase for data files: `personal.ts`

## Configuration Files Location

- Root level: `package.json`, `next.config.ts`, `tailwind.config.js`
- TypeScript: `tsconfig.json`
- Testing: `jest.config.js`, `jest.setup.js`
- Linting: `eslint.config.mjs`
