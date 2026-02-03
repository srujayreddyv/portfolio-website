/**
 * Property-Based Tests for Responsive Layout Adaptation
 * Feature: portfolio-website, Property 6: Responsive layout adaptation
 * **Validates: Requirements 6.1**
 */

import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import Hero from '../Hero';
import About from '../About';
import Skills from '../Skills';
import ProjectGallery from '../ProjectGallery';
import Contact from '../Contact';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { propertyTestConfig } from '../../../lib/property-test-utils';

// Mock Next.js Image component for testing
jest.mock('next/image', () => {
  return function MockImage({ src, alt, fill, className, priority, sizes, ...props }: any) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        data-fill={fill}
        data-priority={priority}
        data-sizes={sizes}
        {...props}
      />
    );
  };
});

// Mock content data
jest.mock('../../../content/data/personal', () => ({
  personalData: {
    name: 'John Doe',
    title: 'Software Developer',
    bio: 'A passionate developer creating amazing web experiences.',
    email: 'john@example.com',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/johndoe' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' }
    ]
  }
}));

jest.mock('../../../content/data/skills', () => ({
  skillCategories: [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 'Advanced' },
        { name: 'TypeScript', level: 'Intermediate' }
      ]
    }
  ]
}));

jest.mock('../../../lib/content', () => ({
  getAllProjects: () => [
    {
      id: '1',
      title: 'Test Project',
      description: 'A test project',
      technologies: ['React', 'TypeScript'],
      category: 'Web',
      imageUrl: '/test.jpg',
      featured: true,
      completedDate: '2024-01-01'
    }
  ]
}));

// Generator for viewport dimensions
const viewportGenerator = fc.record({
  width: fc.integer({ min: 320, max: 1920 }),
  height: fc.integer({ min: 568, max: 1080 }),
  devicePixelRatio: fc.constantFrom(1, 1.5, 2, 3)
});

// Generator for breakpoint categories
const breakpointGenerator = fc.constantFrom(
  { name: 'mobile', width: 375, height: 667 },
  { name: 'mobile-large', width: 414, height: 896 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'tablet-large', width: 1024, height: 1366 },
  { name: 'desktop', width: 1280, height: 720 },
  { name: 'desktop-large', width: 1920, height: 1080 }
);

describe('Responsive Layout Adaptation Property Tests', () => {
  // Mock window resize for testing
  const mockResize = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
    
    // Trigger resize event
    window.dispatchEvent(new Event('resize'));
  };

  describe('Property 6: Responsive layout adaptation', () => {
    test('For any screen size within the supported range, the layout should adapt appropriately and maintain usability', () => {
      const property = fc.property(
        viewportGenerator,
        (viewport) => {
          try {
            // Set viewport dimensions
            mockResize(viewport.width, viewport.height);
            
            // Test each major component for responsive behavior
            const components = [
              { name: 'Hero', component: Hero },
              { name: 'About', component: About },
              { name: 'Skills', component: Skills },
              { name: 'Contact', component: Contact },
              { name: 'Header', component: Header },
              { name: 'Footer', component: Footer }
            ];
            
            for (const { name, component: Component } of components) {
              const { container } = render(<Component />);
              
              // Verify component renders without errors
              expect(container).toBeTruthy();
              
              // Check for responsive container classes
              const containers = container.querySelectorAll('[class*="container"], [class*="mx-auto"]');
              expect(containers.length).toBeGreaterThan(0);
              
              // Verify responsive padding/margin classes are present
              const responsiveElements = container.querySelectorAll('[class*="px-"], [class*="py-"], [class*="sm:"], [class*="md:"], [class*="lg:"]');
              expect(responsiveElements.length).toBeGreaterThan(0);
              
              // Check for proper grid/flex layouts that adapt to screen size
              const layoutElements = container.querySelectorAll('[class*="grid"], [class*="flex"]');
              if (layoutElements.length > 0) {
                layoutElements.forEach((element) => {
                  const className = element.getAttribute('class') || '';
                  
                  // Should have responsive grid/flex classes
                  const hasResponsiveLayout = 
                    className.includes('grid-cols-1') ||
                    className.includes('sm:grid-cols-') ||
                    className.includes('md:grid-cols-') ||
                    className.includes('lg:grid-cols-') ||
                    className.includes('flex-col') ||
                    className.includes('sm:flex-row') ||
                    className.includes('md:flex-row');
                  
                  expect(hasResponsiveLayout).toBe(true);
                });
              }
              
              // Verify text scaling for different screen sizes
              const textElements = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
              if (textElements.length > 0) {
                textElements.forEach((element) => {
                  const className = element.getAttribute('class') || '';
                  
                  // Should have responsive text sizing
                  const hasResponsiveText = 
                    className.includes('text-') &&
                    (className.includes('sm:text-') || 
                     className.includes('md:text-') || 
                     className.includes('lg:text-') ||
                     className.includes('xl:text-'));
                  
                  // At least some text elements should be responsive
                  if (element.tagName.toLowerCase().match(/h[1-6]/)) {
                    expect(hasResponsiveText).toBe(true);
                  }
                });
              }
              
              // Check for touch-friendly elements on mobile
              if (viewport.width <= 768) {
                const interactiveElements = container.querySelectorAll('button, a[role="button"], input, textarea');
                interactiveElements.forEach((element) => {
                  const className = element.getAttribute('class') || '';
                  const style = window.getComputedStyle(element);
                  
                  // Should have minimum touch target size (44px) or appropriate classes
                  const hasMinHeight = 
                    className.includes('min-h-[44px]') ||
                    className.includes('min-h-[48px]') ||
                    className.includes('py-3') ||
                    className.includes('py-4') ||
                    parseInt(style.minHeight) >= 44;
                  
                  expect(hasMinHeight).toBe(true);
                });
              }
            }
            
            return true;
          } catch (error) {
            console.error(`Responsive layout test failed for viewport ${viewport.width}x${viewport.height}:`, error);
            return false;
          }
        }
      );
      
      fc.assert(property, propertyTestConfig);
    });
    
    test('Layout maintains proper spacing and proportions across breakpoints', () => {
      const property = fc.property(
        breakpointGenerator,
        (breakpoint) => {
          try {
            // Set specific breakpoint dimensions
            mockResize(breakpoint.width, breakpoint.height);
            
            // Test ProjectGallery component as it has complex responsive layout
            const { container } = render(<ProjectGallery projects={[]} />);
            
            // Verify section padding adapts to breakpoint
            const section = container.querySelector('section');
            expect(section).toBeTruthy();
            
            if (section) {
              const className = section.getAttribute('class') || '';
              
              // Should have responsive padding
              const hasResponsivePadding = 
                className.includes('py-16') ||
                className.includes('sm:py-20') ||
                className.includes('lg:py-24');
              
              expect(hasResponsivePadding).toBe(true);
            }
            
            // Verify container has proper responsive padding
            const containers = container.querySelectorAll('[class*="container"]');
            containers.forEach((containerEl) => {
              const className = containerEl.getAttribute('class') || '';
              
              // Should have responsive horizontal padding
              const hasResponsivePadding = 
                className.includes('px-4') &&
                (className.includes('sm:px-6') || className.includes('lg:px-8'));
              
              expect(hasResponsivePadding).toBe(true);
            });
            
            // Verify grid layouts adapt properly
            const gridElements = container.querySelectorAll('[class*="grid"]');
            gridElements.forEach((gridEl) => {
              const className = gridEl.getAttribute('class') || '';
              
              // Should start with single column and expand
              const hasResponsiveGrid = 
                className.includes('grid-cols-1') &&
                (className.includes('sm:grid-cols-') || 
                 className.includes('md:grid-cols-') || 
                 className.includes('lg:grid-cols-'));
              
              expect(hasResponsiveGrid).toBe(true);
            });
            
            return true;
          } catch (error) {
            console.error(`Breakpoint layout test failed for ${breakpoint.name}:`, error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 50 });
    });
    
    test('Navigation remains usable across all screen sizes', () => {
      const property = fc.property(
        viewportGenerator,
        (viewport) => {
          try {
            // Set viewport dimensions
            mockResize(viewport.width, viewport.height);
            
            // Test Header component navigation
            const { container } = render(<Header />);
            
            // Verify header is present
            const header = container.querySelector('header');
            expect(header).toBeTruthy();
            
            if (viewport.width < 768) {
              // Mobile: should have hamburger menu
              const mobileMenuButton = container.querySelector('button[aria-label*="menu"], button[aria-expanded]');
              expect(mobileMenuButton).toBeTruthy();
              
              // Should have proper touch target size
              if (mobileMenuButton) {
                const className = mobileMenuButton.getAttribute('class') || '';
                const hasMinTouchTarget = 
                  className.includes('min-h-[44px]') ||
                  className.includes('min-w-[44px]') ||
                  className.includes('p-2');
                
                expect(hasMinTouchTarget).toBe(true);
              }
              
              // Desktop navigation should be hidden
              const desktopNav = container.querySelector('.hidden.md\\:block, [class*="hidden md:block"]');
              expect(desktopNav).toBeTruthy();
              
            } else {
              // Desktop: should have visible navigation
              const desktopNav = container.querySelector('[class*="hidden md:block"], [class*="md:block"]');
              expect(desktopNav).toBeTruthy();
              
              // Navigation links should be present
              const navLinks = container.querySelectorAll('a[href^="#"]');
              expect(navLinks.length).toBeGreaterThan(0);
              
              // Links should have proper spacing and sizing
              navLinks.forEach((link) => {
                const className = link.getAttribute('class') || '';
                const hasProperSpacing = 
                  className.includes('px-') && 
                  className.includes('py-');
                
                expect(hasProperSpacing).toBe(true);
              });
            }
            
            return true;
          } catch (error) {
            console.error(`Navigation usability test failed for viewport ${viewport.width}x${viewport.height}:`, error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 75 });
    });
    
    test('Content readability is maintained across all screen sizes', () => {
      const property = fc.property(
        viewportGenerator,
        (viewport) => {
          try {
            // Set viewport dimensions
            mockResize(viewport.width, viewport.height);
            
            // Test Hero component for text readability
            const { container } = render(<Hero />);
            
            // Find main heading
            const mainHeading = container.querySelector('h1');
            expect(mainHeading).toBeTruthy();
            
            if (mainHeading) {
              const className = mainHeading.getAttribute('class') || '';
              
              // Should have responsive text sizing
              const hasResponsiveText = 
                className.includes('text-') &&
                (className.includes('sm:text-') || 
                 className.includes('md:text-') || 
                 className.includes('lg:text-') ||
                 className.includes('xl:text-'));
              
              expect(hasResponsiveText).toBe(true);
              
              // Should have proper line height for readability
              const hasLineHeight = 
                className.includes('leading-') ||
                className.includes('leading-tight') ||
                className.includes('leading-relaxed');
              
              expect(hasLineHeight).toBe(true);
            }
            
            // Check paragraph text
            const paragraphs = container.querySelectorAll('p');
            paragraphs.forEach((p) => {
              const className = p.getAttribute('class') || '';
              
              // Should have readable text size
              const hasReadableSize = 
                className.includes('text-base') ||
                className.includes('text-sm') ||
                className.includes('text-lg') ||
                className.includes('sm:text-') ||
                className.includes('md:text-') ||
                className.includes('lg:text-');
              
              expect(hasReadableSize).toBe(true);
              
              // Should have proper line height
              const hasLineHeight = 
                className.includes('leading-relaxed') ||
                className.includes('leading-normal') ||
                className.includes('leading-');
              
              expect(hasLineHeight).toBe(true);
            });
            
            // Verify proper spacing for mobile readability
            if (viewport.width <= 640) {
              const contentContainers = container.querySelectorAll('[class*="px-"], [class*="mx-auto"]');
              contentContainers.forEach((containerEl) => {
                const className = containerEl.getAttribute('class') || '';
                
                // Should have adequate mobile padding
                const hasMobilePadding = 
                  className.includes('px-4') ||
                  className.includes('px-6') ||
                  className.includes('sm:px-');
                
                expect(hasMobilePadding).toBe(true);
              });
            }
            
            return true;
          } catch (error) {
            console.error(`Content readability test failed for viewport ${viewport.width}x${viewport.height}:`, error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 60 });
    });
  });
});