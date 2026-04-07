'use client';

import { useState, useCallback } from 'react';
import { DateRange } from '@/types/calendar';
import { normaliseRange } from '@/utils/dateUtils';

export function useCalendar(initialYear?: number, initialMonth?: number) {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(initialYear ?? now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialMonth ?? now.getMonth());

  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [selectionStep, setSelectionStep] = useState<0 | 1 | 2>(0);

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [direction, setDirection] = useState<number>(0);

  const goToPrevMonth = useCallback(() => {
    setDirection(-1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }, [currentMonth]);

  const goToNextMonth = useCallback(() => {
    setDirection(1);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      if (selectionStep === 0 || selectionStep === 2) {
        // Start fresh selection
        setSelectedRange({ start: date, end: null });
        setSelectionStep(1);
        setHoveredDate(null);
      } else if (selectionStep === 1) {
        // Complete the range
        const raw: DateRange = { start: selectedRange.start, end: date };
        setSelectedRange(normaliseRange(raw));
        setSelectionStep(2);
        setHoveredDate(null);
      }
    },
    [selectionStep, selectedRange.start]
  );

  const clearSelection = useCallback(() => {
    setSelectedRange({ start: null, end: null });
    setSelectionStep(0);
    setHoveredDate(null);
  }, []);

  const handleDateHover = useCallback(
    (date: Date | null) => {
      if (selectionStep === 1) {
        setHoveredDate(date);
      }
    },
    [selectionStep]
  );

  return {
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
  };
}
