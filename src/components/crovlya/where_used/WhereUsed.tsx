'use client';

import { DATA } from './data';
import { motion } from 'framer-motion';

const directions = [
  { x: -100, y: 0 },
  { x: 0, y: -100 },
  { x: 100, y: 0 },
  { x: 0, y: 100 },
];

export const WhereUsed: React.FC = () => {
  return (
    <section id="usage">
      <h2 className="text-[32px] sm:text-[50px] font-[700] text-center mb-[40px]">
        Где применяют композитпласт?
      </h2>
      <div className="flex flex-wrap gap-[60px] justify-center overflow-hidden">
        {DATA.map((item, idx) => {
          const dir = directions[idx % directions.length];
          return (
            <motion.div
              key={item.title}
              className="overflow-hidden rounded-[20px]"
              initial={{
                opacity: 0,
                x: 0,
                y: 50,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, type: 'tween' }}
              viewport={{ once: true }}>
              <img src={item.image} alt={item.title} />
              <div className="bg-red rounded-b-[20px] min-h-[100px] flex items-center justify-center">
                <p className="font-[700] text-white leading-[36px] text-[20px] sm:text-[24px] text-center">
                  {item.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
