// Core data interfaces for the portfolio website

// Theme-related types
export type Theme = 'light' | 'dark';
export type ThemePreference = 'light' | 'dark' | 'system';

export interface ThemeState {
  current: Theme;
  preference: ThemePreference;
  systemTheme: Theme;
  mounted: boolean;
}

export interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemTheme: Theme;
  isSystemTheme: boolean;
  mounted: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  imageUrl: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedDate: string;
  challenges?: string;
  solutions?: string;
  results?: string;
}

export interface Skill {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience?: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies?: string[];
  logo?: string; // Path to company logo
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  relevantCoursework?: string[];
  logo?: string; // Path to institution logo
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year?: string;
  type?: 'journal' | 'conference' | 'workshop' | 'preprint' | 'thesis';
  abstract?: string;
  doi?: string;
  url?: string;
  pdf?: string;
}

export interface PersonalData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: SocialLink[];
  resumeUrl?: string;
  careerHighlights?: string[];
  achievements?: string[];
  publications?: Publication[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl: string;
  structuredData: {
    "@type": "Person";
    name: string;
    jobTitle: string;
    url: string;
    sameAs: string[];
  };
}

// Content validation schemas
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ContentValidator {
  static validateProject(project: any): ValidationResult {
    const errors: string[] = [];
    
    if (!project.id || typeof project.id !== 'string') {
      errors.push('Project ID is required and must be a string');
    }
    
    if (!project.title || typeof project.title !== 'string') {
      errors.push('Project title is required and must be a string');
    }
    
    if (!project.description || typeof project.description !== 'string') {
      errors.push('Project description is required and must be a string');
    }
    
    if (!Array.isArray(project.technologies)) {
      errors.push('Project technologies must be an array');
    }
    
    if (!project.category || typeof project.category !== 'string') {
      errors.push('Project category is required and must be a string');
    }
    
    if (!project.imageUrl || typeof project.imageUrl !== 'string') {
      errors.push('Project imageUrl is required and must be a string');
    }
    
    if (typeof project.featured !== 'boolean') {
      errors.push('Project featured must be a boolean');
    }
    
    if (!project.completedDate || typeof project.completedDate !== 'string') {
      errors.push('Project completedDate is required and must be a string');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  static validatePersonalData(data: any): ValidationResult {
    const errors: string[] = [];
    
    if (!data.name || typeof data.name !== 'string') {
      errors.push('Name is required and must be a string');
    }
    
    if (!data.title || typeof data.title !== 'string') {
      errors.push('Title is required and must be a string');
    }
    
    if (!data.bio || typeof data.bio !== 'string') {
      errors.push('Bio is required and must be a string');
    }
    
    if (!data.email || typeof data.email !== 'string') {
      errors.push('Email is required and must be a string');
    }
    
    if (!Array.isArray(data.socialLinks)) {
      errors.push('Social links must be an array');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  static validateSkill(skill: any): ValidationResult {
    const errors: string[] = [];
    
    if (!skill.name || typeof skill.name !== 'string') {
      errors.push('Skill name is required and must be a string');
    }
    
    if (skill.level && !['Beginner', 'Intermediate', 'Advanced', 'Expert'].includes(skill.level)) {
      errors.push('Skill level must be one of: Beginner, Intermediate, Advanced, Expert');
    }
    
    if (skill.yearsOfExperience && typeof skill.yearsOfExperience !== 'number') {
      errors.push('Years of experience must be a number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  static validateSEOData(seo: any): ValidationResult {
    const errors: string[] = [];
    
    if (!seo.title || typeof seo.title !== 'string') {
      errors.push('SEO title is required and must be a string');
    }
    
    if (!seo.description || typeof seo.description !== 'string') {
      errors.push('SEO description is required and must be a string');
    }
    
    if (!Array.isArray(seo.keywords)) {
      errors.push('SEO keywords must be an array');
    }
    
    if (!seo.ogImage || typeof seo.ogImage !== 'string') {
      errors.push('SEO ogImage is required and must be a string');
    }
    
    if (!seo.canonicalUrl || typeof seo.canonicalUrl !== 'string') {
      errors.push('SEO canonicalUrl is required and must be a string');
    }
    
    if (!seo.structuredData || typeof seo.structuredData !== 'object') {
      errors.push('SEO structuredData is required and must be an object');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}