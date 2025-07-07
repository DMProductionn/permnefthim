'use client';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section id="about">
      <div className="flex flex-wrap justify-between items-center mb-[30px] sm:mb-[70px]">
        <div>
          <p className="text-[32px] sm:text-[50px] leading-[130%]">
            Промышленная химия <br /> для вашего производства
          </p>
          <motion.p
            className="text-[18px] sm:text-[30px] text-blue leading-[44px] flex flex-row gap-2"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}>
            Поставляем кислоты, щелочи и реагенты оптом
          </motion.p>
        </div>
      </div>
      <motion.p
        className="text-[16px] sm:text-[20px] font-[500] mb-[70px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}>
        ООО «ПЕРМНЕФТЕХИМ» – надежный поставщик химической продукции. Мы предлагаем полный спектр
        промышленных химикатов для предприятий нефтегазовой отрасли, металлургии, строительства и
        других сфер производства.
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
        Полный ассортимент и технические характеристики уточняйте у менеджеров +7 (902) 475-57-74{' '}
        <br />
        или pnh.perm@yandex.ru
      </motion.p>

      <div className="flex flex-wrap justify-between gap-[25px] sm:gap-[80px] items-end">
        <p className="text-[20px] sm:text-[30px] font-[700] sm:leading-[36px]">
          Остались вопросы? <br /> Свяжитесь с нами!
        </p>
        <Button onClick={handleRequestClick} color="blue">
          Оставить заявку
        </Button>
      </div>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} buttonColor="blue" />
    </section>
  );
};
