export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface MonthData {
  month: number;
  year: number;
  heroImage: string;
  heroAlt: string;
  themeHue: string;
  themeSat: string;
}

export interface CalendarNote {
  id: string;
  monthKey: string; // "2026-3" format (year-month)
  content: string;
  dateRange?: DateRange;
  updatedAt: number;
}

export type DayCellState =
  | 'default'
  | 'start'
  | 'end'
  | 'in-range'
  | 'hover-preview'
  | 'today'
  | 'weekend'
  | 'holiday'
  | 'disabled';

export interface Holiday {
  month: number;
  day: number;
  name: string;
}

export type ThemeMode = 'light' | 'dark';
