export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

export const defaultSEO: SEOData = {
  title: 'ПЕРМНЕФТЕХИМ - Кровельные материалы и химические реагенты в Перми',
  description:
    'ООО ПЕРМНЕФТЕХИМ - поставщик качественных кровельных материалов и химических реагентов в Перми. Широкий ассортимент, доставка, консультации специалистов.',
  keywords:
    'кровельные материалы, химические реагенты, Пермь, ПЕРМНЕФТЕХИМ, кровля, химия, строительные материалы',
  ogImage: '/Crovlya.png',
  ogUrl: 'https://permneftekhim.ru',
};

export const crovlyaSEO: SEOData = {
  title: 'Кровельные материалы в Перми - ПЕРМНЕФТЕХИМ',
  description:
    'Качественные кровельные материалы в Перми от ООО ПЕРМНЕФТЕХИМ. Широкий выбор цветов, профессиональная консультация, доставка по Перми и области.',
  keywords:
    'кровельные материалы Пермь, кровля, металлочерепица, профнастил, кровельные листы, строительные материалы Пермь',
  ogTitle: 'Кровельные материалы в Перми - ПЕРМНЕФТЕХИМ',
  ogDescription:
    'Качественные кровельные материалы в Перми. Широкий выбор цветов, профессиональная консультация.',
  ogImage: '/crovlya_main.png',
  ogUrl: 'https://permneftekhim.ru/crovlya',
  canonical: 'https://permneftekhim.ru/crovlya',
};

export const himSEO: SEOData = {
  title: 'Химические реагенты в Перми - ПЕРМНЕФТЕХИМ',
  description:
    'Химические реагенты и реактивы в Перми от ООО ПЕРМНЕФТЕХИМ. Качественные химические вещества для промышленности и лабораторий.',
  keywords:
    'химические реагенты Пермь, реактивы, химические вещества, лабораторная химия, промышленная химия',
  ogTitle: 'Химические реагенты в Перми - ПЕРМНЕФТЕХИМ',
  ogDescription:
    'Химические реагенты и реактивы в Перми. Качественные химические вещества для промышленности.',
  ogImage: '/him_main.png',
  ogUrl: 'https://permneftekhim.ru/him',
  canonical: 'https://permneftekhim.ru/him',
};

export const getProductSEO = (productName: string, category: 'crovlya' | 'him'): SEOData => {
  const baseUrl = 'https://permneftekhim.ru';
  const categoryPath = category === 'crovlya' ? '/crovlya' : '/him';

  return {
    title: `${productName} - ${
      category === 'crovlya' ? 'Кровельные материалы' : 'Химические реагенты'
    } в Перми | ПЕРМНЕФТЕХИМ`,
    description: `Купить ${productName.toLowerCase()} в Перми от ООО ПЕРМНЕФТЕХИМ. Качественные ${
      category === 'crovlya' ? 'кровельные материалы' : 'химические реагенты'
    }, доставка, консультации специалистов.`,
    keywords: `${productName}, ${
      category === 'crovlya' ? 'кровельные материалы' : 'химические реагенты'
    }, Пермь, ПЕРМНЕФТЕХИМ`,
    ogTitle: `${productName} - ${
      category === 'crovlya' ? 'Кровельные материалы' : 'Химические реагенты'
    } в Перми`,
    ogDescription: `Купить ${productName.toLowerCase()} в Перми. Качественные ${
      category === 'crovlya' ? 'кровельные материалы' : 'химические реагенты'
    }.`,
    ogImage: category === 'crovlya' ? '/crovlya_product.png' : '/him_main.png',
    ogUrl: `${baseUrl}${categoryPath}/${encodeURIComponent(productName)}`,
    canonical: `${baseUrl}${categoryPath}/${encodeURIComponent(productName)}`,
  };
};
