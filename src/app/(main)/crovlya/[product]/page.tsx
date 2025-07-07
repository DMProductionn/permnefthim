import { ProductProvider } from '@/components/crovlya/products/ProductContext';
import { ProductClient } from './ProductClient';
import { DATA } from '@/components/crovlya/products/data';

export function generateStaticParams() {
  return DATA.map((product) => ({ product: product.slug }));
}

export default function Page({ params }: { params: { product: string } }) {
  return (
    <ProductProvider initialProductTitle={params.product}>
      <ProductClient />
    </ProductProvider>
  );
}
