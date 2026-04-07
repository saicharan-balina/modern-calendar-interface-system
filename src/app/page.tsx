import CalendarContainer from '@/components/CalendarContainer';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-100 via-slate-50 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <CalendarContainer />
    </main>
  );
}
