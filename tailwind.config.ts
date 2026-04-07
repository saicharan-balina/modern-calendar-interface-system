import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: 'hsl(var(--theme-h), var(--theme-s), 95%)',
          100: 'hsl(var(--theme-h), var(--theme-s), 90%)',
          200: 'hsl(var(--theme-h), var(--theme-s), 80%)',
          300: 'hsl(var(--theme-h), var(--theme-s), 70%)',
          400: 'hsl(var(--theme-h), var(--theme-s), 60%)',
          500: 'hsl(var(--theme-h), var(--theme-s), 50%)',
          600: 'hsl(var(--theme-h), var(--theme-s), 40%)',
          700: 'hsl(var(--theme-h), var(--theme-s), 30%)',
          800: 'hsl(var(--theme-h), var(--theme-s), 20%)',
          900: 'hsl(var(--theme-h), var(--theme-s), 10%)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
