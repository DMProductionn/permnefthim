'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button';
import { useState } from 'react';
import { SimpleModal } from '@/shared/ui/SimpleModal';

export const CrovlyaMain: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section
      id="main"
      className="flex flex-col gap-[20px] justify-center xl:flex-row xl:justify-between items-center">
      <div className="order-[2] xl:order-[1]">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[32px] sm:text-[50px] font-[500] max-w-[520px] w-full leading-[120%]">
          Официальный дилер «Славная кровля»
          <br /> в Пермском крае
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-[500] text-[18px] sm:text-[25px] max-w-[500px] w-full mt-[40px]">
          Надежные кровельные материалы с гарантией до 20 лет
        </motion.p>
        <Button onClick={handleRequestClick} className="mt-[50px] sm:mt-[90px]">
          Оставить заявку
        </Button>
      </div>
      <motion.div
        className="order-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <Image src="/Crovlya.png" alt="img" width={550} height={600} />
      </motion.div>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
