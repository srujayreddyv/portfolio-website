# Technology Stack

## Core Framework

- **Next.js 16.1.6** with App Router
- **React 19.2.3** with React Compiler enabled
- **TypeScript 5** for type safety

## Styling & UI

- **Tailwind CSS 3.4.17** for utility-first styling
- **Lucide React 0.563.0** for consistent iconography
- **next-themes 0.4.6** for theme management
- **PostCSS 8.4.49** with Autoprefixer 10.4.20

## Forms & Validation

- **React Hook Form 7.71.1** for form handling

## Content Management

- **Gray Matter 4.0.3** for MDX frontmatter parsing
- **Marked 17.0.1** for markdown processing
- **MDX** format for project descriptions

## Email Integration

- **SendGrid Mail 8.1.4** for contact form email delivery

## Testing Framework

- **Jest 30.2.0** with jsdom environment
- **React Testing Library 16.3.2** for component testing
- **Testing Library User Event 14.6.1** for interaction testing
- **fast-check 4.5.3** for property-based testing
- Custom test utilities in `lib/test-utils.tsx` and `lib/property-test-utils.ts`

## Development Tools

- **ESLint 9** with Next.js configuration
- **Babel React Compiler 1.0.0** plugin
- **TypeScript 5** strict mode enabled

## Common Commands

### Development

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Project Structure Commands

- Tests should be co-located with components using `__tests__` directories
- Property-based tests use `.property.test.tsx` suffix
- Unit tests use `.test.tsx` suffix

## Build Configuration

- **React Compiler**: Enabled in next.config.ts with babel-plugin-react-compiler
- **Path Aliases**: `@/*` maps to `src/*` and root level
- **Content Paths**: `@/content/*` for content management
- **Dark Mode**: Class-based with Tailwind CSS and next-themes
- **Email API**: SendGrid integration for contact form functionality

## Environment Variables

Required for production:

- `SENDGRID_API_KEY` - SendGrid API key for email functionality
- `SENDGRID_FROM_EMAIL` - Verified sender email address

## Performance Features

- **React Compiler**: Automatic optimization of React components
- **Next.js App Router**: Server-side rendering and static generation
- **Image Optimization**: Built-in Next.js image optimization
- **Bundle Analysis**: Webpack bundle analyzer integration
