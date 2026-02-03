/**
 * Unit tests for Footer component
 * Tests footer content display
 * Requirements: 5.1
 */

import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Footer from '../Footer';

// Mock the personal data
jest.mock('../../../content/data/personal', () => ({
  personalData: {
    name: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    location: 'San Francisco, CA',
    socialLinks: [
      {
        platform: 'GitHub',
        url: 'https://github.com/johndoe',
        icon: 'github'
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/johndoe',
        icon: 'linkedin'
      },
      {
        platform: 'Twitter',
        url: 'https://twitter.com/johndoe',
        icon: 'twitter'
      }
    ]
  }
}));

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

describe('Footer Component', () => {
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

  describe('Contact Information Display', () => {
    test('displays personal name and title', () => {
      render(<Footer />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    });

    test('displays email as clickable link', () => {
      render(<Footer />);
      
      const emailLink = screen.getByRole('link', { name: 'john.doe@example.com' });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
    });

    test('displays phone as clickable link when provided', () => {
      render(<Footer />);
      
      const phoneLink = screen.getByRole('link', { name: '+1-555-0123' });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', 'tel:+1-555-0123');
    });

    test('displays location when provided', () => {
      render(<Footer />);
      
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    });
  });

  describe('Quick Navigation Links', () => {
    test('displays all quick navigation links', () => {
      render(<Footer />);
      
      const expectedLinks = ['About', 'Experience', 'Education', 'Skills', 'Projects', 'Contact'];
      
      expectedLinks.forEach(linkText => {
        const link = screen.getByRole('link', { name: linkText });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `#${linkText.toLowerCase()}`);
      });
    });

    test('quick navigation links trigger smooth scroll', () => {
      render(<Footer />);
      
      const aboutLink = screen.getByRole('link', { name: 'About' });
      fireEvent.click(aboutLink);
      
      expect(mockGetElementById).toHaveBeenCalledWith('about');
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    test('displays "Quick Links" section heading', () => {
      render(<Footer />);
      
      expect(screen.getByText('Quick Links')).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    test('displays "Connect" section heading', () => {
      render(<Footer />);
      
      expect(screen.getByText('Connect')).toBeInTheDocument();
    });

    test('displays all social media links with proper attributes', () => {
      render(<Footer />);
      
      const githubLink = screen.getByLabelText('Visit GitHub profile');
      const linkedinLink = screen.getByLabelText('Visit LinkedIn profile');
      const twitterLink = screen.getByLabelText('Visit Twitter profile');
      
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      expect(linkedinLink).toBeInTheDocument();
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/johndoe');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('social media links contain SVG icons', () => {
      render(<Footer />);
      
      const githubLink = screen.getByLabelText('Visit GitHub profile');
      const linkedinLink = screen.getByLabelText('Visit LinkedIn profile');
      const twitterLink = screen.getByLabelText('Visit Twitter profile');
      
      expect(githubLink.querySelector('svg')).toBeInTheDocument();
      expect(linkedinLink.querySelector('svg')).toBeInTheDocument();
      expect(twitterLink.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Copyright and Footer Information', () => {
    test('displays current year in copyright', () => {
      render(<Footer />);
      
      const currentYear = new Date().getFullYear();
      const copyrightText = screen.getByText(`© ${currentYear} John Doe. All rights reserved.`);
      expect(copyrightText).toBeInTheDocument();
    });

    test('displays technology stack information', () => {
      render(<Footer />);
      
      expect(screen.getByText('Built with Next.js and Tailwind CSS')).toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    test('footer has proper grid layout classes', () => {
      render(<Footer />);
      
      const footerContent = screen.getByText('John Doe').closest('.grid');
      expect(footerContent).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'sm:gap-8', 'lg:gap-12');
    });

    test('copyright section has responsive flex layout', () => {
      render(<Footer />);
      
      const copyrightSection = screen.getByText(/© \d{4} John Doe/).closest('.flex');
      expect(copyrightSection).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'justify-between', 'items-center');
    });
  });

  describe('Accessibility', () => {
    test('social media links have proper aria-labels', () => {
      render(<Footer />);
      
      expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Visit Twitter profile')).toBeInTheDocument();
    });

    test('external links have proper security attributes', () => {
      render(<Footer />);
      
      const externalLinks = [
        screen.getByLabelText('Visit GitHub profile'),
        screen.getByLabelText('Visit LinkedIn profile'),
        screen.getByLabelText('Visit Twitter profile')
      ];
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    test('contact links have proper href formats', () => {
      render(<Footer />);
      
      const emailLink = screen.getByRole('link', { name: 'john.doe@example.com' });
      const phoneLink = screen.getByRole('link', { name: '+1-555-0123' });
      
      expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
      expect(phoneLink).toHaveAttribute('href', 'tel:+1-555-0123');
    });
  });
});