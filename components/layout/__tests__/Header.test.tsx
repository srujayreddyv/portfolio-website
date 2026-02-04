/**
 * Unit tests for Header component
 * Tests navigation rendering and mobile menu functionality
 * Requirements: 1.1, 1.2, 6.5
 */

import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import Header from '../Header';
import { personalData } from '@/content/data/personal';

// Mock scrollIntoView for testing
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

// Mock getElementById to return mock elements
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true,
});

describe('Header Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
    mockGetElementById.mockClear();
    
    // Setup mock elements for each section
    const mockElement = {
      scrollIntoView: mockScrollIntoView,
      offsetTop: 100,
      offsetHeight: 500,
    };
    
    mockGetElementById.mockImplementation((id: string) => {
      if (['about', 'projects', 'skills', 'contact'].includes(id)) {
        return mockElement;
      }
      return null;
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe('Navigation Rendering', () => {
    test('renders brand/logo link', () => {
      render(<Header />);
      
      const brandLink = screen.getByRole('link', { name: personalData.name });
      expect(brandLink).toBeInTheDocument();
      expect(brandLink).toHaveAttribute('href', '#');
    });

    test('renders all navigation links in desktop menu', () => {
      render(<Header />);
      
      const expectedLinks = ['About', 'Projects', 'Skills', 'Contact'];
      
      expectedLinks.forEach(linkText => {
        const links = screen.getAllByRole('link', { name: linkText });
        // Should have both desktop and mobile versions
        expect(links.length).toBeGreaterThanOrEqual(2);
        // Check that at least one has the correct href
        const hasCorrectHref = links.some(link => 
          link.getAttribute('href') === `#${linkText.toLowerCase()}`
        );
        expect(hasCorrectHref).toBe(true);
      });
    });

    test('renders mobile menu button', () => {
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(mobileMenuButton).toBeInTheDocument();
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('mobile menu is initially hidden', () => {
      render(<Header />);
      
      // Mobile menu should have 'hidden' class initially
      const mobileMenuContainer = screen.getByRole('button', { name: /toggle navigation menu/i })
        .closest('header')
        ?.querySelector('.md\\:hidden:not(button)');
      
      // Check if it contains 'hidden' in its class list
      expect(mobileMenuContainer?.className).toContain('hidden');
    });
  });

  describe('Mobile Menu Functionality', () => {
    test('opens mobile menu when hamburger button is clicked', () => {
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      // Click to open menu
      fireEvent.click(mobileMenuButton);
      
      // The test passes if we can find the mobile navigation links
      // Since the component renders both desktop and mobile links, 
      // we should have multiple instances when menu is open
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      expect(aboutLinks.length).toBeGreaterThanOrEqual(2); // Desktop + mobile
      
      // Check that the hamburger icon changed to close icon
      const svgElements = mobileMenuButton.querySelectorAll('svg');
      expect(svgElements[0]).toHaveClass('hidden'); // hamburger hidden
      expect(svgElements[1]).toHaveClass('block');  // close icon visible
    });

    test('closes mobile menu when hamburger button is clicked again', () => {
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      // Open menu
      fireEvent.click(mobileMenuButton);
      
      // Close menu
      fireEvent.click(mobileMenuButton);
      
      // Menu should be hidden again
      const mobileMenuContainer = mobileMenuButton
        .closest('header')
        ?.querySelector('.md\\:hidden:not(button)');
      
      expect(mobileMenuContainer?.className).toContain('hidden');
      expect(mobileMenuContainer?.className).not.toContain('block');
    });

    test('displays correct hamburger/close icons based on menu state', () => {
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      // Initially should show hamburger icon (first svg should be visible)
      let svgElements = mobileMenuButton.querySelectorAll('svg');
      expect(svgElements[0]).toHaveClass('block');
      expect(svgElements[1]).toHaveClass('hidden');
      
      // After clicking, should show close icon
      fireEvent.click(mobileMenuButton);
      
      svgElements = mobileMenuButton.querySelectorAll('svg');
      expect(svgElements[0]).toHaveClass('hidden');
      expect(svgElements[1]).toHaveClass('block');
    });

    test('mobile menu contains all navigation links', () => {
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      fireEvent.click(mobileMenuButton);
      
      const expectedLinks = ['About', 'Projects', 'Skills', 'Contact'];
      
      expectedLinks.forEach(linkText => {
        const links = screen.getAllByRole('link', { name: linkText });
        // Should have both desktop and mobile versions
        expect(links.length).toBeGreaterThanOrEqual(2);
      });
    });
  });

  describe('Navigation Functionality', () => {
    test('clicking navigation link triggers smooth scroll', () => {
      render(<Header />);
      
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      const desktopAboutLink = aboutLinks.find(link => 
        !link.closest('.md\\:hidden')
      );
      
      expect(desktopAboutLink).toBeInTheDocument();
      fireEvent.click(desktopAboutLink!);
      
      expect(mockGetElementById).toHaveBeenCalledWith('about');
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    test('clicking mobile navigation link triggers smooth scroll and closes menu', () => {
      render(<Header />);
      
      // Open mobile menu
      const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      fireEvent.click(mobileMenuButton);
      
      // Click a mobile navigation link
      const mobileLinks = screen.getAllByRole('link', { name: 'Projects' });
      const mobileLink = mobileLinks.find(link => 
        link.closest('.md\\:hidden') !== null
      );
      
      expect(mobileLink).toBeInTheDocument();
      fireEvent.click(mobileLink!);
      
      // Should trigger scroll
      expect(mockGetElementById).toHaveBeenCalledWith('projects');
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Menu should be closed
      const mobileMenuContainer = mobileMenuButton
        .closest('header')
        ?.querySelector('.md\\:hidden:not(button)');
      expect(mobileMenuContainer?.className).toContain('hidden');
    });

    test('handles navigation when target element does not exist', () => {
      render(<Header />);
      
      // Mock getElementById to return null
      mockGetElementById.mockReturnValue(null);
      
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      const desktopAboutLink = aboutLinks.find(link => 
        !link.closest('.md\\:hidden')
      );
      
      expect(desktopAboutLink).toBeInTheDocument();
      fireEvent.click(desktopAboutLink!);
      
      expect(mockGetElementById).toHaveBeenCalledWith('about');
      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('mobile menu button has proper ARIA attributes', () => {
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: /toggle navigation menu/i });
      
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
      expect(mobileMenuButton).toHaveAttribute('aria-label', 'Toggle navigation menu');
    });

    test('navigation links have proper href attributes', () => {
      render(<Header />);
      
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      const projectsLinks = screen.getAllByRole('link', { name: 'Projects' });
      const skillsLinks = screen.getAllByRole('link', { name: 'Skills' });
      const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
      
      // Check that at least one of each has the correct href
      expect(aboutLinks.some(link => link.getAttribute('href') === '#about')).toBe(true);
      expect(projectsLinks.some(link => link.getAttribute('href') === '#projects')).toBe(true);
      expect(skillsLinks.some(link => link.getAttribute('href') === '#skills')).toBe(true);
      expect(contactLinks.some(link => link.getAttribute('href') === '#contact')).toBe(true);
    });

    test('screen reader text is present for mobile menu', () => {
      render(<Header />);
      
      const screenReaderText = screen.getByText('Open main menu');
      expect(screenReaderText).toBeInTheDocument();
      expect(screenReaderText).toHaveClass('sr-only');
    });
  });
});
