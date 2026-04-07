'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { DateRange } from '@/types/calendar';
import {
  isSameDay,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isInHoverRange,
  isWeekend,
  isToday,
  getHoliday,
} from '@/utils/dateUtils';

interface DayCellProps {
  date: Date;
  selectedRange: DateRange;
  hoveredDate: Date | null;
  selectionStep: 0 | 1 | 2;
  onClick: (date: Date) => void;
  onHover: (date: Date | null) => void;
}

const DayCell: React.FC<DayCellProps> = memo(function DayCell({
  date,
  selectedRange,
  hoveredDate,
  selectionStep,
  onClick,
  onHover,
}) {
  const day = date.getDate();
  const weekend = isWeekend(date);
  const today = isToday(date);
  const holiday = getHoliday(date);
  const isStart = isRangeStart(date, selectedRange);
  const isEnd = isRangeEnd(date, selectedRange);
  const inRange = isInRange(date, selectedRange);
  const inHover =
    selectionStep === 1 && isInHoverRange(date, selectedRange.start, hoveredDate);
  const isHoveredEnd =
    selectionStep === 1 && hoveredDate && isSameDay(date, hoveredDate);

  let cellClasses =
    'relative flex items-center justify-center h-10 w-full cursor-pointer select-none text-sm font-medium transition-all duration-200 rounded-md ';

  if (isStart || isEnd) {
    cellClasses += 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 z-10 ';
  } else if (inRange) {
    cellClasses += 'bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200 ';
  } else if (inHover) {
    cellClasses += 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 ';
  } else if (isHoveredEnd) {
    cellClasses +=
      'bg-primary-200 dark:bg-primary-800/50 text-primary-800 dark:text-primary-200 ring-2 ring-primary-400 ring-inset ';
  } else if (today) {
    cellClasses +=
      'ring-2 ring-primary-400 ring-inset text-primary-600 dark:text-primary-400 font-bold ';
  } else if (weekend || holiday) {
    cellClasses += 'text-primary-500 dark:text-primary-400 ';
  } else {
    cellClasses +=
      'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 ';
  }

  return (
    <motion.button
      type="button"
      className={cellClasses}
      onClick={() => onClick(date)}
      onMouseEnter={() => onHover(date)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`${date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}${holiday ? ` — ${holiday.name}` : ''}${isStart ? ' (start of selection)' : ''}${isEnd ? ' (end of selection)' : ''}`}
      tabIndex={0}
      title={holiday ? holiday.name : undefined}
    >
      {day}
      {today && !isStart && !isEnd && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
      )}
      {holiday && !today && !isStart && !isEnd && (
        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-rose-400" />
      )}
    </motion.button>
  );
});

export default DayCell;
