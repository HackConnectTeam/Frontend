/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',   // Indigo
        secondary: '#F43F5E', // Rose
        accent: '#22D3EE',    // Cyan
        surface: '#FFFFFF',
        background: '#F9FAFB',
        text: {
          main: '#111827',
          subtle: '#6B7280',
        },
      },
    },
  },
  plugins: [],
}
