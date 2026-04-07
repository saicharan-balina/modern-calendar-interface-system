'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DateRange } from '@/types/calendar';
import { monthKey, isSameDay } from '@/utils/dateUtils';

interface NotesPanelProps {
  year: number;
  month: number;
  selectedRange: DateRange;
}

const NotesPanel: React.FC<NotesPanelProps> = ({ year, month, selectedRange }) => {
  const mk = monthKey(year, month);

  const rangeKey = selectedRange.start && selectedRange.end
    ? `${mk}_${selectedRange.start.getDate()}-${selectedRange.end.getDate()}`
    : null;

  const hasRange = !!(selectedRange.start && selectedRange.end);
  const isSingleDay = hasRange && isSameDay(selectedRange.start!, selectedRange.end!);

  const activeKey = rangeKey ?? mk;
  const storageKey = `calendar-notes-${activeKey}`;

  const [savedNotes, setSavedNotes] = useLocalStorage<string>(storageKey, '');
  const [draft, setDraft] = useState(savedNotes);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDraft(savedNotes);
  }, [storageKey, savedNotes]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setDraft(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setSavedNotes(value);
      }, 500);
    },
    [setSavedNotes]
  );

  let label = 'Monthly Notes';
  if (hasRange && selectedRange.start && selectedRange.end) {
    if (isSingleDay) {
      label = `Note for ${selectedRange.start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })}`;
    } else {
      label = `Notes: ${selectedRange.start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} – ${selectedRange.end.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })}`;
    }
  }

  const placeholder = hasRange
    ? 'Write your notes for this date range...'
    : 'Write your notes for this month...';

  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Section title */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {label}
        </h3>
        {draft !== savedNotes && (
          <span className="text-[9px] text-amber-500 font-medium">Saving...</span>
        )}
      </div>

      {/* Lined textarea */}
      <div className="relative">
        <textarea
          value={draft}
          onChange={handleChange}
          placeholder={placeholder}
          rows={5}
          className="w-full resize-none rounded-lg border border-gray-200 dark:border-gray-600 
            bg-white dark:bg-gray-800 px-4 text-sm text-gray-700 dark:text-gray-200
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400
            transition-all duration-200 leading-[28px] pt-2 pb-2"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)',
            backgroundPosition: '0 8px',
            backgroundAttachment: 'local',
          }}
          aria-label={label}
        />
        {/* Left margin line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-rose-200/50 dark:bg-rose-500/20 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default NotesPanel;
