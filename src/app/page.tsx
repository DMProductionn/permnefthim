'use client';

import { Button } from '@/shared/ui/Button';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/SEOHead';
import { defaultSEO } from '@/shared/utils/seo';

export default function Home() {
  return (
    <>
      <SEOHead seo={defaultSEO} />
      <main className="flex min-h-screen">
        <div
          className="w-1/2 h-screen bg-cover bg-center flex flex-col justify-center pl-[45px]"
          style={{ backgroundImage: "url('/crovlya_main.png')" }}>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[50px] text-white font-[500] max-w-[520px] w-full leading-[120%]">
            Официальный дилер «Славная кровля»
            <br /> в Пермском крае
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-[500] text-[25px] text-white max-w-[500px] w-full mt-[40px]">
            Надежные кровельные материалы с гарантией до 20 лет
          </motion.h2>
          <Button href="/crovlya" className="mt-[90px]">
            Перейти к каталогу
          </Button>
        </div>
        <div
          className="w-1/2 h-screen bg-cover bg-center flex flex-col justify-center pl-[45px]"
          style={{ backgroundImage: "url('/him_main.png')" }}>
          <motion.h1
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[50px] text-white font-[500] max-w-[520px] w-full leading-[120%]">
            Поставка промышленной химии
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-[500] text-[25px] text-white max-w-[300px] w-full mt-[40px]">
            Кислоты, щелочи, реагенты для скважин
          </motion.h2>
          <Button color="blue" href="/him" className="mt-[90px]">
            Перейти к каталогу
          </Button>
        </div>
      </main>
    </>
  );
}
