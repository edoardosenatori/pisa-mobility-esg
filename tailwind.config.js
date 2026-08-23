/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pisa: {
          red: '#C41230',       // Rosso Pisano storico
          darkred: '#990E25',
        },
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#1E3A8A',       // Istituzionale Blu Navy
          900: '#0F172A',       // Navy Scuro
          950: '#0A1128',
        },
        esg: {
          emerald: '#059669',   // Verde Smeraldo ESG
          light: '#10B981',     // Semaforo Verde
          dark: '#064E3B',
          amber: '#F59E0B',     // Semaforo Giallo
          rose: '#EF4444',      // Semaforo Rosso
        },
        slate: {
          muted: '#64748B',     // Ardesia istituzionale
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.06)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.25)',
        'glow-navy': '0 0 20px rgba(30, 58, 138, 0.25)',
      }
    },
  },
  plugins: [],
}
