/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['"Syne"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EBE6DC',
          300: '#DDD6C6',
        },
        olive: {
          DEFAULT: '#5C6B47',
          dark: '#3F492E',
          light: '#728459',
        },
        burntOrange: {
          DEFAULT: '#E65100',
          hover: '#BF360C',
        },
      },
    },
  },
  plugins: [],
}
