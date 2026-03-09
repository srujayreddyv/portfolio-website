import type { MetadataRoute } from 'next';
import { seoData } from '@/content/data/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seoData.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
