'use client';

import Image from 'next/image';
import { DATA } from './data';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';

export const Products: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleProductClick = (productTitle: string) => {
    const productSlug = productTitle.toLowerCase().replace(/\s+/g, '-');
    router.push(`/crovlya/${productSlug}`);
  };

  const handleOrderClick = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setIsModalOpen(true);
  };

  return (
    <section id="catalog">
      <h3 className="font-[700] text-[32px] sm:text-[50px] text-center mb-[40px]">
        Варианты цветового решения
      </h3>
      <div className="flex flex-wrap gap-[20px] gap-y-[40px] justify-center xl:justify-between">
        {DATA.map((product) => (
          <div
            className="rounded-[20px] border border-[#B5B5B5] p-[20px] max-w-[385px] w-full min-h-[650px] flex flex-col justify-between"
            key={product.title}>
            <div>
              <Image
                className="mb-[50px]"
                width={345}
                height={185}
                src={product.image}
                alt="product"
              />
              <p className="text-[20px] font-[700] mb-[10px] leading-[30px]">{product.title}</p>
              <p className="text-[14px]">{product.desc}</p>
            </div>
            <div className="flex gap-[20px] items-center">
              <button
                onClick={() => handleOrderClick(product.title)}
                className="w-1/2 h-[50px] rounded-[10px] transition-colors duration-300 bg-red hover:bg-[#9F2E26] text-white font-semibold">
                Заказать
              </button>
              <button
                onClick={() => handleProductClick(product.title)}
                className="w-1/2 h-[50px] rounded-[10px] transition-colors duration-300 border border-red text-red hover:text-white hover:bg-[#9F2E26] font-semibold bg-transparent">
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productTitle={selectedProduct}
      />
    </section>
  );
};
