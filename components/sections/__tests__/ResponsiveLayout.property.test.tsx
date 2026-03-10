/**
 * Deterministic responsive layout checks
 */

import { render, screen, cleanup } from '@testing-library/react';
import Hero from '../Hero';
import Skills from '../Skills';
import ProjectGallery from '../ProjectGallery';
import Contact from '../Contact';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

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

describe('Responsive Layout Adaptation Property Tests', () => {
  afterEach(() => cleanup());

  test('hero renders core content and heading', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('header navigation and mobile toggle render', () => {
    render(<Header />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText(/toggle navigation menu/i)).toBeInTheDocument();
  });

  test('project gallery section uses responsive spacing and grid classes', () => {
    const { container } = render(
      <ProjectGallery
        projects={[
          {
            id: 'p1',
            title: 'Responsive Project',
            description: 'Project description long enough for rendering.',
            technologies: ['React'],
            category: 'Web Application',
            imageUrl: '/projects/project1.jpg',
            featured: false,
            completedDate: '2026-01-01'
          }
        ]}
      />
    );

    const section = container.querySelector('section#projects');
    expect(section).toHaveClass('py-16', 'sm:py-20', 'lg:py-24');

    const grid = container.querySelector('.grid.grid-cols-1');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  test('skills and contact sections render with headings', () => {
    const { unmount } = render(<Skills />);
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument();
    unmount();

    render(<Contact />);
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument();
  });

  test('footer renders semantic contentinfo landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
