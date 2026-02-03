# API Documentation

This document describes the API endpoints and services used in the portfolio website.

## 📧 Contact API

### POST /api/contact

Handles contact form submissions with email delivery via SendGrid or Formspree fallback.

#### Request

**Endpoint:** `POST /api/contact`

**Headers:**

```http
Content-Type: application/json
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in discussing a potential project..."
}
```

#### Request Schema

| Field     | Type   | Required | Validation                         |
| --------- | ------ | -------- | ---------------------------------- |
| `name`    | string | Yes      | 2-100 characters, no special chars |
| `email`   | string | Yes      | Valid email format                 |
| `subject` | string | Yes      | 5-200 characters                   |
| `message` | string | Yes      | 10-2000 characters                 |

#### Response

**Success (200):**

```json
{
  "success": true,
  "message": "Message sent successfully!",
  "service": "sendgrid"
}
```

**Validation Error (400):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Please enter a valid email address",
    "message": "Message must be at least 10 characters long"
  }
}
```

**Server Error (500):**

```json
{
  "success": false,
  "message": "Failed to send message. Please try again later.",
  "error": "Internal server error"
}
```

#### Implementation Details

**Email Services:**

1. **Primary**: SendGrid (if configured)
2. **Fallback**: Formspree (if SendGrid fails)

**Security Features:**

- Input validation and sanitization
- Rate limiting (10 requests per minute per IP)
- Spam protection with basic content filtering
- CORS protection

**Environment Variables:**

```bash
# SendGrid Configuration
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Contact Configuration
CONTACT_EMAIL=your.email@example.com

# Formspree Fallback
FORMSPREE_FORM_ID=your_form_id_here
```

#### Example Usage

**JavaScript/TypeScript:**

```typescript
const submitContactForm = async (formData: ContactFormData) => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Message sent successfully!");
    } else {
      console.error("Failed to send message:", result.message);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
```

**React Hook Form Integration:**

```typescript
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    // Handle response...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: 'Name is required' })}
        placeholder="Your Name"
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email'
          }
        })}
        placeholder="Your Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      {/* Other fields... */}

      <button type="submit">Send Message</button>
    </form>
  );
}
```

## 🔧 Utility APIs

### Content Management

The portfolio uses a file-based content management system with TypeScript and MDX files.

#### Personal Data API

**Location:** `content/data/personal.ts`

```typescript
export interface PersonalData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: SocialLink[];
  resumeUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

#### Skills Data API

**Location:** `content/data/skills.ts`

```typescript
export interface SkillsData {
  [category: string]: string[];
}

// Example:
export const skillsData: SkillsData = {
  "Programming Languages": ["TypeScript", "Python", "Java"],
  Frontend: ["React", "Next.js", "Tailwind CSS"],
  Backend: ["Node.js", "Express", "PostgreSQL"],
};
```

#### Projects Data API

**Location:** `content/projects/*.mdx`

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  imageUrl: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedDate: string;
  challenges?: string;
  solutions?: string;
  results?: string;
}
```

**MDX Frontmatter Example:**

```markdown
---
title: "E-Commerce Platform"
description: "Full-stack e-commerce solution with React and Node.js"
technologies: ["React", "Node.js", "PostgreSQL", "Stripe"]
category: "Full Stack"
featured: true
completedDate: "2024-01-15"
liveUrl: "https://example-store.com"
githubUrl: "https://github.com/username/ecommerce-platform"
---

Detailed project description in Markdown format...
```

### Content Loading Functions

```typescript
// lib/content.ts
export async function getAllProjects(): Promise<Project[]> {
  // Load and parse all project MDX files
}

export async function getProjectById(id: string): Promise<Project | null> {
  // Load specific project by ID
}

export async function getFeaturedProjects(): Promise<Project[]> {
  // Get only featured projects
}

export function getPersonalData(): PersonalData {
  // Load personal data
}

export function getSkillsData(): SkillsData {
  // Load skills data
}
```

## 🔍 SEO APIs

### Sitemap Generation

**Endpoint:** `/sitemap.xml`

Automatically generated sitemap including:

- Homepage
- Individual project pages (if implemented)
- Static pages

**Example Output:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com</loc>
    <lastmod>2024-01-15T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/projects/ecommerce-platform</loc>
    <lastmod>2024-01-15T00:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Robots.txt

**Endpoint:** `/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### Structured Data

The website includes JSON-LD structured data for better SEO:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "jobTitle": "Software Developer",
  "url": "https://yourdomain.com",
  "sameAs": [
    "https://linkedin.com/in/yourprofile",
    "https://github.com/yourusername"
  ],
  "knowsAbout": ["JavaScript", "React", "Node.js"],
  "alumniOf": "Your University"
}
```

## 🛡️ Security

### Rate Limiting

Contact form submissions are rate-limited:

- **Limit**: 10 requests per minute per IP address
- **Implementation**: In-memory store (production should use Redis)
- **Response**: 429 Too Many Requests

### Input Validation

All API inputs are validated using:

- **Zod**: Schema validation
- **Sanitization**: HTML and script tag removal
- **Length Limits**: Prevent oversized payloads

### CORS Configuration

```typescript
// API routes include CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.NODE_ENV === "production"
      ? "https://yourdomain.com"
      : "http://localhost:3000",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
```

## 📊 Analytics Integration

### Vercel Analytics

```typescript
// Automatically included in layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Custom Event Tracking

```typescript
// Track contact form submissions
import { track } from "@vercel/analytics";

const handleFormSubmit = async (data: ContactFormData) => {
  // Submit form...

  // Track successful submission
  track("contact_form_submit", {
    subject: data.subject,
    success: true,
  });
};
```

## 🧪 Testing APIs

### API Testing

```typescript
// __tests__/api/contact.test.ts
import { POST } from "@/app/api/contact/route";

describe("/api/contact", () => {
  it("should send email successfully", async () => {
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        subject: "Test Subject",
        message: "Test message content",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it("should validate required fields", async () => {
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "",
        email: "invalid-email",
        subject: "",
        message: "",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
  });
});
```

## 🔧 Environment Configuration

### Required Environment Variables

```bash
# Email Service (Choose one)
SENDGRID_API_KEY=SG.your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# OR Formspree
FORMSPREE_FORM_ID=your_formspree_form_id

# Contact Configuration
CONTACT_EMAIL=your.email@example.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional Environment Variables

```bash
# Alternative Email Services
RESEND_API_KEY=your_resend_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1

# Analytics
VERCEL_ANALYTICS_ID=your_analytics_id
```

## 📚 Error Handling

### Error Response Format

All API errors follow a consistent format:

```typescript
interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string>;
  code?: string;
}
```

### Common Error Codes

- **`VALIDATION_ERROR`**: Input validation failed
- **`RATE_LIMIT_EXCEEDED`**: Too many requests
- **`EMAIL_SERVICE_ERROR`**: Email delivery failed
- **`INTERNAL_ERROR`**: Server error

### Error Handling Best Practices

```typescript
// Client-side error handling
const handleApiError = (error: ApiError) => {
  switch (error.code) {
    case "VALIDATION_ERROR":
      // Show field-specific errors
      break;
    case "RATE_LIMIT_EXCEEDED":
      // Show rate limit message
      break;
    default:
      // Show generic error message
      break;
  }
};
```

---

For more information about the API implementation, see the source code in `src/app/api/` directory.
