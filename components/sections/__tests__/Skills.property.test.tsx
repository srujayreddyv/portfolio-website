/**
 * Deterministic coverage for skills organization behavior
 */

import { render, screen } from '@testing-library/react';
import Skills from '../Skills';
import SkillCategory from '../SkillCategory';
import { skillCategories } from '@/content/data/skills';
import { SkillCategory as SkillCategoryType } from '@/types';

describe('Skills Organization Property Tests', () => {
  test('renders all configured skill category headings', () => {
    render(<Skills />);

    skillCategories.forEach((category) => {
      expect(screen.getByRole('heading', { name: category.category })).toBeInTheDocument();
    });
  });

  test('renders visible skills for a category with expand/collapse control', () => {
    const category: SkillCategoryType = {
      category: 'Backend & APIs',
      skills: [
        { name: 'Python' },
        { name: 'FastAPI' },
        { name: 'Django' },
        { name: 'Node.js' },
        { name: 'Express' },
        { name: 'Go' },
        { name: 'GraphQL' },
        { name: 'REST APIs' }
      ]
    };

    render(<SkillCategory category={category} isPrimary={false} />);

    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show 1 more/i })).toBeInTheDocument();
  });

  test('primary and secondary cards use distinct border styling', () => {
    const category: SkillCategoryType = {
      category: 'Test Category',
      skills: [{ name: 'React' }]
    };

    const { rerender, container } = render(<SkillCategory category={category} isPrimary={true} />);
    expect(container.firstChild).toHaveClass('border-black');

    rerender(<SkillCategory category={category} isPrimary={false} />);
    expect(container.firstChild).toHaveClass('border-gray-300');
  });

  test('skills rows are icon + skill name only (no years/proficiency labels)', () => {
    const category: SkillCategoryType = {
      category: 'Test Category',
      skills: [{ name: 'React', level: 'Advanced', yearsOfExperience: 4 }]
    };

    render(<SkillCategory category={category} isPrimary={false} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText(/years of experience/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Advanced')).not.toBeInTheDocument();
  });
});
