import { ProductProvider } from '@/components/crovlya/products/ProductContext';
import { ProductClient } from './ProductClient';

export default function Page({ params }: { params: { product: string } }) {
  return (
    <ProductProvider initialProductTitle={params.product}>
      <ProductClient />
    </ProductProvider>
  );
}
