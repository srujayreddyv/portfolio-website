import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { Project, PersonalData, SkillCategory, SEOData, ContentValidator, ValidationResult } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');
const projectsDirectory = path.join(contentDirectory, 'projects');

/**
 * Get all project files from the content/projects directory
 */
export function getProjectFiles(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs.readdirSync(projectsDirectory).filter(file => file.endsWith('.mdx'));
}

/**
 * Get project data by ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const filePath = path.join(projectsDirectory, `${id}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown content to HTML
    const processedContent = content.trim() ? await marked(content) : '';
    const sanitizedContent = processedContent
      ? sanitizeHtml(processedContent, {
          allowedTags: [
            'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
            'ul', 'ol', 'li',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'blockquote', 'code', 'pre',
            'a'
          ],
          allowedAttributes: {
            a: ['href', 'title', 'target', 'rel']
          },
          allowedSchemes: ['http', 'https', 'mailto'],
          disallowedTagsMode: 'discard'
        })
      : '';
    
    const project: Project = {
      id: id, // Explicitly set the ID from the filename
      ...data as Omit<Project, 'id' | 'longDescription'>,
      longDescription: sanitizedContent
    };
    
    // Validate project data
    const validation = ContentValidator.validateProject(project);
    if (!validation.isValid) {
      console.warn(`Invalid project data for ${id}:`, validation.errors);
      return null;
    }
    
    return project;
  } catch (error) {
    console.error(`Error loading project ${id}:`, error);
    return null;
  }
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  const projectFiles = getProjectFiles();
  const projects: Project[] = [];
  
  for (const file of projectFiles) {
    const id = file.replace('.mdx', '');
    const project = await getProjectById(id);
    if (project) {
      projects.push(project);
    }
  }
  
  // Sort by completion date (newest first)
  return projects.sort((a, b) => 
    new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
  );
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => project.featured);
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get projects by technology
 */
export async function getProjectsByTechnology(technology: string): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project =>
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
}

/**
 * Load personal data with validation
 */
export async function getPersonalData(): Promise<PersonalData | null> {
  try {
    const { personalData } = await import('@/content/data/personal');
    
    const validation = ContentValidator.validatePersonalData(personalData);
    if (!validation.isValid) {
      console.warn('Invalid personal data:', validation.errors);
      return null;
    }
    
    return personalData;
  } catch (error) {
    console.error('Error loading personal data:', error);
    return null;
  }
}

/**
 * Load skills data with validation
 */
export async function getSkillCategories(): Promise<SkillCategory[]> {
  try {
    const { skillCategories } = await import('@/content/data/skills');
    
    // Validate each skill category
    const validCategories: SkillCategory[] = [];
    
    for (const category of skillCategories) {
      const validSkills = category.skills.filter(skill => {
        const validation = ContentValidator.validateSkill(skill);
        if (!validation.isValid) {
          console.warn(`Invalid skill data for ${skill.name}:`, validation.errors);
          return false;
        }
        return true;
      });
      
      if (validSkills.length > 0) {
        validCategories.push({
          ...category,
          skills: validSkills
        });
      }
    }
    
    return validCategories;
  } catch (error) {
    console.error('Error loading skills data:', error);
    return [];
  }
}

/**
 * Get all unique technologies from projects
 */
export async function getAllTechnologies(): Promise<string[]> {
  const projects = await getAllProjects();
  const technologies = new Set<string>();
  
  projects.forEach(project => {
    project.technologies.forEach(tech => technologies.add(tech));
  });
  
  return Array.from(technologies).sort();
}

/**
 * Get all unique categories from projects
 */
export async function getAllCategories(): Promise<string[]> {
  const projects = await getAllProjects();
  const categories = new Set<string>();
  
  projects.forEach(project => {
    categories.add(project.category);
  });
  
  return Array.from(categories).sort();
}

/**
 * Load SEO data with validation
 */
export async function getSEOData(): Promise<SEOData | null> {
  try {
    const { seoData } = await import('@/content/data/seo');
    
    const validation = ContentValidator.validateSEOData(seoData);
    if (!validation.isValid) {
      console.warn('Invalid SEO data:', validation.errors);
      return null;
    }
    
    return seoData;
  } catch (error) {
    console.error('Error loading SEO data:', error);
    return null;
  }
}

/**
 * Validate all content
 */
export async function validateAllContent(): Promise<ValidationResult> {
  const errors: string[] = [];
  
  // Validate projects
  const projects = await getAllProjects();
  projects.forEach(project => {
    const validation = ContentValidator.validateProject(project);
    if (!validation.isValid) {
      errors.push(`Project ${project.id}: ${validation.errors.join(', ')}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
