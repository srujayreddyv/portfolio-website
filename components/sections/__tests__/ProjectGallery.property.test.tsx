/**
 * Property-Based Tests for Project Gallery Component
 * Feature: portfolio-website, Property 2: Project interaction completeness
 * **Validates: Requirements 3.2, 3.3**
 */

import * as fc from 'fast-check';
import { cleanup, render, fireEvent, screen, within } from '@testing-library/react';
import ProjectGallery from '../ProjectGallery';
import { Project } from '@/types';
import { propertyTestConfig } from '@/lib/property-test-utils';

// Mock Next.js Image component for testing
jest.mock('next/image', () => {
  return function MockImage({ src, alt, fill, className, sizes, ...props }: any) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        data-fill={fill}
        data-sizes={sizes}
        {...props}
      />
    );
  };
});

// Mock Next.js Link component for testing
jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Helper function to generate valid non-whitespace strings
const nonWhitespaceString = (minLength: number, maxLength: number) =>
  fc.string({ minLength: minLength + 2, maxLength: maxLength + 10 })
    .filter(s => {
      const trimmed = s.trim();
      return trimmed.length >= minLength && /\S/.test(trimmed) && !/^\s*$/.test(s);
    })
    .map(s => {
      const trimmed = s.trim();
      // Ensure we have at least the minimum length of non-whitespace characters
      if (trimmed.length < minLength) {
        return 'Project '.repeat(Math.ceil(minLength / 8)).substring(0, minLength);
      }
      return trimmed;
    });

// Generator for valid project data
const projectGenerator = fc.record({
  id: nonWhitespaceString(1, 50),
  title: nonWhitespaceString(5, 100),
  description: nonWhitespaceString(20, 300),
  longDescription: fc.option(nonWhitespaceString(50, 1000)),
  technologies: fc.array(fc.constantFrom(
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 
    'Python', 'Java', 'CSS', 'HTML', 'Tailwind CSS'
  ), { minLength: 1, maxLength: 8 }),
  category: fc.constantFrom('Web Application', 'Mobile App', 'API', 'Tool', 'Library'),
  imageUrl: fc.constantFrom('/projects/project1.jpg', '/projects/project2.png', '/projects/project3.webp'),
  images: fc.option(fc.array(fc.constantFrom(
    '/projects/project1.jpg',
    '/projects/project2.png',
    '/projects/project3.webp'
  ), { minLength: 1, maxLength: 5 })),
  liveUrl: fc.option(fc.webUrl()),
  githubUrl: fc.option(fc.webUrl()),
  featured: fc.boolean(),
  completedDate: fc
    .integer({
      min: new Date('2020-01-01').getTime(),
      max: new Date().getTime()
    })
    .map((timestamp) => new Date(timestamp).toISOString().split('T')[0]),
  challenges: fc.option(nonWhitespaceString(50, 500)),
  solutions: fc.option(nonWhitespaceString(50, 500)),
  results: fc.option(nonWhitespaceString(50, 500))
});

// Generator for project arrays
const projectsArrayGenerator = fc.uniqueArray(projectGenerator, {
  selector: (project) => project.id,
  minLength: 1,
  maxLength: 10
});
const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();
const sortProjectsLikeGallery = (projects: Project[]) =>
  [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
  });

describe('Project Gallery Property Tests', () => {
  describe('Property 2: Project interaction completeness', () => {
    test('For any project in the gallery, clicking on it should display project details in the modal', () => {
      const property = fc.property(
        projectsArrayGenerator,
        (projects: Project[]) => {
          try {
            render(<ProjectGallery projects={projects} />);

            // Every project should render as an interactive card
            expect(screen.getAllByRole('button', { name: /open .* details/i })).toHaveLength(projects.length);

            // Open first card and verify modal details
            const sortedProjects = sortProjectsLikeGallery(projects);
            const expectedProject = sortedProjects[0];
            const firstCard = screen.getAllByRole('button', { name: /open .* details/i })[0];
            fireEvent.click(firstCard);

            expect(screen.getByRole('dialog')).toBeInTheDocument();
            const modalTitle = within(screen.getByRole('dialog')).getByRole('heading', { level: 2 });
            expect(normalizeWhitespace(modalTitle.textContent || '')).toBe(
              normalizeWhitespace(expectedProject.title)
            );
            expect(within(screen.getByRole('dialog')).getByText(expectedProject.category)).toBeInTheDocument();

            fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            return true;
          } finally {
            cleanup();
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });
    
    test('For any project with available links, they should be properly rendered and accessible', () => {
      const property = fc.property(
        projectGenerator.filter((project) => Boolean(project.liveUrl) || Boolean(project.githubUrl)),
        (project: Project) => {
          try {
            render(<ProjectGallery projects={[project]} />);

            fireEvent.click(screen.getAllByRole('button', { name: /open .* details/i })[0]);
            expect(screen.getByRole('dialog')).toBeInTheDocument();

            if (project.liveUrl) {
              const liveDemoLink = screen.getByRole('link', { name: /^view live demo$/i });
              expect(new URL(liveDemoLink.getAttribute('href') || '').href).toBe(new URL(project.liveUrl).href);
              expect(liveDemoLink).toHaveAttribute('target', '_blank');
              expect(liveDemoLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
            }

            if (project.githubUrl) {
              const sourceCodeLink = screen.getByRole('link', { name: /^view source code$/i });
              expect(new URL(sourceCodeLink.getAttribute('href') || '').href).toBe(new URL(project.githubUrl).href);
              expect(sourceCodeLink).toHaveAttribute('target', '_blank');
              expect(sourceCodeLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
            }

            fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            return true;
          } finally {
            cleanup();
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 15 });
    });
    
    test('Project modal displays key information and accessibility controls', () => {
      const property = fc.property(
        projectGenerator,
        (project: Project) => {
          try {
            render(<ProjectGallery projects={[project]} />);

            fireEvent.click(screen.getAllByRole('button', { name: /open .* details/i })[0]);

            const modal = screen.getByRole('dialog');
            expect(modal).toBeInTheDocument();
            const modalTitle = within(modal).getByRole('heading', { level: 2 });
            expect(normalizeWhitespace(modalTitle.textContent || '')).toBe(
              normalizeWhitespace(project.title)
            );
            expect(screen.getByText('Technologies Used')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /close modal/i })).toBeInTheDocument();

            // Escape key should close modal
            fireEvent.keyDown(document, { key: 'Escape' });
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            return true;
          } finally {
            cleanup();
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 25 });
    });
  });
});
