# Testing Guide

Comprehensive guide for testing the portfolio website, covering unit tests, property-based tests, and integration testing strategies.

## 🧪 Testing Philosophy

Our testing approach follows these principles:

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **User-Centric Testing**: Test from the user's perspective using React Testing Library
3. **Property-Based Testing**: Verify universal properties across randomized inputs
4. **Comprehensive Coverage**: Combine unit tests, property tests, and integration tests
5. **Fast Feedback**: Tests should run quickly and provide clear error messages

## 📚 Testing Stack

### Core Testing Libraries

- **Jest 30.2.0**: Test runner and assertion library
- **React Testing Library 16.3.2**: Component testing utilities
- **Testing Library User Event 14.6.1**: User interaction simulation
- **fast-check 4.5.3**: Property-based testing for TypeScript
- **jsdom**: DOM environment for Node.js testing

### Custom Testing Utilities

- **`lib/test-utils.tsx`**: React Testing Library setup with providers
- **`lib/property-test-utils.ts`**: Property-based testing helpers
- **`__mocks__/`**: Mock implementations for external dependencies

## 🏗️ Test Structure

### File Organization

```
components/
├── ui/
│   ├── ThemeToggle.tsx
│   └── __tests__/
│       ├── ThemeToggle.test.tsx           # Unit tests
│       └── ThemeToggle.property.test.tsx  # Property-based tests
├── sections/
│   ├── ContactForm.tsx
│   └── __tests__/
│       ├── ContactForm.test.tsx
│       └── ContactForm.property.test.tsx
└── layout/
    ├── Header.tsx
    └── __tests__/
        └── Header.test.tsx
```

### Naming Conventions

- **Unit Tests**: `ComponentName.test.tsx`
- **Property Tests**: `ComponentName.property.test.tsx`
- **Integration Tests**: `ComponentName.integration.test.tsx`
- **Mock Files**: `__mocks__/moduleName.js`

## 🔧 Test Configuration

### Jest Configuration

**File:** `jest.config.js`

```javascript
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
  },
  collectCoverageFrom: [
    "components/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transformIgnorePatterns: ["node_modules/(?!(marked)/)"],
};

module.exports = createJestConfig(customJestConfig);
```

### Test Setup

**File:** `jest.setup.js`

```javascript
import "@testing-library/jest-dom";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));
```

## 🧩 Unit Testing

### Basic Component Testing

```typescript
// components/ui/__tests__/ThemeToggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '../ThemeToggle';

// Custom render function with providers
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light">
      {ui}
    </ThemeProvider>
  );
};

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies custom className', () => {
    renderWithProviders(<ThemeToggle className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
```

### Form Testing

```typescript
// components/sections/__tests__/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

// Mock fetch
global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger validation

    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Message sent successfully!' }),
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Test message content');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Subject',
          message: 'Test message content',
        }),
      });
    });

    expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
  });

  it('handles submission errors gracefully', async () => {
    const user = userEvent.setup();
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<ContactForm />);

    // Fill form with valid data
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Test message content');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
  });
});
```

### Testing Custom Hooks

```typescript
// lib/hooks/__tests__/useResponsive.test.ts
import { renderHook } from "@testing-library/react";
import { useResponsive } from "../useResponsive";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("useResponsive", () => {
  it("returns correct breakpoint values", () => {
    const { result } = renderHook(() => useResponsive());

    expect(result.current).toHaveProperty("isMobile");
    expect(result.current).toHaveProperty("isTablet");
    expect(result.current).toHaveProperty("isDesktop");
    expect(typeof result.current.isMobile).toBe("boolean");
  });

  it("updates when window size changes", () => {
    // Mock mobile viewport
    (window.matchMedia as jest.Mock).mockImplementation((query) => ({
      matches: query === "(max-width: 768px)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useResponsive());
    expect(result.current.isMobile).toBe(true);
  });
});
```

## 🎲 Property-Based Testing

### Basic Property Testing

```typescript
// components/sections/__tests__/ContactForm.property.test.tsx
import fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

describe('ContactForm Properties', () => {
  /**
   * Property 5: Form validation and submission
   * For any contact form submission, invalid forms should be rejected with
   * appropriate validation messages, and valid forms should be processed successfully
   * **Validates: Requirements 5.3, 5.4**
   */
  it('should validate email format correctly for any email input', () => {
    fc.assert(fc.property(
      fc.emailAddress(),
      async (email) => {
        render(<ContactForm />);
        const emailInput = screen.getByLabelText(/email/i);

        await userEvent.type(emailInput, email);
        await userEvent.tab();

        // Valid emails should not show validation errors
        expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
      }
    ), { numRuns: 50 });
  });

  it('should reject invalid email formats', () => {
    fc.assert(fc.property(
      fc.string().filter(s => !s.includes('@') && s.length > 0),
      async (invalidEmail) => {
        render(<ContactForm />);
        const emailInput = screen.getByLabelText(/email/i);

        await userEvent.type(emailInput, invalidEmail);
        await userEvent.tab();

        // Invalid emails should show validation errors
        expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
      }
    ), { numRuns: 50 });
  });

  it('should handle any valid form data correctly', () => {
    fc.assert(fc.property(
      fc.record({
        name: fc.string({ minLength: 2, maxLength: 100 }),
        email: fc.emailAddress(),
        subject: fc.string({ minLength: 5, maxLength: 200 }),
        message: fc.string({ minLength: 10, maxLength: 2000 }),
      }),
      async (formData) => {
        // Mock successful API response
        global.fetch = jest.fn().mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        });

        render(<ContactForm />);

        await userEvent.type(screen.getByLabelText(/name/i), formData.name);
        await userEvent.type(screen.getByLabelText(/email/i), formData.email);
        await userEvent.type(screen.getByLabelText(/subject/i), formData.subject);
        await userEvent.type(screen.getByLabelText(/message/i), formData.message);

        await userEvent.click(screen.getByRole('button', { name: /send message/i }));

        // Form should submit without validation errors
        expect(fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(formData),
        }));
      }
    ), { numRuns: 25 });
  });
});
```

### Advanced Property Testing

```typescript
// components/sections/__tests__/ProjectGallery.property.test.tsx
import fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { ProjectGallery } from '../ProjectGallery';

// Custom generators
const projectGenerator = fc.record({
  id: fc.string({ minLength: 1 }),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  description: fc.string({ minLength: 1, maxLength: 500 }),
  technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 }),
  category: fc.string({ minLength: 1 }),
  featured: fc.boolean(),
  imageUrl: fc.webUrl(),
  completedDate: fc.date().map(d => d.toISOString()),
});

describe('ProjectGallery Properties', () => {
  /**
   * Property 2: Project interaction completeness
   * For any project in the gallery, clicking on it should display all required
   * information including description, technologies used, and outcomes
   * **Validates: Requirements 3.2, 3.3**
   */
  it('should display all projects with required information', () => {
    fc.assert(fc.property(
      fc.array(projectGenerator, { minLength: 1, maxLength: 20 }),
      (projects) => {
        render(<ProjectGallery projects={projects} />);

        projects.forEach(project => {
          // Each project should be displayed
          expect(screen.getByText(project.title)).toBeInTheDocument();
          expect(screen.getByText(project.description)).toBeInTheDocument();

          // Technologies should be displayed
          project.technologies.forEach(tech => {
            expect(screen.getByText(tech)).toBeInTheDocument();
          });
        });
      }
    ), { numRuns: 10 });
  });

  /**
   * Property 3: Project visual consistency
   * For any project in the gallery, it should include a preview image and be
   * organized according to its category or technology type
   * **Validates: Requirements 3.4, 3.5**
   */
  it('should organize projects by category consistently', () => {
    fc.assert(fc.property(
      fc.array(projectGenerator, { minLength: 2, maxLength: 10 }),
      (projects) => {
        render(<ProjectGallery projects={projects} showFilters={true} />);

        // Get unique categories
        const categories = [...new Set(projects.map(p => p.category))];

        // Each category should appear in filters
        categories.forEach(category => {
          expect(screen.getByText(category)).toBeInTheDocument();
        });

        // Each project should have an image
        projects.forEach(project => {
          const images = screen.getAllByRole('img');
          expect(images.some(img =>
            img.getAttribute('alt')?.includes(project.title)
          )).toBe(true);
        });
      }
    ), { numRuns: 10 });
  });
});
```

### Property Test Utilities

```typescript
// lib/property-test-utils.ts
import fc from "fast-check";

/**
 * Custom generators for common data types
 */
export const generators = {
  // Email generator with better validation
  email: fc.emailAddress(),

  // Non-empty string generator
  nonEmptyString: fc
    .string({ minLength: 1 })
    .filter((s) => s.trim().length > 0),

  // Valid name generator (letters, spaces, hyphens)
  personName: fc
    .string({ minLength: 2, maxLength: 50 })
    .filter((s) => /^[a-zA-Z\s\-']+$/.test(s) && s.trim().length > 1),

  // URL generator
  url: fc.webUrl(),

  // Technology stack generator
  technology: fc.constantFrom(
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "AWS",
  ),

  // Project category generator
  projectCategory: fc.constantFrom(
    "Frontend",
    "Backend",
    "Full Stack",
    "Mobile",
    "Data Science",
    "DevOps",
  ),

  // Date string generator (ISO format)
  dateString: fc
    .date({ min: new Date("2020-01-01"), max: new Date() })
    .map((d) => d.toISOString()),
};

/**
 * Property test configuration
 */
export const propertyTestConfig = {
  numRuns: 100,
  timeout: 5000,
  verbose: process.env.NODE_ENV === "development",
};

/**
 * Helper function to run property tests with consistent configuration
 */
export function runPropertyTest<T>(
  property: fc.Property<T>,
  config: Partial<typeof propertyTestConfig> = {},
) {
  return fc.assert(property, { ...propertyTestConfig, ...config });
}

/**
 * Validation helpers
 */
export const validators = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isNonEmptyString: (str: string): boolean => {
    return typeof str === "string" && str.trim().length > 0;
  },
};
```

## 🔗 Integration Testing

### Component Integration

```typescript
// components/__tests__/HomePage.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'next-themes';
import HomePage from '@/app/page';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light">
      {ui}
    </ThemeProvider>
  );
};

describe('HomePage Integration', () => {
  it('renders all main sections', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByText(/hero/i)).toBeInTheDocument(); // Hero section
    expect(screen.getByText(/skills/i)).toBeInTheDocument(); // Skills section
    expect(screen.getByText(/projects/i)).toBeInTheDocument(); // Projects section
    expect(screen.getByText(/contact/i)).toBeInTheDocument(); // Contact section
  });

  it('navigates between sections smoothly', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);

    const skillsLink = screen.getByRole('link', { name: /skills/i });
    await user.click(skillsLink);

    // Should scroll to skills section
    await waitFor(() => {
      const skillsSection = screen.getByTestId('skills-section');
      expect(skillsSection).toBeVisible();
    });
  });

  it('theme toggle affects all components', async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);

    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(themeToggle);

    // Check if dark mode classes are applied
    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark');
    });
  });

  it('contact form integration works end-to-end', async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Message sent!' }),
    });

    renderWithProviders(<HomePage />);

    // Navigate to contact section
    const contactLink = screen.getByRole('link', { name: /contact/i });
    await user.click(contactLink);

    // Fill and submit contact form
    await user.type(screen.getByLabelText(/name/i), 'Integration Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Integration test message');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });
});
```

## 📊 Test Coverage

### Coverage Configuration

```javascript
// jest.config.js (coverage section)
collectCoverageFrom: [
  'components/**/*.{js,jsx,ts,tsx}',
  'lib/**/*.{js,jsx,ts,tsx}',
  'src/**/*.{js,jsx,ts,tsx}',
  '!**/*.d.ts',
  '!**/node_modules/**',
  '!**/__tests__/**',
  '!**/coverage/**',
],
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
  './components/': {
    branches: 85,
    functions: 85,
    lines: 85,
    statements: 85,
  },
},
coverageReporters: ['text', 'lcov', 'html'],
```

### Running Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# View HTML coverage report
open coverage/lcov-report/index.html
```

### Coverage Best Practices

1. **Aim for 80%+ overall coverage**
2. **Focus on critical paths and edge cases**
3. **Don't chase 100% coverage at the expense of test quality**
4. **Use coverage to identify untested code, not as a quality metric**

## 🚀 Running Tests

### Development Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- ContactForm.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="validation"

# Run only property-based tests
npm test -- --testPathPattern="property.test"

# Run tests with verbose output
npm test -- --verbose

# Update snapshots
npm test -- --updateSnapshot
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage --watchAll=false
      - run: npm run build

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

## 🐛 Debugging Tests

### Common Issues and Solutions

**1. Tests timing out:**

```typescript
// Increase timeout for slow tests
jest.setTimeout(10000);

// Or for specific test
it("slow test", async () => {
  // test code
}, 10000);
```

**2. Async operations not completing:**

```typescript
// Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText("Loading complete")).toBeInTheDocument();
});

// Use findBy queries for async elements
const element = await screen.findByText("Async content");
```

**3. Mock not working:**

```typescript
// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});

// Reset modules if needed
beforeEach(() => {
  jest.resetModules();
});
```

### Debugging Tools

```typescript
// Debug rendered component
import { screen } from "@testing-library/react";

// Print current DOM
screen.debug();

// Print specific element
screen.debug(screen.getByRole("button"));

// Use logRoles to see available roles
import { logRoles } from "@testing-library/dom";
logRoles(container);
```

## 📝 Test Writing Best Practices

### 1. Test Structure (AAA Pattern)

```typescript
it('should do something when condition is met', () => {
  // Arrange
  const props = { value: 'test' };

  // Act
  render(<Component {...props} />);
  fireEvent.click(screen.getByRole('button'));

  // Assert
  expect(screen.getByText('Expected result')).toBeInTheDocument();
});
```

### 2. Descriptive Test Names

```typescript
// Good
it("should display validation error when email format is invalid");
it("should submit form successfully with valid data");
it("should toggle theme when theme button is clicked");

// Avoid
it("should work");
it("test email validation");
it("button click");
```

### 3. Test User Behavior

```typescript
// Good - tests user behavior
it('should show success message after form submission', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/success/i)).toBeInTheDocument();
});

// Avoid - tests implementation details
it('should call handleSubmit when form is submitted', () => {
  const handleSubmit = jest.fn();
  render(<ContactForm onSubmit={handleSubmit} />);

  fireEvent.submit(screen.getByRole('form'));

  expect(handleSubmit).toHaveBeenCalled();
});
```

### 4. Use Appropriate Queries

```typescript
// Preferred query priority (most to least accessible)
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText(/email/i);
screen.getByPlaceholderText(/enter email/i);
screen.getByText(/submit/i);
screen.getByDisplayValue(/current value/i);
screen.getByAltText(/profile picture/i);
screen.getByTitle(/tooltip text/i);
screen.getByTestId("submit-button"); // Last resort
```

### 5. Property Test Guidelines

```typescript
// Good property test
it("should validate any valid email address", () => {
  fc.assert(
    fc.property(fc.emailAddress(), (email) => {
      const result = validateEmail(email);
      expect(result).toBe(true);
    }),
  );
});

// Include requirement validation comment
/**
 * Property 5: Form validation and submission
 * **Validates: Requirements 5.3, 5.4**
 */
```

## 🎯 Testing Checklist

### Before Writing Tests

- [ ] Understand the component's purpose and user interactions
- [ ] Identify edge cases and error conditions
- [ ] Plan test scenarios (happy path, error cases, edge cases)
- [ ] Consider accessibility requirements

### Writing Tests

- [ ] Use descriptive test names
- [ ] Follow AAA pattern (Arrange, Act, Assert)
- [ ] Test user behavior, not implementation
- [ ] Use appropriate queries (prefer accessible queries)
- [ ] Include both unit and property-based tests
- [ ] Mock external dependencies appropriately

### After Writing Tests

- [ ] Tests pass consistently
- [ ] Coverage meets requirements
- [ ] Tests are fast and reliable
- [ ] Error messages are clear and helpful
- [ ] Tests document expected behavior

---

This testing guide provides a comprehensive foundation for maintaining high-quality, reliable tests in the portfolio website. Remember that good tests serve as documentation and provide confidence when making changes to the codebase.
