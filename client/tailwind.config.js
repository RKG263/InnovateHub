/** @type {import('tailwindcss').Config} */
export default {  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      screens :{
        'max-sm': {'max': '639px'}, // Target screens smaller than 640px
        'max-md': {'max': '767px'}, // Target screens smaller than 768px
        'max-lg': {'max': '1023px'}, // Target screens smaller than 1024px
        'max-xl': {'max': '1279px'}, // Target screens smaller than 1280px
        'max-2xl': {'max': '1535px'},// Target screens smaller than 1536px
      }
    },
  },
  plugins: [],
}