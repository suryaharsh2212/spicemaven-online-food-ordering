/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: ['@tailwindcss/forms','@tailwindcss/aspect-ratio', daisyui,'@tailwindcss/forms'],
}

