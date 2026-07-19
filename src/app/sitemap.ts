import { MetadataRoute } from 'next';
import { getPostSlugs } from '@/lib/blog';

const SITE_URL = 'https://pdr-ua.pp.ua';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  const slugs = getPostSlugs();
  slugs.forEach((slug) => {
    const realSlug = slug.replace(/\.md$/, '');
    sitemapData.push({
      url: `${SITE_URL}/${realSlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  return sitemapData;
}
