import * as fc from 'fast-check'

// Common generators for property-based testing
export const generators = {
  // Generate valid email addresses
  email: () => fc.emailAddress(),
  
  // Generate non-empty strings
  nonEmptyString: () => fc.string({ minLength: 1, maxLength: 100 }),
  
  // Generate valid URLs
  url: () => fc.webUrl(),
  
  // Generate valid hex colors (6 characters)
  hexColor: () => fc.string({ minLength: 6, maxLength: 6 }).filter(s => /^[0-9a-fA-F]{6}$/.test(s)),
  
  // Generate theme names
  themeName: () => fc.constantFrom('light', 'dark', 'system'),
  
  // Generate storage keys
  storageKey: () => fc.constantFrom('theme', 'color-scheme', 'ui-theme'),
  
  // Generate skill names
  skillName: () => fc.constantFrom(
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
    'Python', 'Java', 'CSS', 'HTML', 'Git'
  ),
  
  // Generate skill levels
  skillLevel: () => fc.constantFrom('Beginner', 'Intermediate', 'Advanced', 'Expert'),
  
  // Generate project categories
  projectCategory: () => fc.constantFrom('Web Development', 'Mobile App', 'API', 'Tool', 'Library'),
  
  // Generate screen sizes for responsive testing
  screenSize: () => fc.record({
    width: fc.integer({ min: 320, max: 1920 }),
    height: fc.integer({ min: 568, max: 1080 })
  }),
  
  // Generate CSS utilities for Tailwind
  cssUtility: () => fc.constantFrom('bg', 'text', 'border', 'ring', 'shadow'),
  
  // Generate breakpoints
  breakpoint: () => fc.constantFrom('sm', 'md', 'lg', 'xl'),
  
  // Generate state variants
  stateVariant: () => fc.constantFrom('hover', 'focus', 'active'),
}

// Property test configuration
export const propertyTestConfig = {
  numRuns: 50, // Reduced for faster execution
  verbose: false, // Reduced verbosity for cleaner output
  timeout: 2000, // 2 second timeout per test
}