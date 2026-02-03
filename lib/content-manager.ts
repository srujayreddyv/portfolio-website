import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, ContentValidator } from '@/types';

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

/**
 * Create a new project MDX file
 */
export function createProject(project: Omit<Project, 'longDescription'>, content: string): boolean {
  try {
    // Validate project data
    const validation = ContentValidator.validateProject(project);
    if (!validation.isValid) {
      console.error('Invalid project data:', validation.errors);
      return false;
    }
    
    // Ensure projects directory exists
    if (!fs.existsSync(projectsDirectory)) {
      fs.mkdirSync(projectsDirectory, { recursive: true });
    }
    
    // Create frontmatter
    const frontmatter = {
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      category: project.category,
      imageUrl: project.imageUrl,
      ...(project.images && { images: project.images }),
      ...(project.liveUrl && { liveUrl: project.liveUrl }),
      ...(project.githubUrl && { githubUrl: project.githubUrl }),
      featured: project.featured,
      completedDate: project.completedDate,
      ...(project.challenges && { challenges: project.challenges }),
      ...(project.solutions && { solutions: project.solutions }),
      ...(project.results && { results: project.results })
    };
    
    // Create MDX content
    const mdxContent = matter.stringify(content, frontmatter);
    
    // Write file
    const filePath = path.join(projectsDirectory, `${project.id}.mdx`);
    fs.writeFileSync(filePath, mdxContent, 'utf8');
    
    console.log(`Project ${project.id} created successfully`);
    return true;
  } catch (error) {
    console.error(`Error creating project ${project.id}:`, error);
    return false;
  }
}

/**
 * Update an existing project
 */
export function updateProject(projectId: string, updates: Partial<Project>, content?: string): boolean {
  try {
    const filePath = path.join(projectsDirectory, `${projectId}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`Project ${projectId} not found`);
      return false;
    }
    
    // Read existing file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content: existingContent } = matter(fileContents);
    
    // Merge updates
    const updatedData = { ...data, ...updates };
    const updatedContent = content || existingContent;
    
    // Validate updated data
    const validation = ContentValidator.validateProject(updatedData);
    if (!validation.isValid) {
      console.error('Invalid updated project data:', validation.errors);
      return false;
    }
    
    // Create updated MDX content
    const mdxContent = matter.stringify(updatedContent, updatedData);
    
    // Write file
    fs.writeFileSync(filePath, mdxContent, 'utf8');
    
    console.log(`Project ${projectId} updated successfully`);
    return true;
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    return false;
  }
}

/**
 * Delete a project
 */
export function deleteProject(projectId: string): boolean {
  try {
    const filePath = path.join(projectsDirectory, `${projectId}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      console.error(`Project ${projectId} not found`);
      return false;
    }
    
    fs.unlinkSync(filePath);
    console.log(`Project ${projectId} deleted successfully`);
    return true;
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    return false;
  }
}

/**
 * Bulk import projects from JSON
 */
export function importProjects(projects: Array<{ project: Omit<Project, 'longDescription'>, content: string }>): number {
  let successCount = 0;
  
  for (const { project, content } of projects) {
    if (createProject(project, content)) {
      successCount++;
    }
  }
  
  console.log(`Successfully imported ${successCount} out of ${projects.length} projects`);
  return successCount;
}