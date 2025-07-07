'use client';

import Image from 'next/image';
import { DATA } from './data';
import { Button } from '@/shared/ui/Button';
import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';

export const Products: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleOrderClick = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setIsModalOpen(true);
  };

  return (
    <section id="catalog">
      <h3 className="font-[700] text-[32px] sm:text-[50px] text-center mb-[40px]">Каталог</h3>
      <div className="flex flex-wrap gap-[20px] gap-y-[40px] justify-center xl:justify-between">
        {DATA.map((product) => (
          <div
            className="rounded-[20px] border border-[#B5B5B5] p-[20px] max-w-[385px] w-full min-h-[500px] flex flex-col justify-between"
            key={product.title}>
            <div>
              <div className="w-[345px] h-[340px]">
                <Image width={345} height={185} src={product.image} alt="product" />
              </div>
              <p className="text-[20px] font-[700] mb-[10px] leading-[30px]">{product.title}</p>
              <p className="text-[14px]">
                {product.desc.split(', ').map((phrase, index) => (
                  <span key={index}>
                    - {phrase}
                    {index < product.desc.split(', ').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex gap-[20px] items-center mt-[15px]">
              <Button onClick={() => handleOrderClick(product.title)} color="blue">
                Заказать
              </Button>
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
