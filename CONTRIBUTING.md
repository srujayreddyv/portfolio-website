# Contributing to Portfolio Website

Thank you for your interest in contributing to this portfolio website project! This guide will help you get started with contributing to the codebase.

## 🤝 How to Contribute

### Types of Contributions

We welcome several types of contributions:

- **🐛 Bug Reports**: Report issues or unexpected behavior
- **✨ Feature Requests**: Suggest new features or improvements
- **📝 Documentation**: Improve or add documentation
- **🔧 Code Contributions**: Fix bugs or implement new features
- **🧪 Testing**: Add or improve tests
- **🎨 Design**: UI/UX improvements and accessibility enhancements

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (recommended: 20+)
- **npm** or **yarn**
- **Git** for version control
- **Code Editor** (VS Code recommended)

### Development Setup

1. **Fork the Repository**

   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

5. **Verify Setup**
   - Open [http://localhost:3000](http://localhost:3000)
   - Run tests: `npm test`
   - Check linting: `npm run lint`

## 📋 Development Workflow

### Branch Strategy

We use a simple Git flow:

- **`main`**: Production-ready code
- **`feature/*`**: New features
- **`fix/*`**: Bug fixes
- **`docs/*`**: Documentation updates
- **`test/*`**: Test improvements

### Making Changes

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the coding standards (see below)
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**

   ```bash
   # Run all tests
   npm test

   # Run linting
   npm run lint

   # Test build
   npm run build
   ```

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request on GitHub
   ```

## 📝 Coding Standards

### Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

### TypeScript Guidelines

- **Use strict typing**: Avoid `any` types
- **Define interfaces**: For props and data structures
- **Use type assertions carefully**: Prefer type guards
- **Export types**: Make reusable types available

```typescript
// Good
interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  featured?: boolean;
}

// Avoid
const project: any = { ... };
```

### React Guidelines

- **Functional Components**: Use function components with hooks
- **Custom Hooks**: Extract reusable logic
- **Props Destructuring**: Destructure props in function signature
- **Event Handlers**: Use descriptive names

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}
```

### CSS/Tailwind Guidelines

- **Utility-First**: Use Tailwind utilities
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Support both light and dark themes
- **Accessibility**: Include focus states and ARIA attributes

```tsx
// Good
<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Click me
</button>
```

## 🧪 Testing Guidelines

### Test Types

We use multiple testing approaches:

1. **Unit Tests**: Test individual components and functions
2. **Property-Based Tests**: Test universal properties with random inputs
3. **Integration Tests**: Test component interactions

### Writing Tests

**Unit Test Example:**

```typescript
// components/ui/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Property-Based Test Example:**

```typescript
// components/sections/__tests__/ContactForm.property.test.tsx
import fc from "fast-check";
import { validateEmail } from "../ContactForm";

describe("ContactForm Properties", () => {
  it("should validate email format correctly", () => {
    fc.assert(
      fc.property(fc.emailAddress(), (email) => {
        expect(validateEmail(email)).toBe(true);
      }),
    );
  });
});
```

### Test Requirements

- **New Features**: Must include tests
- **Bug Fixes**: Should include regression tests
- **Coverage**: Aim for >80% coverage
- **Property Tests**: Use for universal behaviors

## 📚 Documentation Standards

### Code Documentation

- **JSDoc Comments**: For complex functions
- **README Updates**: For new features
- **Type Definitions**: Well-documented interfaces

```typescript
/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns True if email format is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### Component Documentation

Document component props and usage:

````typescript
/**
 * ProjectCard component displays project information in a card format
 *
 * @example
 * ```tsx
 * <ProjectCard
 *   title="My Project"
 *   description="A cool project"
 *   technologies={["React", "TypeScript"]}
 *   featured={true}
 * />
 * ```
 */
interface ProjectCardProps {
  /** Project title */
  title: string;
  /** Brief project description */
  description: string;
  /** Array of technologies used */
  technologies: string[];
  /** Whether this project should be featured */
  featured?: boolean;
}
````

## 🎯 Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat: add dark mode toggle to header
fix: resolve contact form validation issue
docs: update deployment guide with new steps
test: add property tests for form validation
refactor: extract email validation to utility function
```

## 🔍 Pull Request Process

### PR Checklist

Before submitting a pull request:

- [ ] **Tests Pass**: All tests are passing
- [ ] **Linting**: Code follows style guidelines
- [ ] **Build**: Project builds successfully
- [ ] **Documentation**: Updated relevant documentation
- [ ] **Self-Review**: Reviewed your own code
- [ ] **Description**: Clear PR description with context

### PR Template

```markdown
## Description

Brief description of changes made.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Test improvements

## Testing

- [ ] Unit tests added/updated
- [ ] Property tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)

Add screenshots for UI changes.

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests pass locally
- [ ] Documentation updated
```

### Review Process

1. **Automated Checks**: GitHub Actions will run tests and linting
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

## 🐛 Bug Reports

### Before Reporting

1. **Search Existing Issues**: Check if the bug is already reported
2. **Reproduce**: Ensure you can consistently reproduce the issue
3. **Environment**: Note your browser, OS, and device details

### Bug Report Template

```markdown
## Bug Description

Clear description of the bug.

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What you expected to happen.

## Actual Behavior

What actually happened.

## Environment

- Browser: [e.g., Chrome 91]
- OS: [e.g., macOS 12.0]
- Device: [e.g., iPhone 12, Desktop]
- Screen Size: [e.g., 1920x1080]

## Screenshots

Add screenshots if applicable.

## Additional Context

Any other context about the problem.
```

## ✨ Feature Requests

### Feature Request Template

```markdown
## Feature Description

Clear description of the feature you'd like to see.

## Problem Statement

What problem does this feature solve?

## Proposed Solution

How would you like this feature to work?

## Alternatives Considered

Other solutions you've considered.

## Additional Context

Any other context, mockups, or examples.
```

## 🏷️ Issue Labels

We use labels to categorize issues:

- **`bug`**: Something isn't working
- **`enhancement`**: New feature or request
- **`documentation`**: Documentation improvements
- **`good first issue`**: Good for newcomers
- **`help wanted`**: Extra attention needed
- **`priority: high`**: High priority issues
- **`priority: low`**: Low priority issues

## 🎉 Recognition

Contributors will be recognized in:

- **README.md**: Contributors section
- **GitHub**: Contributor graphs and statistics
- **Release Notes**: Major contributions mentioned

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: [srujayreddyv@icloud.com](mailto:srujayreddyv@icloud.com)

### Resources

- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **React Documentation**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this portfolio website better! 🚀
