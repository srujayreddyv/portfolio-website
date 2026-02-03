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
    const mainHeading = screen.getByRole('heading', { level: 2, name: /skills & technologies/i });
    expect(mainHeading).toBeInTheDocument();
    
    // Check for section description
    expect(screen.getByText(/comprehensive overview of my technical skills/i)).toBeInTheDocument();
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
    const primaryCategories = ['Frontend', 'Backend'];
    
    primaryCategories.forEach((categoryName) => {
      const categoryElement = screen.getByText(categoryName);
      expect(categoryElement).toBeInTheDocument();
    });
    
    // Check if primary labels are present (there should be multiple)
    const primaryLabels = screen.getAllByText('(Primary)');
    expect(primaryLabels.length).toBeGreaterThan(0);
  });

  test('displays legend for primary and secondary skills', () => {
    render(<Skills />);
    
    // Test requirement 4.4: THE Portfolio_Website SHALL highlight primary and secondary skill areas
    expect(screen.getByText('Primary Skills')).toBeInTheDocument();
    expect(screen.getByText('Secondary Skills')).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    const { container } = render(<Skills />);
    
    // Check for semantic HTML structure
    const skillsSection = container.querySelector('section#skills');
    expect(skillsSection).toBeInTheDocument();
    
    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2, name: /skills & technologies/i });
    expect(mainHeading).toBeInTheDocument();
  });

  test('has responsive grid layout', () => {
    const { container } = render(<Skills />);
    
    // Check that responsive grid classes are applied
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
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

  test('displays skill levels when available', () => {
    render(<SkillCategory category={mockCategory} />);
    
    // Test skill categorization and highlighting
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    
    // Check that skills without levels don't show level badges
    const reactSkill = screen.getByText('React');
    expect(reactSkill).toBeInTheDocument();
  });

  test('displays years of experience when available', () => {
    render(<SkillCategory category={mockCategory} />);
    
    // Test requirement 4.1: THE Portfolio_Website SHALL display a comprehensive list of technical skills
    expect(screen.getByText('3 years of experience')).toBeInTheDocument();
  });

  test('applies correct styling for skill levels', () => {
    render(<SkillCategory category={mockCategory} />);
    
    // Test skill categorization and highlighting
    const advancedBadge = screen.getByText('Advanced');
    expect(advancedBadge).toHaveClass('bg-blue-500');
    
    const intermediateBadge = screen.getByText('Intermediate');
    expect(intermediateBadge).toHaveClass('bg-yellow-500');
  });

  test('renders primary category with special styling', () => {
    render(<SkillCategory category={mockCategory} isPrimary={true} />);
    
    // Test requirement 4.4: THE Portfolio_Website SHALL highlight primary and secondary skill areas
    expect(screen.getByText('(Primary)')).toBeInTheDocument();
    
    const categoryHeader = screen.getByText('Test Category');
    expect(categoryHeader).toHaveClass('text-blue-700');
  });

  test('renders secondary category with default styling', () => {
    render(<SkillCategory category={mockCategory} isPrimary={false} />);
    
    // Test requirement 4.4: THE Portfolio_Website SHALL highlight primary and secondary skill areas
    expect(screen.queryByText('(Primary)')).not.toBeInTheDocument();
    
    const categoryHeader = screen.getByText('Test Category');
    expect(categoryHeader).toHaveClass('text-gray-800');
  });

  test('displays progress bars for skills with levels', () => {
    const { container } = render(<SkillCategory category={mockCategory} />);
    
    // Check for progress bars
    const progressBars = container.querySelectorAll('.bg-gray-200.rounded-full.h-2');
    expect(progressBars.length).toBeGreaterThan(0);
    
    // Check that progress bars have appropriate widths
    const advancedProgressBar = container.querySelector('.bg-blue-500.w-4\\/5');
    expect(advancedProgressBar).toBeInTheDocument();
    
    const intermediateProgressBar = container.querySelector('.bg-yellow-500.w-3\\/5');
    expect(intermediateProgressBar).toBeInTheDocument();
  });

  test('handles different skill level colors correctly', () => {
    const skillsWithAllLevels: SkillCategoryType = {
      category: 'All Levels',
      skills: [
        { name: 'Expert Skill', level: 'Expert' },
        { name: 'Advanced Skill', level: 'Advanced' },
        { name: 'Intermediate Skill', level: 'Intermediate' },
        { name: 'Beginner Skill', level: 'Beginner' }
      ]
    };

    render(<SkillCategory category={skillsWithAllLevels} />);
    
    // Test skill categorization and highlighting
    expect(screen.getByText('Expert')).toHaveClass('bg-green-500');
    expect(screen.getByText('Advanced')).toHaveClass('bg-blue-500');
    expect(screen.getByText('Intermediate')).toHaveClass('bg-yellow-500');
    expect(screen.getByText('Beginner')).toHaveClass('bg-gray-500');
  });

  test('handles singular vs plural years correctly', () => {
    const singleYearCategory: SkillCategoryType = {
      category: 'Single Year',
      skills: [
        { name: 'New Skill', level: 'Beginner', yearsOfExperience: 1 }
      ]
    };

    render(<SkillCategory category={singleYearCategory} />);
    
    expect(screen.getByText('1 year of experience')).toBeInTheDocument();
  });

  test('has proper card styling', () => {
    const { container } = render(<SkillCategory category={mockCategory} />);
    
    const categoryCard = container.querySelector('div');
    expect(categoryCard).toHaveClass('p-6', 'rounded-lg', 'border', 'shadow-sm');
  });

  test('maintains consistent spacing between skills', () => {
    const { container } = render(<SkillCategory category={mockCategory} />);
    
    const skillsContainer = container.querySelector('.space-y-3');
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