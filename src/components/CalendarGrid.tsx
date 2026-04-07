'use client';

import React from 'react';
import { DateRange } from '@/types/calendar';
import { buildCalendarDays, DAY_LABELS } from '@/utils/dateUtils';
import DayCell from './DayCell';

interface CalendarGridProps {
  year: number;
  month: number;
  selectedRange: DateRange;
  hoveredDate: Date | null;
  selectionStep: 0 | 1 | 2;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  selectedRange,
  hoveredDate,
  selectionStep,
  onDateClick,
  onDateHover,
}) => {
  const days = buildCalendarDays(year, month);

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((label, i) => {
          const isWeekendCol = i >= 5; // Sat, Sun
          return (
            <div
              key={label}
              className={`text-center text-xs font-bold uppercase tracking-wider py-2 ${
                isWeekendCol
                  ? 'text-sky-500 dark:text-sky-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map((date, i) =>
          date ? (
            <DayCell
              key={date.toISOString()}
              date={date}
              selectedRange={selectedRange}
              hoveredDate={hoveredDate}
              selectionStep={selectionStep}
              onClick={onDateClick}
              onHover={onDateHover}
            />
          ) : (
            <div key={`empty-${i}`} className="h-10" />
          )
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;
