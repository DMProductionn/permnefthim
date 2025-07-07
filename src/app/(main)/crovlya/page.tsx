import { AboutProducts } from '@/components/crovlya/about_products/AboutProducts';
import { Contacts } from '@/components/crovlya/contacts/Contacts';
import { Installation } from '@/components/crovlya/installation/Installation';
import { CrovlyaMain } from '@/components/crovlya/Main/CrovlyaMain';
import { Products } from '@/components/crovlya/products/Products';
import { WhereUsed } from '@/components/crovlya/where_used/WhereUsed';
import { SEOHead } from '@/components/SEOHead';
import { crovlyaSEO } from '@/shared/utils/seo';

export default function Crovlya() {
  return (
    <>
      <SEOHead seo={crovlyaSEO} />
      <CrovlyaMain />
      <AboutProducts />
      <WhereUsed />
      <Products />
      <Installation />
      <Contacts />
    </>
  );
}
