/**
 * Property-Based Tests for Content Management Integration
 * Feature: portfolio-website, Property 9: Content management integration
 * **Validates: Requirements 8.2**
 */

import * as fc from 'fast-check';
import { getAllProjects, getProjectById, getAllCategories, getAllTechnologies } from '../content';
import { createProject, deleteProject } from '../content-manager';
import { Project } from '@/types';
import { generators, propertyTestConfig } from '../property-test-utils';
import fs from 'fs';
import path from 'path';

// Import expect from Jest for TypeScript files
declare global {
  var expect: jest.Expect;
}

// Cleanup function to remove test projects
const cleanupTestProjects = (projectIds: string[]) => {
  const projectsDir = path.join(process.cwd(), 'content', 'projects');
  projectIds.forEach(id => {
    const filePath = path.join(projectsDir, `${id}.mdx`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};

// Generator for valid project data
const projectGenerator = fc.record({
  id: fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-zA-Z0-9-_]+$/.test(s)),
  title: fc.string({ minLength: 1, maxLength: 100 }).filter(s => 
    s.trim().length > 0 && 
    !s.includes('__') && 
    !['toString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'constructor'].includes(s.trim())
  ),
  description: fc.string({ minLength: 1, maxLength: 200 }).filter(s => 
    s.trim().length > 0 && 
    !s.includes('__') && 
    !['toString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'constructor'].includes(s.trim())
  ),
  technologies: fc.array(generators.skillName(), { minLength: 1, maxLength: 10 }),
  category: generators.projectCategory(),
  imageUrl: fc.constant('/test-image.jpg'),
  liveUrl: fc.option(generators.url()),
  githubUrl: fc.option(generators.url()),
  featured: fc.boolean(),
  completedDate: fc.integer({ min: 2020, max: 2024 }).chain(year =>
    fc.integer({ min: 1, max: 12 }).chain(month =>
      fc.integer({ min: 1, max: 28 }).map(day => 
        `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      )
    )
  )
});

describe('Content Management Integration Property Tests', () => {
  describe('Property 9: Content management integration', () => {
    test('For any new project added to the content system, it should be automatically displayed in the project gallery with all required information', async () => {
      const testProjectIds: string[] = [];
      
      const property = fc.asyncProperty(
        projectGenerator,
        fc.string({ minLength: 10, maxLength: 500 }).filter(s => 
          s.trim().length >= 10 && 
          !s.includes('__') && 
          !['toString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'constructor'].includes(s.trim())
        ), // content
        async (projectData, content) => {
          try {
            // Ensure unique ID by adding timestamp
            const uniqueId = `${projectData.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const uniqueProject = { ...projectData, id: uniqueId };
            
            // Track test project for cleanup
            testProjectIds.push(uniqueId);
            
            // Get initial project count
            const initialProjects = await getAllProjects();
            const initialCount = initialProjects.length;
            
            // Create new project
            const success = createProject(uniqueProject, content);
            
            // Verify project creation succeeded
            expect(success).toBe(true);
            
            // Verify project appears in gallery
            const updatedProjects = await getAllProjects();
            expect(updatedProjects.length).toBe(initialCount + 1);
            
            // Verify project can be retrieved by ID
            const retrievedProject = await getProjectById(uniqueId);
            expect(retrievedProject).not.toBeNull();
            
            if (retrievedProject) {
              // Verify all required information is present
              expect(retrievedProject.id).toBe(uniqueId);
              expect(retrievedProject.title).toBe(uniqueProject.title);
              expect(retrievedProject.description).toBe(uniqueProject.description);
              expect(retrievedProject.technologies).toEqual(uniqueProject.technologies);
              expect(retrievedProject.category).toBe(uniqueProject.category);
              expect(retrievedProject.imageUrl).toBe(uniqueProject.imageUrl);
              expect(retrievedProject.featured).toBe(uniqueProject.featured);
              expect(retrievedProject.completedDate).toBe(uniqueProject.completedDate);
              expect(retrievedProject.longDescription?.trim()).toBe(content.trim());
              
              // Verify optional fields
              if (uniqueProject.liveUrl) {
                expect(retrievedProject.liveUrl).toBe(uniqueProject.liveUrl);
              }
              if (uniqueProject.githubUrl) {
                expect(retrievedProject.githubUrl).toBe(uniqueProject.githubUrl);
              }
            }
            
            // Verify project appears in category listings
            const categoryProjects = (await getAllProjects()).filter(p => p.category === uniqueProject.category);
            expect(categoryProjects.some(p => p.id === uniqueId)).toBe(true);
            
            // Verify project technologies appear in technology listings
            const allTechnologies = await getAllTechnologies();
            uniqueProject.technologies.forEach(tech => {
              expect(allTechnologies).toContain(tech);
            });
            
            // Verify project category appears in category listings
            const allCategories = await getAllCategories();
            expect(allCategories).toContain(uniqueProject.category);
            
            // Clean up the test project
            deleteProject(uniqueId);
            
            return true;
          } catch (error) {
            console.error('Property test failed:', error);
            return false;
          }
        }
      );
      
      try {
        await fc.assert(property, propertyTestConfig);
      } finally {
        // Cleanup any remaining test projects
        cleanupTestProjects(testProjectIds);
      }
    });
    
    test('Content management system maintains data integrity across operations', async () => {
      const testProjectIds: string[] = [];
      
      const property = fc.asyncProperty(
        fc.array(projectGenerator, { minLength: 1, maxLength: 5 }),
        fc.array(fc.string({ minLength: 10, maxLength: 200 }).filter(s => 
          s.trim().length >= 10 && 
          !s.includes('__') && 
          !['toString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'constructor'].includes(s.trim())
        ), { minLength: 1, maxLength: 5 }),
        async (projects, contents) => {
          try {
            // Ensure we have matching arrays
            const projectsToTest = projects.slice(0, Math.min(projects.length, contents.length));
            const contentsToTest = contents.slice(0, projectsToTest.length);
            
            // Ensure unique IDs by adding a timestamp suffix
            const timestamp = Date.now();
            projectsToTest.forEach((project, index) => {
              project.id = `${project.id}_${timestamp}_${index}`;
            });
            
            // Track test projects for cleanup
            projectsToTest.forEach(p => testProjectIds.push(p.id));
            
            // Create all projects
            const creationResults = projectsToTest.map((project, index) => 
              createProject(project, contentsToTest[index])
            );
            
            // Verify all projects were created successfully
            expect(creationResults.every(result => result === true)).toBe(true);
            
            // Verify all projects can be retrieved
            const retrievedProjects = await Promise.all(
              projectsToTest.map(p => getProjectById(p.id))
            );
            expect(retrievedProjects.every(p => p !== null)).toBe(true);
            
            // Verify project count is correct
            const allProjects = await getAllProjects();
            const testProjectsInGallery = allProjects.filter(p => 
              projectsToTest.some(tp => tp.id === p.id)
            );
            expect(testProjectsInGallery.length).toBe(projectsToTest.length);
            
            // Verify data integrity for each project
            retrievedProjects.forEach((retrieved, index) => {
              if (retrieved) {
                const original = projectsToTest[index];
                expect(retrieved.id).toBe(original.id);
                expect(retrieved.title).toBe(original.title);
                expect(retrieved.description).toBe(original.description);
                expect(retrieved.technologies).toEqual(original.technologies);
                expect(retrieved.category).toBe(original.category);
                // Compare longDescription with trimmed content to handle newline differences
                expect(retrieved.longDescription?.trim()).toBe(contentsToTest[index].trim());
              }
            });
            
            // Clean up test projects
            projectsToTest.forEach(p => deleteProject(p.id));
            
            return true;
          } catch (error) {
            console.error('Data integrity test failed:', error);
            return false;
          }
        }
      );
      
      try {
        await fc.assert(property, { ...propertyTestConfig, numRuns: 50 });
      } finally {
        // Cleanup any remaining test projects
        cleanupTestProjects(testProjectIds);
      }
    });
  });
});