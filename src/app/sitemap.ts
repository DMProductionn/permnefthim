import { MetadataRoute } from 'next';
import { DATA as crovlyaData } from '@/components/crovlya/products/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pnhperm.ru';

  // Основные страницы
  const pages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/crovlya`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/him`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Страницы продуктов кровли
  const crovlyaProducts = crovlyaData.map((product) => ({
    url: `${baseUrl}/crovlya/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...pages, ...crovlyaProducts];
}
