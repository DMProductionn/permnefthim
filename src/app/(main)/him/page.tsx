import { AboutProducts } from '@/components/him/about_products/AboutProducts';
import { Contacts } from '@/components/him/contacts/Contacts';
import { HimMain } from '@/components/him/Main/HimMain';
import { Products } from '@/components/him/products/Products';
import { SEOHead } from '@/components/SEOHead';
import { himSEO } from '@/shared/utils/seo';

export default function Him() {
  return (
    <>
      <SEOHead seo={himSEO} />
      <HimMain />
      <AboutProducts />
      <Products />
      <Contacts />
    </>
  );
}
