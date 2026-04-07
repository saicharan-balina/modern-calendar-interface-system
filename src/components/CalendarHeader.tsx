'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMonthName } from '@/utils/dateUtils';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onPrev,
  onNext,
  onToday,
}) => {
  return (
    <div className="flex items-center justify-between px-1 mb-4">
      {/* Prev button */}
      <motion.button
        type="button"
        onClick={onPrev}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous month"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-gray-600 dark:text-gray-300"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>

      {/* Month + Year */}
      <div className="flex items-center gap-3">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`${year}-${month}`}
            className="text-xl font-bold tracking-tight text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sky-500">{year}</span>{' '}
            <span className="uppercase">{getMonthName(month)}</span>
          </motion.h2>
        </AnimatePresence>
        <motion.button
          type="button"
          onClick={onToday}
          className="text-[10px] font-semibold uppercase tracking-wider bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-full hover:bg-sky-100 dark:hover:bg-sky-800/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Go to today"
        >
          Today
        </motion.button>
      </div>

      {/* Next button */}
      <motion.button
        type="button"
        onClick={onNext}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next month"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-gray-600 dark:text-gray-300"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default CalendarHeader;
