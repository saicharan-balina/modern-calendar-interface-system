import { DateRange, Holiday, MonthData } from '@/types/calendar';

// ─── Month Names ──────────────────────────────────────────────
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ─── Public Holidays (US) ─────────────────────────────────────
const HOLIDAYS: Holiday[] = [
  { month: 0, day: 1, name: "New Year's Day" },
  { month: 0, day: 15, name: 'Martin Luther King Jr. Day' },
  { month: 1, day: 14, name: "Valentine's Day" },
  { month: 2, day: 17, name: "St. Patrick's Day" },
  { month: 4, day: 26, name: 'Memorial Day' },
  { month: 6, day: 4, name: 'Independence Day' },
  { month: 8, day: 1, name: 'Labor Day' },
  { month: 9, day: 31, name: 'Halloween' },
  { month: 10, day: 11, name: 'Veterans Day' },
  { month: 10, day: 27, name: 'Thanksgiving' },
  { month: 11, day: 25, name: 'Christmas Day' },
  { month: 11, day: 31, name: "New Year's Eve" },
];

// ─── Hero images for each month  ──
const MONTH_IMAGES: { src: string; alt: string }[] = [
  { src: '/images/january_hero.png', alt: 'Snowy mountain peaks in January' },
  { src: '/images/february_hero.png', alt: 'Frozen winter forest in February' },
  { src: '/images/march_hero.png', alt: 'Cherry blossoms blooming in March' },
  { src: '/images/april_hero.png', alt: 'Spring tulip field in April' },
  { src: '/images/may_hero.png', alt: 'Lush green valley in May' },
  { src: '/images/june_hero.png', alt: 'Tropical ocean beach in June' },
  { src: '/images/july_hero.png', alt: 'Golden sunset over water in July' },
  { src: '/images/august_hero.png', alt: 'Sunflower field in August' },
  { src: '/images/september_hero.png', alt: 'Autumn foliage in September' },
  { src: '/images/october_hero.png', alt: 'Misty mountain landscape in October' },
  { src: '/images/november_hero.png', alt: 'Pine trees in November' },
  { src: '/images/december_hero.png', alt: 'Snowy winter scene in December' },
];

// ─── Monthly Specialties (Revealed behind pages) 
const MONTH_SPECIALTIES: string[] = [
  "January: The month of crisp snow and new beginnings.",
  "February: The month of romance and lingering frost.",
  "March: The month of blooming cherry blossoms and rebirth.",
  "April: The month of spring showers and fresh tulips.",
  "May: The month of lush emerald valleys and warm breezes.",
  "June: The month of tropical escapes and vibrant youth.",
  "July: The month of sweet mangoes and golden sunsets.",
  "August: The month of bright sunflowers and endless afternoons.",
  "September: The month of falling leaves and autumn harvests.",
  "October: The month of misty mornings and pumpkin patches.",
  "November: The month of bronze twilight and quiet gratitude.",
  "December: The month of cozy firesides and snowy celebrations."
];

// ─── Core Date Utilities ──────────────────────────────────────

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOffset(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function buildCalendarDays(year: number, month: number): (Date | null)[] {
  const offset = getFirstDayOffset(year, month);
  const totalDays = getDaysInMonth(year, month);
  const days: (Date | null)[] = [];

  for (let i = 0; i < offset; i++) {
    days.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    days.push(new Date(year, month, d));
  }
  while (days.length < 42) {
    days.push(null);
  }
  return days;
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isInRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  const t = date.getTime();
  const s = range.start.getTime();
  const e = range.end.getTime();
  const min = Math.min(s, e);
  const max = Math.max(s, e);
  return t > min && t < max;
}

export function isRangeStart(date: Date, range: DateRange): boolean {
  return isSameDay(date, range.start);
}

export function isRangeEnd(date: Date, range: DateRange): boolean {
  return isSameDay(date, range.end);
}

export function isInHoverRange(
  date: Date,
  start: Date | null,
  hovered: Date | null
): boolean {
  if (!start || !hovered) return false;
  const t = date.getTime();
  const s = start.getTime();
  const h = hovered.getTime();
  const min = Math.min(s, h);
  const max = Math.max(s, h);
  return t > min && t < max;
}

export function formatMonthYear(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`;
}

export function getMonthName(month: number): string {
  return MONTH_NAMES[month];
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function getHoliday(date: Date): Holiday | undefined {
  return HOLIDAYS.find(
    (h) => h.month === date.getMonth() && h.day === date.getDate()
  );
}

export function normaliseRange(range: DateRange): DateRange {
  if (!range.start || !range.end) return range;
  if (range.start.getTime() > range.end.getTime()) {
    return { start: range.end, end: range.start };
  }
  return range;
}

export function monthKey(year: number, month: number): string {
  return `${year}-${month}`;
}

const MONTH_THEMES: { h: string; s: string }[] = [
  { h: '199', s: '89%' }, // Jan: Sky Blue
  { h: '290', s: '70%' }, // Feb: Pink/Purple
  { h: '330', s: '80%' }, // Mar: Cherry Pink
  { h: '350', s: '80%' }, // Apr: Rose Red
  { h: '140', s: '60%' }, // May: Green
  { h: '180', s: '90%' }, // Jun: Teal
  { h: '30', s: '100%' }, // Jul: Orange
  { h: '45', s: '100%' }, // Aug: Yellow/Gold
  { h: '35', s: '90%' },  // Sep: Amber
  { h: '20', s: '70%' },  // Oct: Slate Orange
  { h: '30', s: '40%' },  // Nov: Bronze
  { h: '200', s: '40%' }, // Dec: Slate Blue
];

export function getMonthData(year: number, month: number): MonthData {
  const img = MONTH_IMAGES[month];
  const theme = MONTH_THEMES[month];
  const specialty = MONTH_SPECIALTIES[month];
  return {
    month,
    year,
    heroImage: img.src,
    heroAlt: img.alt,
    themeHue: theme.h,
    themeSat: theme.s,
    specialty,
  };
}

export { MONTH_NAMES, DAY_LABELS, HOLIDAYS, MONTH_IMAGES };
