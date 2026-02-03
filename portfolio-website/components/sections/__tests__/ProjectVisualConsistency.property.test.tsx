/**
 * Property-Based Tests for Project Visual Consistency
 * Feature: portfolio-website, Property 3: Project visual consistency
 * **Validates: Requirements 3.4, 3.5**
 */

import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import ProjectGallery from '../ProjectGallery';
import ProjectCard from '../ProjectCard';
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

// Generator for valid project data
const projectGenerator = fc.record({
  id: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length >= 1),
  title: fc.string({ minLength: 5, maxLength: 100 }).filter(s => s.trim().length >= 5),
  description: fc.string({ minLength: 20, maxLength: 300 }).filter(s => s.trim().length >= 20),
  longDescription: fc.option(fc.string({ minLength: 50, maxLength: 1000 }).filter(s => s.trim().length >= 50)),
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
  challenges: fc.option(fc.string({ minLength: 50, maxLength: 500 }).filter(s => s.trim().length >= 50)),
  solutions: fc.option(fc.string({ minLength: 50, maxLength: 500 }).filter(s => s.trim().length >= 50)),
  results: fc.option(fc.string({ minLength: 50, maxLength: 500 }).filter(s => s.trim().length >= 50))
});

// Generator for project arrays
const projectsArrayGenerator = fc.array(projectGenerator, { minLength: 1, maxLength: 10 });

describe('Project Visual Consistency Property Tests', () => {
  describe('Property 3: Project visual consistency', () => {
    test('For any project in the gallery, it should include a preview image and be organized according to its category or technology type', () => {
      const property = fc.property(
        projectsArrayGenerator,
        (projects: Project[]) => {
          try {
            // Render the ProjectGallery component
            const { container } = render(<ProjectGallery projects={projects} />);
            
            // Find all project cards
            const projectCards = container.querySelectorAll('.cursor-pointer');
            
            // Should have at least one project card for each project
            expect(projectCards.length).toBeGreaterThanOrEqual(projects.length);
            
            // Test each project for visual consistency
            projects.forEach((project) => {
              // Find the specific project card
              const projectCard = Array.from(projectCards).find(card => {
                const titleElement = card.querySelector('h3');
                return titleElement && titleElement.textContent === project.title;
              });
              
              expect(projectCard).toBeTruthy();
              
              if (projectCard) {
                // 1. Verify project has preview image
                const images = projectCard.querySelectorAll('img');
                expect(images.length).toBeGreaterThan(0);
                
                const projectImage = Array.from(images).find(img => 
                  img.getAttribute('src') === project.imageUrl
                );
                expect(projectImage).toBeTruthy();
                
                // Verify image has proper alt text
                expect(projectImage?.getAttribute('alt')).toContain(project.title);
                
                // 2. Verify project displays category information
                const categoryElements = projectCard.querySelectorAll('span');
                const categoryFound = Array.from(categoryElements).some(span => 
                  span.textContent === project.category
                );
                expect(categoryFound).toBe(true);
                
                // 3. Verify project displays technology information
                project.technologies.forEach(tech => {
                  const techFound = Array.from(categoryElements).some(span => 
                    span.textContent === tech
                  );
                  expect(techFound).toBe(true);
                });
                
                // 4. Verify consistent visual structure
                // Each project card should have title
                const titleElement = projectCard.querySelector('h3');
                expect(titleElement).toBeTruthy();
                expect(titleElement?.textContent).toBe(project.title);
                
                // Each project card should have description
                const descriptionElement = projectCard.querySelector('p');
                expect(descriptionElement).toBeTruthy();
                expect(descriptionElement?.textContent).toContain(project.description);
                
                // 5. Verify featured projects have visual distinction
                if (project.featured) {
                  const featuredBadge = projectCard.querySelector('[class*="ring-"]');
                  const featuredText = projectCard.textContent;
                  
                  // Should have either ring styling or featured badge
                  const hasFeaturedStyling = featuredBadge || featuredText?.includes('Featured');
                  expect(hasFeaturedStyling).toBe(true);
                }
                
                // 6. Verify consistent hover states and interactions
                const hasHoverClasses = projectCard.className.includes('hover:') || 
                                      projectCard.className.includes('group');
                expect(hasHoverClasses).toBe(true);
              }
            });
            
            return true;
          } catch (error) {
            console.error('Project visual consistency test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 20 });
    });
    
    test('Projects should be organized by category with consistent visual grouping', () => {
      const property = fc.property(
        projectsArrayGenerator,
        (projects: Project[]) => {
          try {
            // Render the ProjectGallery component
            const { container } = render(<ProjectGallery projects={projects} />);
            
            // Get unique categories from projects
            const categories = [...new Set(projects.map(p => p.category))];
            
            // Verify category filter options are available
            const categorySelect = container.querySelector('select');
            if (categorySelect) {
              const options = Array.from(categorySelect.querySelectorAll('option'));
              const optionTexts = options.map(opt => opt.textContent);
              
              // Should include "All" option
              expect(optionTexts).toContain('All');
              
              // Should include all project categories
              categories.forEach(category => {
                expect(optionTexts).toContain(category);
              });
            }
            
            // Verify projects maintain visual consistency within categories
            const projectCards = container.querySelectorAll('.cursor-pointer');
            
            // Group projects by category and verify visual consistency
            const projectsByCategory = new Map<string, Element[]>();
            
            projects.forEach((project) => {
              const projectCard = Array.from(projectCards).find(card => {
                const titleElement = card.querySelector('h3');
                return titleElement && titleElement.textContent === project.title;
              });
              
              if (projectCard) {
                if (!projectsByCategory.has(project.category)) {
                  projectsByCategory.set(project.category, []);
                }
                projectsByCategory.get(project.category)?.push(projectCard);
              }
            });
            
            // Verify each category group has consistent visual elements
            projectsByCategory.forEach((cards, category) => {
              cards.forEach(card => {
                // Each card should display the category
                const categorySpans = card.querySelectorAll('span');
                const hasCategoryDisplay = Array.from(categorySpans).some(span => 
                  span.textContent === category
                );
                expect(hasCategoryDisplay).toBe(true);
                
                // Each card should have consistent structure
                expect(card.querySelector('h3')).toBeTruthy(); // Title
                expect(card.querySelector('p')).toBeTruthy();  // Description
                expect(card.querySelector('img')).toBeTruthy(); // Image
                
                // Each card should have technology tags
                const techSpans = Array.from(card.querySelectorAll('span')).filter(span => 
                  span.className.includes('blue') // Technology tags typically have blue styling
                );
                expect(techSpans.length).toBeGreaterThan(0);
              });
            });
            
            return true;
          } catch (error) {
            console.error('Category organization test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 15 });
    });
    
    test('Project cards maintain consistent visual layout and styling', () => {
      const property = fc.property(
        projectGenerator,
        (project: Project) => {
          try {
            // Render individual ProjectCard component
            const { container } = render(
              <ProjectCard project={project} onClick={() => {}} />
            );
            
            const projectCard = container.firstChild as Element;
            expect(projectCard).toBeTruthy();
            
            // 1. Verify consistent card structure
            expect(projectCard.tagName.toLowerCase()).toBe('div');
            expect(projectCard.className).toContain('group');
            expect(projectCard.className).toContain('cursor-pointer');
            
            // 2. Verify image container structure
            const imageContainer = projectCard.querySelector('[class*="h-48"]');
            expect(imageContainer).toBeTruthy();
            
            const image = projectCard.querySelector('img');
            expect(image).toBeTruthy();
            expect(image?.getAttribute('src')).toBe(project.imageUrl);
            expect(image?.getAttribute('alt')).toContain(project.title);
            
            // 3. Verify content structure
            const contentContainer = projectCard.querySelector('[class*="p-6"]');
            expect(contentContainer).toBeTruthy();
            
            // Category badge
            const categoryBadge = contentContainer?.querySelector('span');
            expect(categoryBadge).toBeTruthy();
            expect(categoryBadge?.textContent).toBe(project.category);
            
            // Title
            const title = contentContainer?.querySelector('h3');
            expect(title).toBeTruthy();
            expect(title?.textContent).toBe(project.title);
            
            // Description
            const description = contentContainer?.querySelector('p');
            expect(description).toBeTruthy();
            expect(description?.textContent).toBe(project.description);
            
            // 4. Verify technology tags
            const techTags = contentContainer?.querySelectorAll('[class*="blue"]');
            expect(techTags?.length).toBe(project.technologies.length);
            
            project.technologies.forEach(tech => {
              const techTag = Array.from(techTags || []).find(tag => 
                tag.textContent === tech
              );
              expect(techTag).toBeTruthy();
            });
            
            // 5. Verify featured project styling
            if (project.featured) {
              const featuredBadge = projectCard.querySelector('[class*="ring-"]') ||
                                  projectCard.querySelector('div:contains("Featured")');
              expect(featuredBadge).toBeTruthy();
            }
            
            // 6. Verify hover overlay structure
            const overlay = projectCard.querySelector('[class*="absolute"][class*="inset-0"]');
            expect(overlay).toBeTruthy();
            
            // 7. Verify link buttons if URLs exist
            if (project.liveUrl) {
              const liveLink = projectCard.querySelector(`a[href="${project.liveUrl}"]`);
              expect(liveLink).toBeTruthy();
              expect(liveLink?.getAttribute('target')).toBe('_blank');
            }
            
            if (project.githubUrl) {
              const githubLink = projectCard.querySelector(`a[href="${project.githubUrl}"]`);
              expect(githubLink).toBeTruthy();
              expect(githubLink?.getAttribute('target')).toBe('_blank');
            }
            
            return true;
          } catch (error) {
            console.error('Project card visual consistency test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 25 });
    });
    
    test('Project gallery maintains responsive grid layout consistency', () => {
      const property = fc.property(
        projectsArrayGenerator,
        fc.record({
          width: fc.integer({ min: 320, max: 1920 }),
          height: fc.integer({ min: 568, max: 1080 })
        }),
        (projects: Project[], viewport) => {
          try {
            // Mock viewport size
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              configurable: true,
              value: viewport.width,
            });
            Object.defineProperty(window, 'innerHeight', {
              writable: true,
              configurable: true,
              value: viewport.height,
            });
            
            // Render the ProjectGallery component
            const { container } = render(<ProjectGallery projects={projects} />);
            
            // Find the projects grid container
            const gridContainer = container.querySelector('[class*="grid"]');
            expect(gridContainer).toBeTruthy();
            
            // Verify grid has responsive classes
            const gridClasses = gridContainer?.className;
            expect(gridClasses).toMatch(/grid-cols-1|md:grid-cols-2|lg:grid-cols-3/);
            
            // Verify all project cards are within the grid
            const projectCards = gridContainer?.querySelectorAll('.cursor-pointer');
            expect(projectCards?.length).toBe(projects.length);
            
            // Verify each project card maintains consistent spacing
            projectCards?.forEach(card => {
              // Should have consistent margin/padding classes
              const cardClasses = card.className;
              expect(cardClasses).toMatch(/rounded|shadow|bg-white|dark:bg-gray/);
              
              // Should have proper image aspect ratio
              const imageContainer = card.querySelector('[class*="h-48"]');
              expect(imageContainer).toBeTruthy();
              
              // Should have consistent content padding
              const contentContainer = card.querySelector('[class*="p-6"]');
              expect(contentContainer).toBeTruthy();
            });
            
            // Verify responsive behavior based on viewport
            if (viewport.width < 768) {
              // Mobile: should be single column
              expect(gridClasses).toContain('grid-cols-1');
            } else if (viewport.width < 1024) {
              // Tablet: should allow 2 columns
              expect(gridClasses).toMatch(/md:grid-cols-2/);
            } else {
              // Desktop: should allow 3 columns
              expect(gridClasses).toMatch(/lg:grid-cols-3/);
            }
            
            return true;
          } catch (error) {
            console.error('Responsive grid layout test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 15 });
    });
  });
});