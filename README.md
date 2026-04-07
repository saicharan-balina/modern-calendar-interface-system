# Interactive Wall Calendar Component

A polished, production-ready interactive React/Next.js component inspired by physical wall calendar aesthetics. It features a hero imagery block, a fully functional date-range selector, and an integrated notes section, built with a strong focus on UX, responsiveness, and clean architecture.

## 🌟 Key Features

- **Wall Calendar Aesthetic:** Beautiful side-by-side or stacked layout utilizing month-specific imagery, drop-shadow depth, and a spiral-binding CSS effect.
- **Date Range Selection:** Smooth three-step date range selection (Start → End → Reset) with hover previews, smart range normalization (handles reverse selection gracefully), and comprehensive edge-case handling.
- **Integrated Notes System:** A lined-paper styled notes area. Notes auto-save seamlessly (debounced) and persist uniquely per month via localStorage.
- **State-of-the-Art UX:** Smooth micro-interactions powered by Framer Motion, dynamic month transitions, and intelligent focus states.
- **Fully Responsive:** Adapts flawlessly from desktop (two-column split) to tablet and mobile (vertical stack constraint).
- **Dark Mode Support:** First-class dark mode styling perfectly matching modern design systems.
- **Client-Side Persistence:** Zero backend requirement. All interactions (Theme, Notes) are dynamically persisted on the client instance utilizing robust custom hooks.

## 🛠 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Library:** [React](https://reactjs.org/) (Functional Components, Hooks)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for strict type safety
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid, utility-first styling
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/saicharan-balina/modern-calendar-interface-system.git
   cd modern-calendar-interface-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the component:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the calendar.

## 📁 Project Architecture

The codebase is organized modularly to enforce separation of concerns and component reusability:

- `src/components/CalendarContainer.tsx`: The primary wrapper managing global design states (dark mode, layouts).
- `src/components/CalendarGrid.tsx`: Calculates and structures the 7-column layout logic.
- `src/components/DayCell.tsx`: The highly optimized leaf component handling individual render states (hover, range bounds, today).
- `src/hooks/useCalendar.ts`: Central nervous system for calendar navigation and range mathematics.
- `src/hooks/useLocalStorage.ts`: Generic, SSR-safe handler for data persistence.
- `src/utils/dateUtils.ts`: Pure functions for deterministic date interactions avoiding complex library bloat.

## 🎨 Design Decisions

1. **No Hardcoded Values:** The grid renders fluidly up to exactly 42 slots ensuring mathematical layout stability when traversing 5-week versus 6-week months.
2. **Memoization:** The system extensively utilizes `React.memo` and `useCallback` ensuring the 42-day cells don't unnecessarily re-render on abstract parent state changes.
3. **Accessibility:** Focus-visible states, keyboard interaction readiness, semantic HTML hierarchies, and dynamic `aria-label` generation.

---

*Built for the Frontend Engineering Challenge.*
