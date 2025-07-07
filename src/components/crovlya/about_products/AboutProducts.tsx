'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ABOUT_DATA } from './about.data';
import { Button } from '@/shared/ui/Button';
import { useState } from 'react';
import { SimpleModal } from '@/shared/ui/SimpleModal';

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 }, once: true },
};

const iconsContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const iconItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const AboutProducts: React.FC = () => {
  const items = ['Качество.', 'Защита.', 'Эстетика.'];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section id="about">
      <div className="flex flex-wrap justify-between items-center mb-[30px] sm:mb-[70px]">
        <div>
          <p className="text-[32px] sm:text-[50px]">Славная кровля </p>
          <motion.p
            className="text-[18px] sm:text-[30px] text-red leading-[44px] flex flex-row gap-2"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}>
            {items.map((text) => (
              <motion.span key={text} variants={itemVariants}>
                {text}
              </motion.span>
            ))}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}>
          <Image
            className="hidden xl:block"
            width={545}
            height={250}
            src="/crovlya_product.png"
            alt="img"
          />
        </motion.div>
      </div>
      <motion.p
        className="text-[16px] sm:text-[20px] font-[500] mb-[70px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}>
        Продукция бренда «Славная кровля» — это надёжные кровельные материалы, созданные с учётом
        российских климатических условий. Мы предлагаем эстетичное решение, сочетающее
        долговечность,лёгкость монтажа и доступную цену.
      </motion.p>

      <motion.div
        className="rounded-[20px] mb-[70px] border border-[#B5B5B5] flex flex-wrap gap-[25px] items-center justify-center md:justify-between p-[40px] px-[60px]"
        initial="hidden"
        whileInView="visible"
        variants={iconsContainerVariants}
        viewport={{ once: true }}>
        {ABOUT_DATA.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col gap-[20px] sm:gap-[30px] items-center max-w-[190px] w-full h-[250px]"
            variants={iconItemVariants}>
            <div className="bg-[#F0F0F0] w-[150px] h-[160px] rounded-[20px] flex justify-center items-center">
              {item.icon}
            </div>
            <p className="text-[20px] font-[700] text-center">{item.title}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="text-[16px] sm:text-[20px] font-[500] mb-[70px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}>
        Продукция сертифицирована и соответствует российским стандартам качества. <br />{' '}
        Производство сопровождается многоступенчатым контролем.
      </motion.p>

      <div className="flex flex-wrap justify-between gap-[25px] sm:gap-[80px] items-end">
        <p className="text-[20px] sm:text-[30px] font-[700] sm:leading-[36px]">
          Остались вопросы? <br /> Свяжитесь с нами!
        </p>
        <Button onClick={handleRequestClick}>Оставить заявку</Button>
      </div>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
