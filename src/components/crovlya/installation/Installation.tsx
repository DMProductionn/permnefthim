'use client';

import { motion } from 'framer-motion';

export const Installation: React.FC = () => {
  return (
    <section id="scheme">
      <h4 className="text-[32px] sm:text-[50px] font-[700] text-center mb-[40px]">Схема монтажа</h4>
      <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-[60px]">
        <div className="w-full sm:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'tween' }}
            viewport={{ once: true }}>
            <img
              width={590}
              height={390}
              src="/схема-1.png"
              alt="scheme"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
        <div className="w-full sm:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'tween' }}
            viewport={{ once: true }}>
            <img
              width={565}
              height={575}
              src="/схема-2.png"
              alt="scheme"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
