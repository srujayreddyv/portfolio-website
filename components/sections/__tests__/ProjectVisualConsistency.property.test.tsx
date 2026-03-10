/**
 * Deterministic visual consistency checks for project gallery
 */

import { render, screen } from '@testing-library/react';
import ProjectGallery from '../ProjectGallery';
import { Project } from '@/types';

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

jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

const projects: Project[] = [
  {
    id: 'p1',
    title: 'Buddhira',
    description: 'Knowledge management app with notes, tagging and search.',
    technologies: ['React', 'TypeScript', 'FastAPI'],
    category: 'Web Application',
    imageUrl: '/projects/project1.jpg',
    featured: true,
    completedDate: '2026-02-18'
  },
  {
    id: 'p2',
    title: 'CA DMV RAG System',
    description: 'RAG system with retrieval, reranking and confidence gating.',
    technologies: ['Python', 'FastAPI', 'FAISS'],
    category: 'API',
    imageUrl: '/projects/project2.png',
    featured: false,
    completedDate: '2026-03-04'
  }
];

describe('Project Visual Consistency Property Tests', () => {
  test('renders gallery heading and project cards', () => {
    render(<ProjectGallery projects={projects} />);

    expect(screen.getByRole('heading', { name: /featured projects/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open buddhira details/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open ca dmv rag system details/i })).toBeInTheDocument();
  });

  test('each card includes preview image, category, and technologies', () => {
    render(<ProjectGallery projects={projects} />);

    expect(screen.getByAltText(/buddhira preview/i)).toBeInTheDocument();
    expect(screen.getByAltText(/ca dmv rag system preview/i)).toBeInTheDocument();
    expect(screen.getByText('Web Application')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getAllByText('FastAPI').length).toBeGreaterThan(0);
  });

  test('featured cards include featured badge', () => {
    render(<ProjectGallery projects={projects} />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  test('filter controls and results counter are rendered', () => {
    render(<ProjectGallery projects={projects} />);

    expect(screen.getByRole('button', { name: /filters/i })).toBeInTheDocument();
    expect(screen.getByText(/showing 2 of 2 projects/i)).toBeInTheDocument();
  });

  test('gallery uses responsive grid classes', () => {
    const { container } = render(<ProjectGallery projects={projects} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });
});
