# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Jest and React Testing Library for unit testing
- ✅ fast-check for property-based testing
- ✅ React Hook Form for form handling
- ✅ Responsive design
- ✅ SEO optimization ready
- ✅ Vercel deployment ready

## Project Structure

```
portfolio-website/
├── src/app/                 # Next.js App Router pages
├── components/              # Reusable React components
│   ├── ui/                 # Basic UI components
│   ├── sections/           # Page sections
│   └── layout/             # Layout components
├── content/                # Content management
│   ├── projects/           # Project data
│   └── data/               # Static data files
├── lib/                    # Utility functions and helpers
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Testing

The project includes both unit testing and property-based testing:

- **Unit Tests**: Using Jest and React Testing Library
- **Property-Based Tests**: Using fast-check for universal property validation
- **Test Utilities**: Custom helpers in `lib/test-utils.tsx` and `lib/property-test-utils.ts`

## Content Management

Update your personal information and content in:

- `content/data/personal.ts` - Personal information and contact details
- `content/data/skills.ts` - Skills and categories
- `content/projects/` - Project descriptions (MDX format)

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push to main branch

## Next Steps

1. Implement the remaining tasks from the implementation plan
2. Add your personal content and projects
3. Customize the design and styling
4. Deploy to Vercel
