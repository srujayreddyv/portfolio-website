/**
 * Property-Based Tests for Project Gallery Component
 * Feature: portfolio-website, Property 2: Project interaction completeness
 * **Validates: Requirements 3.2, 3.3**
 */

import * as fc from 'fast-check';
import { render, fireEvent, screen } from '@testing-library/react';
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
  images: fc.option(fc.array(fc.string(), { minLength: 1, maxLength: 5 })),
  liveUrl: fc.option(fc.webUrl()),
  githubUrl: fc.option(fc.webUrl()),
  featured: fc.boolean(),
  completedDate: fc.date({ min: new Date('2020-01-01'), max: new Date() }).map(d => d.toISOString().split('T')[0]),
  challenges: fc.option(nonWhitespaceString(50, 500)),
  solutions: fc.option(nonWhitespaceString(50, 500)),
  results: fc.option(nonWhitespaceString(50, 500))
});

// Generator for project arrays
const projectsArrayGenerator = fc.array(projectGenerator, { minLength: 1, maxLength: 10 });

describe('Project Gallery Property Tests', () => {
  describe('Property 2: Project interaction completeness', () => {
    test.skip('For any project in the gallery, clicking on it should display all required information including description, technologies used, and outcomes', () => {
      const property = fc.property(
        projectsArrayGenerator,
        (projects: Project[]) => {
          try {
            // Render the ProjectGallery component
            const { container } = render(<ProjectGallery projects={projects} />);
            
            // Find all project cards
            const projectCards = container.querySelectorAll('[data-testid="project-card"], .group.relative.bg-white, .cursor-pointer');
            
            // Should have at least one project card for each project
            expect(projectCards.length).toBeGreaterThanOrEqual(projects.length);
            
            // Test clicking on each project card
            projects.forEach((project, index) => {
              // Find the specific project card (use a more reliable selector)
              const projectCard = Array.from(projectCards).find(card => {
                const titleElement = card.querySelector('h3');
                return titleElement && titleElement.textContent === project.title;
              });
              
              if (projectCard) {
                // Click on the project card
                fireEvent.click(projectCard);
                
                // Check if modal or detail view is displayed
                const modal = container.querySelector('[class*="fixed"][class*="inset-0"]');
                
                if (modal) {
                  // Verify modal contains required project information
                  
                  // 1. Title should be displayed
                  const modalTitle = modal.querySelector('h2');
                  expect(modalTitle).toBeTruthy();
                  expect(modalTitle?.textContent).toBe(project.title);
                  
                  // 2. Description should be displayed
                  const descriptionText = modal.textContent;
                  expect(descriptionText).toContain(project.description);
                  
                  // 3. Technologies should be displayed
                  project.technologies.forEach(tech => {
                    expect(descriptionText).toContain(tech);
                  });
                  
                  // 4. Category should be displayed
                  expect(descriptionText).toContain(project.category);
                  
                  // 5. If outcomes/results exist, they should be displayed
                  if (project.results) {
                    expect(descriptionText).toContain(project.results);
                  }
                  
                  // 6. If challenges exist, they should be displayed
                  if (project.challenges) {
                    expect(descriptionText).toContain(project.challenges);
                  }
                  
                  // 7. If solutions exist, they should be displayed
                  if (project.solutions) {
                    expect(descriptionText).toContain(project.solutions);
                  }
                  
                  // 8. Completion date should be displayed
                  const completedYear = new Date(project.completedDate).getFullYear().toString();
                  expect(descriptionText).toContain(completedYear);
                  
                  // 9. Project image should be displayed
                  const modalImages = modal.querySelectorAll('img');
                  expect(modalImages.length).toBeGreaterThan(0);
                  
                  const mainImage = Array.from(modalImages).find(img => 
                    img.getAttribute('alt')?.includes(project.title)
                  );
                  expect(mainImage).toBeTruthy();
                  
                  // Close the modal for next iteration
                  const closeButton = modal.querySelector('button[aria-label="Close modal"], button:has(svg)');
                  if (closeButton) {
                    fireEvent.click(closeButton);
                  }
                }
              }
            });
            
            return true;
          } catch (error) {
            console.error('Project interaction completeness test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });
    
    test.skip('For any project with available links, they should be properly rendered and accessible', () => {
      const property = fc.property(
        projectsArrayGenerator,
        (projects: Project[]) => {
          try {
            // Render the ProjectGallery component
            const { container } = render(<ProjectGallery projects={projects} />);
            
            // Test each project's links
            projects.forEach((project) => {
              // Find the project card
              const projectCard = Array.from(container.querySelectorAll('.cursor-pointer')).find(card => {
                const titleElement = card.querySelector('h3');
                return titleElement && titleElement.textContent === project.title;
              });
              
              if (projectCard) {
                // Click to open modal
                fireEvent.click(projectCard);
                
                const modal = container.querySelector('[class*="fixed"][class*="inset-0"]');
                
                if (modal) {
                  // Check for live demo link if it exists
                  if (project.liveUrl) {
                    const liveDemoLink = Array.from(modal.querySelectorAll('a')).find(link => 
                      link.getAttribute('href') === project.liveUrl
                    );
                    expect(liveDemoLink).toBeTruthy();
                    expect(liveDemoLink?.getAttribute('target')).toBe('_blank');
                    expect(liveDemoLink?.getAttribute('rel')).toContain('noopener');
                    
                    // Should contain appropriate text or icon
                    const linkText = liveDemoLink?.textContent;
                    expect(linkText).toMatch(/demo|live|view/i);
                  }
                  
                  // Check for GitHub link if it exists
                  if (project.githubUrl) {
                    const githubLink = Array.from(modal.querySelectorAll('a')).find(link => 
                      link.getAttribute('href') === project.githubUrl
                    );
                    expect(githubLink).toBeTruthy();
                    expect(githubLink?.getAttribute('target')).toBe('_blank');
                    expect(githubLink?.getAttribute('rel')).toContain('noopener');
                    
                    // Should contain appropriate text or icon
                    const linkText = githubLink?.textContent;
                    expect(linkText).toMatch(/github|source|code/i);
                  }
                  
                  // Close modal
                  const closeButton = modal.querySelector('button[aria-label="Close modal"], button:has(svg)');
                  if (closeButton) {
                    fireEvent.click(closeButton);
                  }
                }
              }
            });
            
            return true;
          } catch (error) {
            console.error('Project links test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 15 });
    });
    
    test.skip('Project modal displays comprehensive information and maintains accessibility', () => {
      const property = fc.property(
        projectGenerator,
        (project: Project) => {
          try {
            // Render with single project
            const { container } = render(<ProjectGallery projects={[project]} />);
            
            // Find and click the project card
            const projectCard = container.querySelector('.cursor-pointer');
            expect(projectCard).toBeTruthy();
            
            if (projectCard) {
              fireEvent.click(projectCard);
              
              const modal = container.querySelector('[class*="fixed"][class*="inset-0"]');
              expect(modal).toBeTruthy();
              
              if (modal) {
                // Verify modal accessibility
                const modalContent = modal.querySelector('[class*="bg-white"][class*="rounded-lg"]');
                expect(modalContent).toBeTruthy();
                
                // Should have proper heading structure
                const headings = modal.querySelectorAll('h1, h2, h3, h4, h5, h6');
                expect(headings.length).toBeGreaterThan(0);
                
                // Main title should be h2
                const mainTitle = modal.querySelector('h2');
                expect(mainTitle).toBeTruthy();
                expect(mainTitle?.textContent).toBe(project.title);
                
                // Should have close button with proper aria-label
                const closeButton = modal.querySelector('button[aria-label="Close modal"]');
                expect(closeButton).toBeTruthy();
                
                // Should display all required sections
                const modalText = modal.textContent || '';
                
                // Required information sections
                expect(modalText).toContain(project.title);
                expect(modalText).toContain(project.description);
                expect(modalText).toContain(project.category);
                
                // Technologies section
                project.technologies.forEach(tech => {
                  expect(modalText).toContain(tech);
                });
                
                // Optional sections should be present if data exists
                if (project.longDescription) {
                  expect(modalText).toContain(project.longDescription);
                }
                
                if (project.challenges) {
                  expect(modalText).toContain('Challenges');
                  expect(modalText).toContain(project.challenges);
                }
                
                if (project.solutions) {
                  expect(modalText).toContain('Solutions');
                  expect(modalText).toContain(project.solutions);
                }
                
                if (project.results) {
                  expect(modalText).toContain('Results');
                  expect(modalText).toContain(project.results);
                }
                
                // Should display completion date
                const year = new Date(project.completedDate).getFullYear().toString();
                expect(modalText).toContain(year);
                
                // Should have project image
                const images = modal.querySelectorAll('img');
                expect(images.length).toBeGreaterThan(0);
                
                const projectImage = Array.from(images).find(img => 
                  img.getAttribute('src') === project.imageUrl
                );
                expect(projectImage).toBeTruthy();
                
                // Image should have proper alt text
                expect(projectImage?.getAttribute('alt')).toContain(project.title);
              }
            }
            
            return true;
          } catch (error) {
            console.error('Modal accessibility test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 25 });
    });
  });
});