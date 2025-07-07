'use client';

import { DATA } from './data';
import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DATA.map((product) => (
          <div
            key={product.title}
            className="bg-white rounded-[20px] border border-[#B5B5B5] p-6 flex flex-col items-center justify-between">
            <img width={345} height={185} src={product.image} alt="product" />
            <p className="text-[20px] font-[700] mb-[10px] leading-[30px]">{product.title}</p>
            <p className="text-[14px]">
              {product.desc.split(', ').map((phrase, index) => (
                <span key={index}>
                  - {phrase}
                  {index < product.desc.split(', ').length - 1 && <br />}
                </span>
              ))}
            </p>
            <Button className='mt-[20px]' onClick={() => handleOrderClick(product.title)} color="blue">
              Заказать
            </Button>
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
