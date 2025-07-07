'use client';

import { Button } from '@/shared/ui/Button';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/SEOHead';
import { defaultSEO } from '@/shared/utils/seo';

export default function Home() {
  return (
    <>
      <SEOHead seo={defaultSEO} />
      <main className="flex min-h-screen flex-col md:flex-row">
        <div
          className="w-full lg:w-1/2 flex-1 bg-cover bg-center flex flex-col justify-center px-4 md:px-8 lg:px-[45px] py-4 md:py-8 lg:py-0"
          style={{ backgroundImage: "url('/crovlya_main_10_11zon.webp')" }}>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[50px] text-white font-[500] max-w-full lg:max-w-[520px] w-full leading-[120%] text-left">
            Официальный дилер «Славная кровля»
            <br /> в Пермском крае
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-[500] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[25px] text-white max-w-full lg:max-w-[500px] w-full mt-[12px] md:mt-[28px] lg:mt-[40px] text-left">
            Надежные кровельные материалы с гарантией до 20 лет
          </motion.h2>
          <Button
            href="/crovlya"
            className="mt-[16px] md:mt-[40px] lg:mt-[90px] w-full max-w-[250px] h-[56px] py-3 text-[16px] flex items-center justify-center leading-none">
            Перейти к каталогу
          </Button>
        </div>
        <div
          className="w-full lg:w-1/2 flex-1 bg-cover bg-center flex flex-col justify-center px-4 md:px-8 lg:px-[45px] py-4 md:py-8 lg:py-0"
          style={{ backgroundImage: "url('/him_main_1_11zon.webp')" }}>
          <motion.h1
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[50px] text-white font-[500] max-w-full lg:max-w-[520px] w-full leading-[120%] text-left">
            Поставка промышленной химии
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-[500] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[25px] text-white max-w-full lg:max-w-[300px] w-full mt-[12px] md:mt-[28px] lg:mt-[40px] text-left">
            Кислоты, щелочи, реагенты для скважин
          </motion.h2>
          <Button
            color="blue"
            href="/him"
            className="mt-[16px] md:mt-[40px] lg:mt-[90px] w-full max-w-[250px] h-[56px] py-3 text-[16px] flex items-center justify-center leading-none">
            Перейти к каталогу
          </Button>
        </div>
      </main>
    </>
  );
}
