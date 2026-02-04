# Portfolio Website

A modern, responsive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. Features comprehensive testing, SEO optimization, and production-ready deployment configuration.

## 🚀 Features

- **Next.js 16** with App Router and React Compiler
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** for utility-first styling with dark/light theme support
- **Comprehensive Testing** with Jest, React Testing Library, and fast-check property-based testing
- **SEO Optimized** with meta tags, structured data, sitemap, and robots.txt
- **Contact Form** with SendGrid integration
- **Responsive Design** that works perfectly on all devices
- **Performance Optimized** with static site generation and image optimization
- **Production Ready** with Vercel deployment configuration and CI/CD pipeline

## 📁 Project Structure

```
portfolio-website/
├── src/app/                 # Next.js App Router (pages & layouts)
├── components/              # Reusable React components
│   ├── ui/                 # Basic UI components (ThemeToggle, ImageModal)
│   ├── sections/           # Page sections (Hero, Skills, Projects, Contact)
│   ├── layout/             # Layout components (Header, Footer)
│   └── providers/          # React context providers (ThemeProvider)
├── content/                # Content management system
│   ├── projects/           # Project descriptions in MDX format
│   └── data/               # Static data files (personal, skills, SEO)
├── lib/                    # Utilities, hooks, and helpers
│   ├── hooks/              # Custom React hooks
│   └── __tests__/          # Library-level tests
├── types/                  # TypeScript type definitions
├── public/                 # Static assets (images, resume, SEO files)
├── scripts/                # Deployment and validation scripts
└── .github/workflows/      # GitHub Actions CI/CD pipeline
```

## 🛠️ Tech Stack

### Core Framework

- **Next.js 16.1.6** with App Router
- **React 19.2.3** with React Compiler enabled
- **TypeScript 5** for type safety

### Styling & UI

- **Tailwind CSS 3.4.17** for utility-first styling
- **Lucide React 0.563.0** for consistent iconography
- **next-themes 0.4.6** for theme management

### Forms & Email

- **React Hook Form 7.71.1** for form handling
- **SendGrid Mail 8.1.4** for contact form email delivery

### Testing Framework

- **Jest 30.2.0** with jsdom environment
- **React Testing Library 16.3.2** for component testing
- **fast-check 4.5.3** for property-based testing

### Content Management

- **Gray Matter 4.0.3** for MDX frontmatter parsing
- **Marked 17.0.1** for markdown processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/srujayreddyv/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Add your environment variables (SendGrid required):

   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   CONTACT_EMAIL=your@email.com
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## 📜 Available Scripts

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

### Deployment

```bash
npm run deploy          # Deploy to production
npm run deploy:preview  # Deploy preview
npm run setup:vercel    # Interactive Vercel setup
npm run validate:env    # Check environment variables
```

## 🧪 Testing

The project includes comprehensive testing with both unit tests and property-based tests:

### Unit Tests

- Component rendering and behavior
- Form validation and submission
- Navigation and user interactions
- API route functionality

### Property-Based Tests

- Universal correctness properties across all inputs
- Content management system validation
- SEO optimization verification
- Theme system consistency
- Form validation edge cases

### Running Tests

```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode for development
npm run test:coverage      # Generate coverage report
```

## 📝 Content Management

### Personal Information

Update your details in `content/data/personal.ts`:

```typescript
export const personalData = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio...",
  email: "your@email.com",
  // ... other fields
};
```

### Skills

Modify `content/data/skills.ts` to reflect your technical skills:

```typescript
export const skillsData = {
  "Programming Languages": ["JavaScript", "TypeScript", "Python"],
  // ... other categories
};
```

### Projects

Add project descriptions in `content/projects/` as MDX files:

```markdown
---
title: "Project Name"
description: "Brief description"
technologies: ["React", "Next.js"]
category: "Web Development"
featured: true
---

Detailed project description...
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `portfolio-website`
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Environment Variables in Vercel:**
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   CONTACT_EMAIL=your@email.com
   ```

### GitHub Actions CI/CD

The project includes a GitHub Actions workflow for automated testing and deployment:

- ✅ Runs tests on every pull request
- ✅ Validates build process
- ✅ Deploys to Vercel automatically
- ✅ Creates preview deployments for PRs

## 🎨 Customization

### Theme Colors

Modify `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors
      },
    },
  },
};
```

### Layout and Styling

- Components are in `components/` directory
- Styles use Tailwind CSS utility classes
- Theme switching is handled by `next-themes`

### Content Structure

- Projects: `content/projects/*.mdx`
- Personal data: `content/data/*.ts`
- Static assets: `public/`

## 📊 Performance

The website achieves excellent performance metrics:

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Time to Interactive**: <3s

## 🔧 Environment Variables

### Required

- `SENDGRID_API_KEY` - SendGrid API key for email functionality
- `SENDGRID_FROM_EMAIL` - Verified sender email address
- `CONTACT_EMAIL` - Email address where contact form submissions are sent

### Optional

- `NEXT_PUBLIC_SITE_URL` - Your website URL for SEO

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Email service by [SendGrid](https://sendgrid.com/)
- Deployed on [Vercel](https://vercel.com/)

## 📞 Support

If you have any questions or need help with setup, please:

1. Check the [DEPLOYMENT.md](DEPLOYMENT.md) guide
2. Review the troubleshooting section
3. Open an issue on GitHub
4. Contact: srujayreddyv@icloud.com

---

**Live Demo**: [https://srujays-portfolio.vercel.app](https://srujays-portfolio.vercel.app)  
**Repository**: [https://github.com/srujayreddyv/portfolio-website](https://github.com/srujayreddyv/portfolio-website)
