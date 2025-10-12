/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        starbucks: {
          green: '#00704A',
          'green-light': '#1E3932',
          'green-dark': '#006241',
          cream: '#F1F1F0',
          gold: '#CBA258',
        }
      },
      fontFamily: {
        'sodo-sans': ['SoDo Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

