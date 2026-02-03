# Component Documentation

This document provides comprehensive documentation for all React components in the portfolio website.

## 📁 Component Architecture

The components are organized into several categories:

```
components/
├── ui/                  # Basic, reusable UI components
├── sections/            # Page-specific sections
├── layout/              # Layout and navigation components
├── providers/           # React context providers
└── debug/               # Development and debugging components
```

## 🧩 UI Components

### ThemeToggle

A toggle button for switching between light and dark themes.

**Location:** `components/ui/ThemeToggle.tsx`

**Props:**

```typescript
interface ThemeToggleProps {
  className?: string;
}
```

**Usage:**

```tsx
import { ThemeToggle } from "@/components/ui/ThemeToggle";

<ThemeToggle className="ml-4" />;
```

**Features:**

- Automatic theme detection from system preferences
- Smooth transition animations
- Accessible keyboard navigation
- Icon changes based on current theme

---

### ResponsiveContainer

A responsive container component that adapts to different screen sizes.

**Location:** `components/ui/ResponsiveContainer.tsx`

**Props:**

```typescript
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}
```

**Usage:**

```tsx
import { ResponsiveContainer } from "@/components/ui/ResponsiveContainer";

<ResponsiveContainer maxWidth="lg" padding>
  <div>Your content here</div>
</ResponsiveContainer>;
```

**Features:**

- Responsive max-width constraints
- Consistent padding across breakpoints
- Center alignment
- Customizable container sizes

---

### ImageModal

A modal component for displaying images in full-screen view.

**Location:** `components/ui/ImageModal.tsx`

**Props:**

```typescript
interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}
```

**Usage:**

```tsx
import { ImageModal } from "@/components/ui/ImageModal";

const [isModalOpen, setIsModalOpen] = useState(false);

<ImageModal
  src="/projects/project-screenshot.png"
  alt="Project Screenshot"
  title="Project Name"
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>;
```

**Features:**

- Full-screen image display
- Keyboard navigation (ESC to close)
- Click outside to close
- Smooth fade animations
- Accessible focus management

## 📄 Section Components

### Hero

The main hero section with personal introduction and call-to-action.

**Location:** `components/sections/Hero.tsx`

**Props:**

```typescript
interface HeroProps {
  personalData: PersonalData;
}
```

**Usage:**

```tsx
import { Hero } from "@/components/sections/Hero";
import { personalData } from "@/content/data/personal";

<Hero personalData={personalData} />;
```

**Features:**

- Responsive profile image with Next.js Image optimization
- Animated text introduction
- Social media links
- Call-to-action buttons
- Smooth scroll navigation

---

### Skills

Displays skills organized by categories with visual indicators.

**Location:** `components/sections/Skills.tsx`

**Props:**

```typescript
interface SkillsProps {
  skillsData: SkillsData;
}
```

**Usage:**

```tsx
import { Skills } from "@/components/sections/Skills";
import { skillsData } from "@/content/data/skills";

<Skills skillsData={skillsData} />;
```

**Features:**

- Categorized skill display
- Responsive grid layout
- Hover animations
- Technology icons (where available)
- Skill level indicators (optional)

---

### SkillCategory

Individual skill category component used within the Skills section.

**Location:** `components/sections/SkillCategory.tsx`

**Props:**

```typescript
interface SkillCategoryProps {
  category: string;
  skills: string[];
  className?: string;
}
```

**Usage:**

```tsx
import { SkillCategory } from "@/components/sections/SkillCategory";

<SkillCategory
  category="Frontend Development"
  skills={["React", "Next.js", "TypeScript"]}
/>;
```

**Features:**

- Category title with styling
- Skill badges with hover effects
- Responsive layout
- Consistent spacing

---

### ProjectGallery

Displays a gallery of projects with filtering and modal functionality.

**Location:** `components/sections/ProjectGallery.tsx`

**Props:**

```typescript
interface ProjectGalleryProps {
  projects: Project[];
  showFilters?: boolean;
  maxProjects?: number;
}
```

**Usage:**

```tsx
import { ProjectGallery } from "@/components/sections/ProjectGallery";

<ProjectGallery projects={projects} showFilters={true} maxProjects={6} />;
```

**Features:**

- Responsive grid layout
- Project filtering by technology/category
- Featured project highlighting
- Modal integration for project details
- Lazy loading for performance

---

### ProjectCard

Individual project card component used within ProjectGallery.

**Location:** `components/sections/ProjectCard.tsx`

**Props:**

```typescript
interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  featured?: boolean;
}
```

**Usage:**

```tsx
import { ProjectCard } from "@/components/sections/ProjectCard";

<ProjectCard
  project={project}
  onClick={() => openProjectModal(project)}
  featured={project.featured}
/>;
```

**Features:**

- Project image with Next.js Image optimization
- Technology badges
- Hover animations
- Featured project styling
- Click handling for modal opening

---

### ProjectModal

Modal component for displaying detailed project information.

**Location:** `components/sections/ProjectModal.tsx`

**Props:**

```typescript
interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}
```

**Usage:**

```tsx
import { ProjectModal } from "@/components/sections/ProjectModal";

<ProjectModal
  project={selectedProject}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>;
```

**Features:**

- Detailed project information display
- Image gallery with navigation
- External links (live demo, GitHub)
- Technology stack display
- Responsive design
- Keyboard navigation

---

### Experience

Displays work experience in a timeline format.

**Location:** `components/sections/Experience.tsx`

**Props:**

```typescript
interface ExperienceProps {
  experienceData: ExperienceData[];
}
```

**Usage:**

```tsx
import { Experience } from "@/components/sections/Experience";
import { experienceData } from "@/content/data/experience";

<Experience experienceData={experienceData} />;
```

**Features:**

- Timeline layout
- Company logos
- Date ranges
- Responsibility lists
- Responsive design

---

### Education

Displays educational background and achievements.

**Location:** `components/sections/Education.tsx`

**Props:**

```typescript
interface EducationProps {
  educationData: EducationData[];
}
```

**Usage:**

```tsx
import { Education } from "@/components/sections/Education";
import { educationData } from "@/content/data/education";

<Education educationData={educationData} />;
```

**Features:**

- Institution information
- Degree details
- GPA display (optional)
- Relevant coursework
- Achievements and honors

---

### Publications

Displays research publications and academic work.

**Location:** `components/sections/Publications.tsx`

**Props:**

```typescript
interface PublicationsProps {
  publicationsData: Publication[];
}
```

**Usage:**

```tsx
import { Publications } from "@/components/sections/Publications";

<Publications publicationsData={publications} />;
```

**Features:**

- Citation formatting
- Publication links
- Abstract display
- Author highlighting
- Date sorting

---

### Contact

Contact information and social media links section.

**Location:** `components/sections/Contact.tsx`

**Props:**

```typescript
interface ContactProps {
  personalData: PersonalData;
}
```

**Usage:**

```tsx
import { Contact } from "@/components/sections/Contact";

<Contact personalData={personalData} />;
```

**Features:**

- Contact information display
- Social media links with icons
- Location information
- Professional links
- Contact form integration

---

### ContactForm

Interactive contact form with validation and submission handling.

**Location:** `components/sections/ContactForm.tsx`

**Props:**

```typescript
interface ContactFormProps {
  className?: string;
}
```

**Usage:**

```tsx
import { ContactForm } from "@/components/sections/ContactForm";

<ContactForm className="mt-8" />;
```

**Features:**

- Form validation with React Hook Form
- Real-time validation feedback
- Success/error message display
- Spam protection
- Accessible form design
- Loading states during submission

## 🏗️ Layout Components

### Header

Main navigation header with responsive menu.

**Location:** `components/layout/Header.tsx`

**Props:**

```typescript
interface HeaderProps {
  className?: string;
}
```

**Usage:**

```tsx
import { Header } from "@/components/layout/Header";

<Header />;
```

**Features:**

- Responsive navigation menu
- Mobile hamburger menu
- Smooth scroll navigation
- Active section highlighting
- Theme toggle integration
- Sticky positioning

---

### Footer

Site footer with links and copyright information.

**Location:** `components/layout/Footer.tsx`

**Props:**

```typescript
interface FooterProps {
  personalData: PersonalData;
}
```

**Usage:**

```tsx
import { Footer } from "@/components/layout/Footer";

<Footer personalData={personalData} />;
```

**Features:**

- Social media links
- Contact information
- Copyright notice
- Quick navigation links
- Responsive layout

## 🔧 Provider Components

### ThemeProvider

Provides theme context throughout the application.

**Location:** `components/providers/ThemeProvider.tsx`

**Props:**

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
}
```

**Usage:**

```tsx
import { ThemeProvider } from "@/components/providers/ThemeProvider";

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <App />
</ThemeProvider>;
```

**Features:**

- System theme detection
- Theme persistence
- Smooth theme transitions
- FOUC (Flash of Unstyled Content) prevention

## 🐛 Debug Components

### ComponentDebugger

Development component for debugging component props and state.

**Location:** `components/debug/ComponentDebugger.tsx`

**Props:**

```typescript
interface ComponentDebuggerProps {
  data: any;
  label?: string;
  enabled?: boolean;
}
```

**Usage:**

```tsx
import { ComponentDebugger } from "@/components/debug/ComponentDebugger";

<ComponentDebugger
  data={componentState}
  label="Component State"
  enabled={process.env.NODE_ENV === "development"}
/>;
```

**Features:**

- JSON data visualization
- Collapsible sections
- Development-only rendering
- Syntax highlighting

## 🎨 Styling Guidelines

### Tailwind CSS Classes

All components use Tailwind CSS for styling with consistent patterns:

```tsx
// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Dark mode support
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

// Interactive states
<button className="hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">

// Animations
<div className="transition-all duration-300 ease-in-out">
```

### CSS Custom Properties

Some components use CSS custom properties for dynamic styling:

```css
/* In globals.css */
:root {
  --primary-color: theme("colors.blue.600");
  --secondary-color: theme("colors.gray.600");
}

.dark {
  --primary-color: theme("colors.blue.400");
  --secondary-color: theme("colors.gray.300");
}
```

## ♿ Accessibility Features

All components follow WCAG 2.1 guidelines:

### Keyboard Navigation

- Tab order management
- Focus indicators
- Keyboard shortcuts

### Screen Reader Support

- Semantic HTML elements
- ARIA labels and descriptions
- Proper heading hierarchy

### Color and Contrast

- Sufficient color contrast ratios
- Color-blind friendly palettes
- Focus indicators

### Example Accessibility Implementation:

```tsx
<button
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
  aria-label="Toggle dark mode"
  onClick={toggleTheme}
>
  <span className="sr-only">
    {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
  </span>
  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
</button>
```

## 🧪 Testing Components

### Unit Testing Example

```tsx
// components/ui/__tests__/ThemeToggle.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "../ThemeToggle";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider attribute="class">{component}</ThemeProvider>);
};

describe("ThemeToggle", () => {
  it("renders theme toggle button", () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("toggles theme when clicked", () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    // Assert theme change
  });
});
```

### Property-Based Testing Example

```tsx
// components/sections/__tests__/ProjectCard.property.test.tsx
import fc from "fast-check";
import { render } from "@testing-library/react";
import { ProjectCard } from "../ProjectCard";

describe("ProjectCard Properties", () => {
  it("should render with any valid project data", () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          title: fc.string({ minLength: 1 }),
          description: fc.string({ minLength: 1 }),
          technologies: fc.array(fc.string(), { minLength: 1 }),
          featured: fc.boolean(),
        }),
        (project) => {
          expect(() => render(<ProjectCard project={project} />)).not.toThrow();
        },
      ),
    );
  });
});
```

## 📱 Responsive Design

All components are designed mobile-first with responsive breakpoints:

```tsx
// Responsive grid example
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// Responsive text sizing
<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">

// Responsive spacing
<div className="p-4 sm:p-6 lg:p-8">

// Responsive visibility
<div className="hidden sm:block lg:hidden xl:block">
```

### Breakpoints

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

## 🔄 State Management

Components use various state management approaches:

### Local State (useState)

```tsx
const [isOpen, setIsOpen] = useState(false);
const [loading, setLoading] = useState(false);
```

### Form State (React Hook Form)

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
```

### Theme State (next-themes)

```tsx
const { theme, setTheme } = useTheme();
```

### Custom Hooks

```tsx
const { isMobile, isTablet, isDesktop } = useResponsive();
```

## 🚀 Performance Optimization

### Image Optimization

```tsx
import Image from "next/image";

<Image
  src="/projects/project-image.jpg"
  alt="Project screenshot"
  width={600}
  height={400}
  className="rounded-lg"
  priority={featured} // For above-the-fold images
/>;
```

### Lazy Loading

```tsx
import dynamic from "next/dynamic";

const ProjectModal = dynamic(() => import("./ProjectModal"), {
  loading: () => <div>Loading...</div>,
});
```

### Memoization

```tsx
import { memo, useMemo } from 'react';

const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const formattedDate = useMemo(() =>
    new Date(project.completedDate).toLocaleDateString(),
    [project.completedDate]
  );

  return (
    // Component JSX
  );
});
```

---

For more detailed implementation examples, refer to the individual component files in the `components/` directory.
