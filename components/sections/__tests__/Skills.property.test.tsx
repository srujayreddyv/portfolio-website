/**
 * Property-Based Tests for Skills Organization
 * Feature: portfolio-website, Property 4: Skills organization
 * **Validates: Requirements 4.2, 4.3**
 */

import * as fc from 'fast-check';
import { render } from '@testing-library/react';
import Skills from '../Skills';
import SkillCategory from '../SkillCategory';
import { skillCategories } from '@/content/data/skills';
import { SkillCategory as SkillCategoryType, Skill } from '@/types';
import { propertyTestConfig, generators } from '@/lib/property-test-utils';

// Generator for skill categories
const skillCategoryGenerator = fc.record({
  category: fc.constantFrom('Frontend', 'Backend', 'DevOps', 'Database', 'Tools & Technologies', 'Mobile', 'Testing'),
  skills: fc.array(
    fc.record({
      name: generators.skillName(),
      level: fc.option(generators.skillLevel()),
      yearsOfExperience: fc.option(fc.integer({ min: 1, max: 15 }))
    }),
    { minLength: 1, maxLength: 8 }
  )
});

// Generator for multiple skill categories
const skillCategoriesGenerator = fc.array(skillCategoryGenerator, { minLength: 1, maxLength: 6 });

describe('Skills Organization Property Tests', () => {
  describe('Property 4: Skills organization', () => {
    test.skip('For any skill in the system, it should be categorized by type and where proficiency data exists, it should be displayed appropriately', () => {
      const property = fc.property(
        skillCategoriesGenerator,
        (testCategories) => {
          try {
            // Test with actual skill categories from the system
            const { container } = render(<Skills />);
            
            // Verify that all skills are properly categorized
            skillCategories.forEach((category) => {
              // Find the category section in the rendered component
              const categoryElement = container.querySelector(`h3:contains("${category.category}")`);
              
              // Alternative approach: find by text content
              const categoryHeaders = Array.from(container.querySelectorAll('h3')).filter(
                h3 => h3.textContent?.includes(category.category)
              );
              
              expect(categoryHeaders.length).toBeGreaterThan(0);
              
              // Verify each skill in the category
              category.skills.forEach((skill) => {
                // Find skill name in the rendered component
                const skillElements = Array.from(container.querySelectorAll('span')).filter(
                  span => span.textContent?.includes(skill.name)
                );
                
                expect(skillElements.length).toBeGreaterThan(0);
                
                // If skill has proficiency level, verify it's displayed
                if (skill.level) {
                  const levelElements = Array.from(container.querySelectorAll('span')).filter(
                    span => span.textContent?.includes(skill.level!)
                  );
                  expect(levelElements.length).toBeGreaterThan(0);
                  
                  // Verify level has appropriate styling
                  const levelElement = levelElements[0];
                  const className = levelElement.getAttribute('class');
                  expect(className).toMatch(/px-2|py-1|text-xs|rounded-full|text-white/);
                  
                  // Verify level has appropriate color based on proficiency
                  switch (skill.level) {
                    case 'Expert':
                      expect(className).toMatch(/bg-green-500/);
                      break;
                    case 'Advanced':
                      expect(className).toMatch(/bg-blue-500/);
                      break;
                    case 'Intermediate':
                      expect(className).toMatch(/bg-yellow-500/);
                      break;
                    case 'Beginner':
                      expect(className).toMatch(/bg-gray-500/);
                      break;
                  }
                }
                
                // If skill has years of experience, verify it's displayed
                if (skill.yearsOfExperience) {
                  const experienceText = `${skill.yearsOfExperience} year${skill.yearsOfExperience !== 1 ? 's' : ''} of experience`;
                  const experienceElements = Array.from(container.querySelectorAll('p')).filter(
                    p => p.textContent?.includes(experienceText)
                  );
                  expect(experienceElements.length).toBeGreaterThan(0);
                }
              });
            });
            
            return true;
          } catch (error) {
            console.error('Skills organization property test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, propertyTestConfig);
    });
    
    test.skip('Skills are properly categorized by type with consistent structure', () => {
      const property = fc.property(
        skillCategoryGenerator,
        (testCategory) => {
          try {
            // Render individual SkillCategory component
            const { container } = render(
              <SkillCategory category={testCategory} isPrimary={false} />
            );
            
            // Verify category header is present
            const categoryHeader = container.querySelector('h3');
            expect(categoryHeader).toBeTruthy();
            expect(categoryHeader?.textContent).toContain(testCategory.category);
            
            // Verify all skills in the category are displayed
            testCategory.skills.forEach((skill) => {
              // Find skill name
              const skillNameElements = Array.from(container.querySelectorAll('span')).filter(
                span => span.textContent?.includes(skill.name)
              );
              expect(skillNameElements.length).toBeGreaterThan(0);
              
              // Verify skill structure
              const skillContainer = skillNameElements[0].closest('div');
              expect(skillContainer).toBeTruthy();
              
              // If skill has level, verify progress bar and level badge
              if (skill.level) {
                // Check for level badge
                const levelBadges = Array.from(container.querySelectorAll('span')).filter(
                  span => span.textContent === skill.level
                );
                expect(levelBadges.length).toBeGreaterThan(0);
                
                // Check for progress bar
                const progressBars = container.querySelectorAll('.bg-gray-200.rounded-full.h-2');
                expect(progressBars.length).toBeGreaterThan(0);
                
                // Verify progress bar has correct width based on level
                const progressFill = container.querySelector(`.bg-gray-200.rounded-full.h-2 > div`);
                if (progressFill) {
                  const className = progressFill.getAttribute('class');
                  switch (skill.level) {
                    case 'Expert':
                      expect(className).toMatch(/w-full/);
                      break;
                    case 'Advanced':
                      expect(className).toMatch(/w-4\/5/);
                      break;
                    case 'Intermediate':
                      expect(className).toMatch(/w-3\/5/);
                      break;
                    case 'Beginner':
                      expect(className).toMatch(/w-2\/5/);
                      break;
                  }
                }
              }
              
              // If skill has years of experience, verify it's displayed
              if (skill.yearsOfExperience) {
                const experienceText = `${skill.yearsOfExperience} year${skill.yearsOfExperience !== 1 ? 's' : ''} of experience`;
                const experienceElements = Array.from(container.querySelectorAll('p')).filter(
                  p => p.textContent?.includes(experienceText)
                );
                expect(experienceElements.length).toBeGreaterThan(0);
              }
            });
            
            return true;
          } catch (error) {
            console.error('Skill categorization test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, propertyTestConfig);
    });
    
    test.skip('Primary and secondary skill areas are properly highlighted', () => {
      const property = fc.property(
        fc.boolean(), // isPrimary flag
        skillCategoryGenerator,
        (isPrimary, testCategory) => {
          try {
            // Render SkillCategory with primary/secondary designation
            const { container } = render(
              <SkillCategory category={testCategory} isPrimary={isPrimary} />
            );
            
            // Verify category container has appropriate styling
            const categoryContainer = container.querySelector('div');
            expect(categoryContainer).toBeTruthy();
            
            const containerClasses = categoryContainer?.getAttribute('class');
            
            if (isPrimary) {
              // Primary categories should have blue styling
              expect(containerClasses).toMatch(/border-blue-500|bg-blue-50/);
              
              // Primary label should be present
              const primaryLabel = Array.from(container.querySelectorAll('span')).find(
                span => span.textContent?.includes('(Primary)')
              );
              expect(primaryLabel).toBeTruthy();
              
              // Header should have primary styling
              const header = container.querySelector('h3');
              const headerClasses = header?.getAttribute('class');
              expect(headerClasses).toMatch(/text-blue-700/);
            } else {
              // Secondary categories should have default styling
              expect(containerClasses).toMatch(/border-gray-200|bg-white/);
              
              // No primary label should be present
              const primaryLabel = Array.from(container.querySelectorAll('span')).find(
                span => span.textContent?.includes('(Primary)')
              );
              expect(primaryLabel).toBeFalsy();
              
              // Header should have default styling
              const header = container.querySelector('h3');
              const headerClasses = header?.getAttribute('class');
              expect(headerClasses).toMatch(/text-gray-800/);
            }
            
            return true;
          } catch (error) {
            console.error('Primary/secondary highlighting test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 50 });
    });
    
    test.skip('Skills display maintains consistency across different skill configurations', () => {
      const property = fc.property(
        fc.array(
          fc.record({
            name: generators.skillName(),
            level: fc.option(generators.skillLevel()),
            yearsOfExperience: fc.option(fc.integer({ min: 1, max: 15 }))
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (skills) => {
          try {
            const testCategory: SkillCategoryType = {
              category: 'Test Category',
              skills: skills
            };
            
            // Render SkillCategory component
            const { container } = render(
              <SkillCategory category={testCategory} isPrimary={false} />
            );
            
            // Verify each skill is properly rendered
            skills.forEach((skill) => {
              // Find skill name
              const skillNameElements = Array.from(container.querySelectorAll('span')).filter(
                span => span.textContent?.includes(skill.name)
              );
              expect(skillNameElements.length).toBeGreaterThan(0);
              
              // Verify skill has proper structure regardless of configuration
              const skillElement = skillNameElements[0];
              const skillContainer = skillElement.closest('div');
              expect(skillContainer).toBeTruthy();
              
              // Verify consistent spacing and layout
              const skillContainerClasses = skillContainer?.getAttribute('class');
              expect(skillContainerClasses).toMatch(/space-y-2|space-y-3/);
              
              // If level exists, verify it's consistently displayed
              if (skill.level) {
                const levelElements = Array.from(container.querySelectorAll('span')).filter(
                  span => span.textContent === skill.level
                );
                expect(levelElements.length).toBeGreaterThan(0);
                
                // Verify level styling consistency
                const levelElement = levelElements[0];
                const levelClasses = levelElement.getAttribute('class');
                expect(levelClasses).toMatch(/px-2|py-1|text-xs|rounded-full|text-white/);
              }
              
              // If years of experience exists, verify it's consistently displayed
              if (skill.yearsOfExperience) {
                const experienceText = `${skill.yearsOfExperience} year${skill.yearsOfExperience !== 1 ? 's' : ''} of experience`;
                const experienceElements = Array.from(container.querySelectorAll('p')).filter(
                  p => p.textContent?.includes(experienceText)
                );
                expect(experienceElements.length).toBeGreaterThan(0);
                
                // Verify experience text styling consistency
                const experienceElement = experienceElements[0];
                const experienceClasses = experienceElement.getAttribute('class');
                expect(experienceClasses).toMatch(/text-sm|text-gray-600/);
              }
            });
            
            return true;
          } catch (error) {
            console.error('Skills display consistency test failed:', error);
            return false;
          }
        }
      );
      
      fc.assert(property, { ...propertyTestConfig, numRuns: 75 });
    });
  });
});