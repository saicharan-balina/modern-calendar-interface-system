'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMonthName } from '@/utils/dateUtils';

interface HeroImageProps {
  year: number;
  month: number;
  src: string;
  alt: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ year, month, src, alt }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none aspect-[2/1] lg:aspect-auto lg:h-full min-h-[220px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Background image */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="eager"
          />

          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <svg
            className="absolute bottom-0 right-0 w-2/3 h-1/2"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
          >
            <polygon
              points="150,200 400,80 400,200"
              fill="rgba(14, 165, 233, 0.85)"
            />
            <polygon
              points="200,200 400,120 400,200"
              fill="rgba(14, 165, 233, 0.5)"
            />
          </svg>

          <div className="absolute bottom-4 right-5 text-right z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <span className="block text-lg font-light text-white/90 tracking-wider">
                {year}
              </span>
              <span className="block text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight leading-none">
                {getMonthName(month)}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroImage;
