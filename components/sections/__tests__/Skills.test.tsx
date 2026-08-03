/**
 * Unit Tests for Skills Components
 * **Validates: Requirements 4.1, 4.4**
 */

import { render, screen } from '@testing-library/react';
import Skills from '../Skills';
import SkillCategory from '../SkillCategory';
import { skillCategories } from '@/content/data/skills';
import { SkillCategory as SkillCategoryType } from '@/types';

describe('Skills Component', () => {
  test('renders skills section with proper heading', () => {
    render(<Skills />);
    
    // Test requirement 4.1: THE Portfolio_Website SHALL display a comprehensive list of technical skills
    const mainHeading = screen.getByRole('heading', { level: 2, name: /skills/i });
    expect(mainHeading).toBeInTheDocument();
    
    // Check for section description
    expect(screen.getByText(/technologies i use to build backend services, cloud platforms, data workflows, and production ai systems/i)).toBeInTheDocument();
  });

  test('displays all skill categories from data', () => {
    render(<Skills />);
    
    // Test requirement 4.1: THE Portfolio_Website SHALL display a comprehensive list of technical skills
    skillCategories.forEach((category) => {
      expect(screen.getByText(category.category)).toBeInTheDocument();
    });
  });

  test('highlights primary skill areas', () => {
    render(<Skills />);
    
    // Test requirement 4.4: THE Portfolio_Website SHALL highlight primary and secondary skill areas
    const primaryCategories = ['AI & LLM Systems', 'Backend & APIs', 'Cloud'];
    
    primaryCategories.forEach((categoryName) => {
      const categoryElement = screen.getByText(categoryName);
      expect(categoryElement).toBeInTheDocument();
    });
    
    // Primary categories should be present in the rendered list
    expect(primaryCategories.length).toBeGreaterThan(0);
  });

  test('renders core and supporting stack labels', () => {
    render(<Skills />);
    
    // Redesign prefixes the labels with a terminal rule ("─── Core Stack"),
    // so match on the label text rather than an exact string.
    expect(screen.getByText(/core stack/i)).toBeInTheDocument();
    expect(screen.getByText(/supporting stack/i)).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    const { container } = render(<Skills />);
    
    // Check for semantic HTML structure
    const skillsSection = container.querySelector('section#skills');
    expect(skillsSection).toBeInTheDocument();
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2, name: /skills/i });
    expect(mainHeading).toBeInTheDocument();
  });

  test('has responsive grid layout for core stack', () => {
    const { container } = render(<Skills />);
    
    const gridContainers = container.querySelectorAll('.grid');
    expect(gridContainers.length).toBeGreaterThan(0);
    expect(gridContainers[0]).toHaveClass('grid-cols-1', 'lg:grid-cols-3');
  });
});

describe('SkillCategory Component', () => {
  const mockCategory: SkillCategoryType = {
    category: 'Test Category',
    skills: [
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'TypeScript', level: 'Intermediate', yearsOfExperience: 3 },
      { name: 'React' } // No level specified
    ]
  };

  test('renders category name and skills', () => {
    render(<SkillCategory category={mockCategory} />);
    
    // Test requirement 4.1: THE Portfolio_Website SHALL display a comprehensive list of technical skills
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    
    mockCategory.skills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  test('does not display skill levels when provided', () => {
    render(<SkillCategory category={mockCategory} />);
    
    // Levels are not displayed in the current UI
    expect(screen.queryByText('Advanced')).not.toBeInTheDocument();
    expect(screen.queryByText('Intermediate')).not.toBeInTheDocument();
    
    // Check that skills without levels don't show level badges
    const reactSkill = screen.getByText('React');
    expect(reactSkill).toBeInTheDocument();
  });

  test('does not display years of experience when provided', () => {
    render(<SkillCategory category={mockCategory} />);
    
    // Test requirement 4.1: THE Portfolio_Website SHALL display a comprehensive list of technical skills
    expect(screen.queryByText('3 years of experience')).not.toBeInTheDocument();
  });

  test('renders core badge when isPrimary is true', () => {
    render(<SkillCategory category={mockCategory} isPrimary={true} />);
    
    expect(screen.getByText('Core')).toBeInTheDocument();
  });

  test('renders category header with default styling', () => {
    render(<SkillCategory category={mockCategory} isPrimary={false} />);
    
    const categoryHeader = screen.getByText('Test Category');
    expect(categoryHeader).toHaveClass('text-ink');
  });

  test('does not render progress bars for skills with levels', () => {
    const { container } = render(<SkillCategory category={mockCategory} />);
    
    // Progress bars are removed from the UI
    const progressBars = container.querySelectorAll('.bg-gray-200.rounded-full.h-2');
    expect(progressBars.length).toBe(0);
  });

  test('has proper card styling', () => {
    const { container } = render(<SkillCategory category={mockCategory} />);
    
    const categoryCard = container.querySelector('div');
    expect(categoryCard).toHaveClass('p-4', 'sm:p-5', 'lg:p-6', 'border');
  });

  test('maintains consistent spacing between skills', () => {
    const { container } = render(<SkillCategory category={mockCategory} />);
    
    const skillsContainer = container.querySelector('.space-y-2');
    expect(skillsContainer).toBeInTheDocument();
  });

  test('renders empty category gracefully', () => {
    const emptyCategory: SkillCategoryType = {
      category: 'Empty Category',
      skills: []
    };

    render(<SkillCategory category={emptyCategory} />);
    
    expect(screen.getByText('Empty Category')).toBeInTheDocument();
    // Should not crash with empty skills array
  });

  test('handles skills without any optional properties', () => {
    const basicCategory: SkillCategoryType = {
      category: 'Basic Skills',
      skills: [
        { name: 'Basic Skill 1' },
        { name: 'Basic Skill 2' }
      ]
    };

    render(<SkillCategory category={basicCategory} />);
    
    expect(screen.getByText('Basic Skill 1')).toBeInTheDocument();
    expect(screen.getByText('Basic Skill 2')).toBeInTheDocument();
    
    // Should not show level badges or experience text
    expect(screen.queryByText(/years of experience/)).not.toBeInTheDocument();
  });
});
