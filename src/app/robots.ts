import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/personal-data', '/privacy-policy', '/user-agreement', '/processing_policy'],
    },
    sitemap: 'https://pnhperm.ru/sitemap.xml',
  };
}
