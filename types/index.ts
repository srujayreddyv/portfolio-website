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
  apiDocsUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completedDate: string;
  proofBadges?: string[];
  architecture?: string;
  productionReadiness?: string;
  validationChecks?: string;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export class ContentValidator {
  static validateProject(project: unknown): ValidationResult {
    const errors: string[] = [];
    const projectObj = isRecord(project) ? project : {};

    if (!projectObj.id || typeof projectObj.id !== 'string') {
      errors.push('Project ID is required and must be a string');
    }
    
    if (!projectObj.title || typeof projectObj.title !== 'string') {
      errors.push('Project title is required and must be a string');
    }
    
    if (!projectObj.description || typeof projectObj.description !== 'string') {
      errors.push('Project description is required and must be a string');
    }
    
    if (!Array.isArray(projectObj.technologies)) {
      errors.push('Project technologies must be an array');
    }
    
    if (!projectObj.category || typeof projectObj.category !== 'string') {
      errors.push('Project category is required and must be a string');
    }
    
    if (!projectObj.imageUrl || typeof projectObj.imageUrl !== 'string') {
      errors.push('Project imageUrl is required and must be a string');
    }
    
    if (typeof projectObj.featured !== 'boolean') {
      errors.push('Project featured must be a boolean');
    }
    
    if (!projectObj.completedDate || typeof projectObj.completedDate !== 'string') {
      errors.push('Project completedDate is required and must be a string');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  static validatePersonalData(data: unknown): ValidationResult {
    const errors: string[] = [];
    const dataObj = isRecord(data) ? data : {};

    if (!dataObj.name || typeof dataObj.name !== 'string') {
      errors.push('Name is required and must be a string');
    }
    
    if (!dataObj.title || typeof dataObj.title !== 'string') {
      errors.push('Title is required and must be a string');
    }
    
    if (!dataObj.bio || typeof dataObj.bio !== 'string') {
      errors.push('Bio is required and must be a string');
    }
    
    if (!dataObj.email || typeof dataObj.email !== 'string') {
      errors.push('Email is required and must be a string');
    }
    
    if (!Array.isArray(dataObj.socialLinks)) {
      errors.push('Social links must be an array');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  static validateSkill(skill: unknown): ValidationResult {
    const errors: string[] = [];
    const skillObj = isRecord(skill) ? skill : {};

    if (!skillObj.name || typeof skillObj.name !== 'string') {
      errors.push('Skill name is required and must be a string');
    }
    
    if (skillObj.level && (typeof skillObj.level !== 'string' || !['Beginner', 'Intermediate', 'Advanced', 'Expert'].includes(skillObj.level))) {
      errors.push('Skill level must be one of: Beginner, Intermediate, Advanced, Expert');
    }
    
    if (typeof skillObj.yearsOfExperience !== 'undefined' && typeof skillObj.yearsOfExperience !== 'number') {
      errors.push('Years of experience must be a number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  static validateSEOData(seo: unknown): ValidationResult {
    const errors: string[] = [];
    const seoObj = isRecord(seo) ? seo : {};

    if (!seoObj.title || typeof seoObj.title !== 'string') {
      errors.push('SEO title is required and must be a string');
    }
    
    if (!seoObj.description || typeof seoObj.description !== 'string') {
      errors.push('SEO description is required and must be a string');
    }
    
    if (!Array.isArray(seoObj.keywords)) {
      errors.push('SEO keywords must be an array');
    }
    
    if (!seoObj.ogImage || typeof seoObj.ogImage !== 'string') {
      errors.push('SEO ogImage is required and must be a string');
    }
    
    if (!seoObj.canonicalUrl || typeof seoObj.canonicalUrl !== 'string') {
      errors.push('SEO canonicalUrl is required and must be a string');
    }
    
    if (!seoObj.structuredData || typeof seoObj.structuredData !== 'object') {
      errors.push('SEO structuredData is required and must be an object');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
