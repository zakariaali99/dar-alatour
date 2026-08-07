/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#fbf9f5',
          200: '#f5f0e6',
          300: '#ede5d8',
          400: '#dcd0be',
          500: '#c5b49d',
        },
        gold: {
          50: '#fffdf0',
          100: '#fef7cf',
          200: '#fdeaa3',
          300: '#fbd76c',
          400: '#e5be53',
          500: '#d4af37',
          600: '#c59b27',
          700: '#9e791b',
          800: '#7d5e18',
          900: '#5c4413',
        },
        emerald: {
          800: '#144d3c',
          900: '#0d382c',
          950: '#061d16',
        },
        obsidian: {
          DEFAULT: '#1a1612',
          light: '#2e2722',
        }
      },
      fontFamily: {
        arabic: ['Tajawal', 'Amiri', 'sans-serif'],
        serif: ['Playfair Display', 'Cinzel', 'serif'],
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'cream-glow': '0 20px 40px -15px rgba(212, 175, 55, 0.15)',
        'gold-soft': '0 10px 30px -5px rgba(197, 155, 39, 0.25)',
        'luxury': '0 25px 50px -12px rgba(13, 56, 44, 0.1)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #fcf6ba 30%, #c59b27 70%, #aa771c 100%)',
        'cream-gradient': 'linear-gradient(180deg, #fdfbf7 0%, #f5f0e6 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #0d382c 0%, #144d3c 100%)',
      }
    },
  },
  plugins: [],
}
