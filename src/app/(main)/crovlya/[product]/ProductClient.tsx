'use client';

// import Image from 'next/image';
import { Button } from '@/shared/ui/Button';
import { Modal } from '../../../../shared/ui/Modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProduct } from '@/components/crovlya/products/ProductContext';

export function ProductClient() {
  const { product } = useProduct();
  const [activeTab, setActiveTab] = useState<'description' | 'details'>('description');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <>
      <button className="flex items-center gap-[15px] font-[700]" onClick={() => router.back()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="8"
          viewBox="0 0 35 8"
          fill="none">
          <path
            d="M0.646446 3.64645C0.451183 3.84171 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM35 4V3.5L1 3.5V4V4.5L35 4.5V4Z"
            fill="black"
          />
        </svg>
        Назад
      </button>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
          {/* Изображение товара */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-[400px] lg:w-[400px]">
              <img
                width={400}
                height={400}
                src={product.image_main}
                alt={product.title}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="space-y-4 lg:space-y-6 w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>
            <Button onClick={() => setIsModalOpen(true)} className="w-full">
              Заказать
            </Button>

            <div className="space-y-4">
              <div className="text-gray-600 w-full">
                <p className="text-base sm:text-lg leading-relaxed">{product.desc}</p>
                <p className="text-base sm:text-lg leading-relaxed mt-4 sm:mt-[30px]">
                  {product.two_desc}
                </p>
              </div>
            </div>

            <div className="border border-black rounded-[8px] p-4 sm:p-[20px] mt-6 sm:mt-[40px]">
              <div className="flex gap-4 sm:gap-[30px] border-b border-black pb-2 sm:pb-[10px]">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`transition-colors text-sm sm:text-base ${
                    activeTab === 'description'
                      ? 'font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}>
                  Описание
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`transition-colors text-sm sm:text-base ${
                    activeTab === 'details' ? 'font-semibold' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                  Детали
                </button>
              </div>
              <div className="mt-4 sm:mt-[20px] min-h-[120px] sm:min-h-[150px]">
                {activeTab === 'description' && (
                  <p className="text-sm sm:text-base">
                    Лист кровельный полимерный имеет текстурированную матовую внешнюю и внутреннюю
                    поверхность, семь продольных волн и 6 поперечных гребней (сегментов), которые
                    повышают прочность материала и имитируют фактуру черепицы. Толщина от 3 мм.
                  </p>
                )}
                {activeTab === 'details' && (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col gap-3 sm:gap-[20px]">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[40px]">
                        <p className="font-semibold text-gray-700 text-sm sm:text-base min-w-[80px] sm:min-w-[120px]">
                          Вес:
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">8 кг</p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[40px]">
                        <p className="font-semibold text-gray-700 text-sm sm:text-base min-w-[80px] sm:min-w-[120px]">
                          Габариты:
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">220 x 105 x 0,5 см</p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[40px]">
                        <p className="font-semibold text-gray-700 text-sm sm:text-base min-w-[80px] sm:min-w-[120px]">
                          Цвет изделия:
                        </p>
                        <p className="text-gray-600 text-sm sm:text-base">{product.color}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productTitle={product.title}
        />
      </div>
    </>
  );
}
