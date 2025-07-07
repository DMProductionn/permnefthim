import Head from 'next/head';
import { SEOData } from '../shared/utils/seo';

interface SEOHeadProps {
  seo: SEOData;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ seo }) => {
  return (
    <Head>
      {/* Основные мета-теги */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}

      {/* Canonical URL */}
      {seo.canonical && <link rel="canonical" href={seo.canonical} />}

      {/* Open Graph теги */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.ogTitle || seo.title} />
      <meta property="og:description" content={seo.ogDescription || seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:url" content={seo.ogUrl} />
      <meta property="og:site_name" content="ПЕРМНЕФТЕХИМ" />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter Card теги */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle || seo.title} />
      <meta name="twitter:description" content={seo.ogDescription || seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />

      {/* Дополнительные мета-теги */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="ООО ПЕРМНЕФТЕХИМ" />
      <meta name="geo.region" content="RU-PER" />
      <meta name="geo.placename" content="Пермь" />

      {/* Структурированные данные */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ООО ПЕРМНЕФТЕХИМ',
            url: 'https://permneftekhim.ru',
            logo: 'https://permneftekhim.ru/Crovlya.png',
            description: 'Поставщик кровельных материалов и химических реагентов в Перми',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Пермь',
              addressRegion: 'Пермский край',
              addressCountry: 'RU',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+7-902-475-5774',
              contactType: 'customer service',
              email: 'pnh.perm@yandex.ru',
            },
            sameAs: ['https://t.me/your_channel'],
          }),
        }}
      />
    </Head>
  );
};
