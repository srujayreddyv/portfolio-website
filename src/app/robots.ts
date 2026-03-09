import type { MetadataRoute } from 'next';
import { seoData } from '@/content/data/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/.next/'],
      },
    ],
    sitemap: `${seoData.canonicalUrl}/sitemap.xml`,
  };
}
