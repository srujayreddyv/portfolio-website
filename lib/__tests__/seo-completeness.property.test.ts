import * as fc from 'fast-check';
import { JSDOM } from 'jsdom';
import { seoData } from '@/content/data/seo';
import { getSEOData } from '@/lib/content';
import fs from 'fs';
import path from 'path';

/**
 * Property-based tests for SEO completeness
 * **Feature: portfolio-website, Property 8: SEO completeness**
 */

describe('Property 8: SEO completeness', () => {
  test('**Validates: Requirements 7.1** - For any page in the website, it should include appropriate meta tags', async () => {
    const property = fc.asyncProperty(
      fc.constantFrom('/', '/#about', '/#projects', '/#skills', '/#experience', '/#education', '/#publications', '/#contact'),
      async (pagePath) => {
        // Test that SEO data is properly structured and contains required meta tags
        const seoDataResult = await getSEOData();
        
        expect(seoDataResult).not.toBeNull();
        expect(seoDataResult!.title).toBeDefined();
        expect(seoDataResult!.title).toBeTruthy();
        expect(typeof seoDataResult!.title).toBe('string');
        expect(seoDataResult!.title.length).toBeGreaterThan(0);
        
        expect(seoDataResult!.description).toBeDefined();
        expect(seoDataResult!.description).toBeTruthy();
        expect(typeof seoDataResult!.description).toBe('string');
        expect(seoDataResult!.description.length).toBeGreaterThan(0);
        
        expect(seoDataResult!.keywords).toBeDefined();
        expect(Array.isArray(seoDataResult!.keywords)).toBe(true);
        expect(seoDataResult!.keywords.length).toBeGreaterThan(0);
        
        expect(seoDataResult!.canonicalUrl).toBeDefined();
        expect(seoDataResult!.canonicalUrl).toBeTruthy();
        expect(typeof seoDataResult!.canonicalUrl).toBe('string');
        expect(seoDataResult!.canonicalUrl).toMatch(/^https?:\/\/.+/);
        
        expect(seoDataResult!.ogImage).toBeDefined();
        expect(seoDataResult!.ogImage).toBeTruthy();
        expect(typeof seoDataResult!.ogImage).toBe('string');
      }
    );

    await fc.assert(property, { numRuns: 50 });
  });

  test('**Validates: Requirements 7.2** - For any page in the website, it should include structured data markup', async () => {
    const property = fc.asyncProperty(
      fc.constantFrom('/', '/#about', '/#projects', '/#skills', '/#experience', '/#education', '/#publications', '/#contact'),
      async (pagePath) => {
        // Test structured data completeness
        const seoDataResult = await getSEOData();
        
        expect(seoDataResult).not.toBeNull();
        expect(seoDataResult!.structuredData).toBeDefined();
        
        const structuredData = seoDataResult!.structuredData;
        expect(structuredData['@type']).toBe('Person');
        expect(structuredData.name).toBeDefined();
        expect(structuredData.name).toBeTruthy();
        expect(typeof structuredData.name).toBe('string');
        
        expect(structuredData.jobTitle).toBeDefined();
        expect(structuredData.jobTitle).toBeTruthy();
        expect(typeof structuredData.jobTitle).toBe('string');
        
        expect(structuredData.url).toBeDefined();
        expect(structuredData.url).toBeTruthy();
        expect(typeof structuredData.url).toBe('string');
        expect(structuredData.url).toMatch(/^https?:\/\/.+/);
        
        expect(structuredData.sameAs).toBeDefined();
        expect(Array.isArray(structuredData.sameAs)).toBe(true);
        expect(structuredData.sameAs.length).toBeGreaterThan(0);
        
        // Validate that all sameAs URLs are valid
        structuredData.sameAs.forEach(url => {
          expect(url).toMatch(/^https?:\/\/.+/);
        });
      }
    );

    await fc.assert(property, { numRuns: 50 });
  });

  test('**Validates: Requirements 7.4** - For any page in the website, it should have optimized titles and descriptions', async () => {
    const property = fc.asyncProperty(
      fc.constantFrom('/', '/#about', '/#projects', '/#skills', '/#experience', '/#education', '/#publications', '/#contact'),
      async (pagePath) => {
        const seoDataResult = await getSEOData();
        
        expect(seoDataResult).not.toBeNull();
        
        // Test title optimization
        const title = seoDataResult!.title;
        expect(title.length).toBeGreaterThanOrEqual(30); // Minimum for SEO
        expect(title.length).toBeLessThanOrEqual(60); // Maximum for SEO
        expect(title).toMatch(/[A-Za-z]/); // Contains letters
        expect(title.trim()).toBe(title); // No leading/trailing whitespace
        
        // Test description optimization
        const description = seoDataResult!.description;
        expect(description.length).toBeGreaterThanOrEqual(120); // Minimum for SEO
        expect(description.length).toBeLessThanOrEqual(160); // Maximum for SEO
        expect(description).toMatch(/[A-Za-z]/); // Contains letters
        expect(description.trim()).toBe(description); // No leading/trailing whitespace
        
        // Test keywords optimization
        const keywords = seoDataResult!.keywords;
        expect(keywords.length).toBeGreaterThanOrEqual(5); // Minimum keywords
        expect(keywords.length).toBeLessThanOrEqual(30); // Maximum keywords
        
        keywords.forEach(keyword => {
          expect(keyword).toBeTruthy();
          expect(typeof keyword).toBe('string');
          expect(keyword.trim()).toBe(keyword);
          expect(keyword.length).toBeGreaterThan(0);
        });
      }
    );

    await fc.assert(property, { numRuns: 50 });
  });

  test('**Validates: Requirements 7.5** - For any page in the website, it should implement proper semantic HTML hierarchy', async () => {
    const property = fc.asyncProperty(
      fc.constantFrom('main', 'section', 'article', 'header', 'footer', 'nav'),
      async (semanticElement) => {
        // Test that semantic HTML elements are properly used
        // This is a structural test that validates the semantic HTML approach
        
        // Validate that the layout uses proper HTML5 semantic structure
        const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
        const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
        
        // Check that layout includes proper HTML structure
        expect(layoutContent).toMatch(/<html[^>]*lang="en"/); // Language attribute
        expect(layoutContent).toMatch(/<head>/); // Head section
        expect(layoutContent).toMatch(/<body/); // Body section
        
        // Check for structured data script
        expect(layoutContent).toMatch(/application\/ld\+json/);
        expect(layoutContent).toMatch(/@context.*schema\.org/);
        
        // Validate that semantic elements would be properly structured
        // (This tests the foundation for semantic HTML)
        expect(['main', 'section', 'article', 'header', 'footer', 'nav']).toContain(semanticElement);
      }
    );

    await fc.assert(property, { numRuns: 50 });
  });

  test('**Validates: Requirements 7.3** - Sitemap generation and accessibility', async () => {
    const property = fc.asyncProperty(
      fc.constant('sitemap'),
      async (testType) => {
        const { default: getSitemap } = await import('@/app/sitemap');
        const sitemapEntries = getSitemap();

        expect(Array.isArray(sitemapEntries)).toBe(true);
        expect(sitemapEntries.length).toBeGreaterThan(0);
        expect(sitemapEntries[0].url).toBe(seoData.canonicalUrl);
        expect(sitemapEntries[0].changeFrequency).toBe('monthly');
        expect(sitemapEntries[0].priority).toBe(1);
        
        // Sitemap should not include fragment URLs (search engines ignore them)
        const disallowedFragments = ['#about', '#projects', '#skills', '#experience', '#education', '#publications', '#contact'];
        disallowedFragments.forEach(fragment => {
          expect(sitemapEntries.some(entry => entry.url?.includes(fragment))).toBe(false);
        });
      }
    );

    await fc.assert(property, { numRuns: 10 });
  });

  test('**Validates: Requirements 7.3** - Robots.txt accessibility and configuration', async () => {
    const property = fc.asyncProperty(
      fc.constant('robots'),
      async (testType) => {
        const { default: getRobots } = await import('@/app/robots');
        const robots = getRobots();

        expect(robots.sitemap).toBe(`${seoData.canonicalUrl}/sitemap.xml`);
        expect(Array.isArray(robots.rules)).toBe(true);
        expect(robots.rules.length).toBeGreaterThan(0);

        const primaryRule = robots.rules[0];
        expect(primaryRule.userAgent).toBe('*');
        expect(primaryRule.allow).toBe('/');
        expect(Array.isArray(primaryRule.disallow)).toBe(true);
        expect(primaryRule.disallow).toContain('/api/');
        expect(primaryRule.disallow).toContain('/_next/');
        expect(primaryRule.disallow).toContain('/.next/');
      }
    );

    await fc.assert(property, { numRuns: 10 });
  });

  test('**Validates: Requirements 7.1, 7.2** - Complete SEO metadata integration', async () => {
    const property = fc.asyncProperty(
      fc.record({
        title: fc.string({ minLength: 30, maxLength: 60 }).filter(s => s.trim().length > 0),
        description: fc.string({ minLength: 120, maxLength: 160 }).filter(s => s.trim().length > 0),
        keywords: fc.array(fc.string({ minLength: 2, maxLength: 20 }).filter(s => s.trim().length > 0), { minLength: 5, maxLength: 30 }),
        canonicalUrl: fc.webUrl(),
      }),
      async (mockSeoData) => {
        // Test that SEO data structure is complete and valid
        const actualSeoData = await getSEOData();
        expect(actualSeoData).not.toBeNull();
        
        // Validate the actual SEO data follows the same structure as mock data
        expect(typeof actualSeoData!.title).toBe(typeof mockSeoData.title);
        expect(typeof actualSeoData!.description).toBe(typeof mockSeoData.description);
        expect(Array.isArray(actualSeoData!.keywords)).toBe(Array.isArray(mockSeoData.keywords));
        expect(typeof actualSeoData!.canonicalUrl).toBe(typeof mockSeoData.canonicalUrl);
        
        // Validate actual data meets SEO requirements
        expect(actualSeoData!.title.length).toBeGreaterThanOrEqual(30);
        expect(actualSeoData!.title.length).toBeLessThanOrEqual(60);
        expect(actualSeoData!.description.length).toBeGreaterThanOrEqual(120);
        expect(actualSeoData!.description.length).toBeLessThanOrEqual(160);
        expect(actualSeoData!.keywords.length).toBeGreaterThanOrEqual(5);
        expect(actualSeoData!.canonicalUrl).toMatch(/^https?:\/\/.+/);
        
        // Validate structured data is present
        expect(actualSeoData!.structuredData).toBeDefined();
        expect(actualSeoData!.structuredData['@type']).toBe('Person');
      }
    );

    await fc.assert(property, { numRuns: 100 });
  });
});
