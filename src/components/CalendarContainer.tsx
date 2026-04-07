'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalendar } from '@/hooks/useCalendar';
import { getMonthData } from '@/utils/dateUtils';
import HeroImage from './HeroImage';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import { ThemeMode } from '@/types/calendar';

const flipVariants = {
  enter: (d: number) => ({
    y: d > 0 ? 40 : -40,
    rotateX: d > 0 ? -15 : 15,
    opacity: 0,
    scale: 0.97,
    transformOrigin: "top center"
  }),
  center: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    scale: 1,
    transformOrigin: "top center"
  },
  exit: (d: number) => ({
    y: d > 0 ? -40 : 40,
    rotateX: d > 0 ? 15 : -15,
    opacity: 0,
    scale: 0.97,
    transformOrigin: "top center"
  })
};

const CalendarContainer: React.FC = () => {
  const {
    currentYear,
    currentMonth,
    selectedRange,
    hoveredDate,
    selectionStep,
    direction,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    handleDateClick,
    handleDateHover,
    clearSelection,
  } = useCalendar();

  const monthData = getMonthData(currentYear, currentMonth);

  // Dark mode
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    // Persist theme preference
    const stored = localStorage.getItem('calendar-theme') as ThemeMode | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('calendar-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // Selection summary text
  let selectionLabel = '';
  if (selectedRange.start && selectedRange.end) {
    const fmt = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    selectionLabel = `${fmt(selectedRange.start)} — ${fmt(selectedRange.end)}`;
  } else if (selectedRange.start) {
    selectionLabel = `Select end date…`;
  }

  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        '--theme-h': monthData.themeHue,
        '--theme-s': monthData.themeSat,
      } as React.CSSProperties}
    >
      <div className="relative z-20 flex justify-center gap-[6px] -mb-3 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-6 rounded-full bg-gradient-to-b from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm"
          />
        ))}
      </div>

      <div 
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-gray-400/30 dark:shadow-black/50 border border-gray-100 dark:border-gray-800"
        style={{ perspective: 1200 }}
      >
        {/* Dark mode / theme toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-4 left-4 z-40 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 group"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-600 group-hover:text-primary-500 transition-colors">
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          )}
        </button>

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={`${currentYear}-${currentMonth}`}
            custom={direction}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, type: 'spring', bounce: 0, stiffness: 200, damping: 25 }}
            className="flex flex-col lg:flex-row w-full bg-white dark:bg-gray-900 overflow-hidden rounded-2xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Left: Hero Image */}
            <div className="lg:w-[45%] lg:min-h-[520px]">
              <HeroImage
                year={currentYear}
                month={currentMonth}
                src={monthData.heroImage}
                alt={monthData.heroAlt}
              />
            </div>

            {/* Right: Calendar + Notes */}
            <div className="flex-1 p-5 md:p-7 lg:p-8 flex flex-col relative z-30">
              <CalendarHeader
                year={currentYear}
                month={currentMonth}
                onPrev={goToPrevMonth}
                onNext={goToNextMonth}
                onToday={goToToday}
              />

              {selectionLabel && (
                <motion.div
                  className="flex items-center justify-between mb-3 px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xs font-medium text-primary-700 dark:text-primary-300">
                    {selectionLabel}
                  </span>
                  {selectionStep === 2 && (
                    <button
                      onClick={clearSelection}
                      className="text-[10px] font-semibold text-primary-500 hover:text-primary-700 dark:hover:text-primary-300 uppercase tracking-wider transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </motion.div>
              )}

              <CalendarGrid
                year={currentYear}
                month={currentMonth}
                selectedRange={selectedRange}
                hoveredDate={hoveredDate}
                selectionStep={selectionStep}
                onDateClick={handleDateClick}
                onDateHover={handleDateHover}
              />

              <NotesPanel
                year={currentYear}
                month={currentMonth}
                selectedRange={selectedRange}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom accent strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-blue-600 rounded-b-2xl z-50 pointer-events-none" />
      </div>

      <div className="flex justify-center -mt-[1px]">
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-gray-200 dark:border-t-gray-700 opacity-50" />
      </div>
    </motion.div>
  );
};

export default CalendarContainer;
