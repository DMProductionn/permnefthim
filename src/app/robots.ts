import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/personal-data', '/privacy-policy', '/user-agreement'],
    },
    sitemap: 'https://permneftekhim.ru/sitemap.xml',
  };
}
