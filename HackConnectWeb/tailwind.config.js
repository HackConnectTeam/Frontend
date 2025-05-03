/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Opción 'media' si prefieres automático según el sistema
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        primary: '#6366F1',
        primaryDark: '#4F46E5',
        secondary: '#F43F5E',
        secondaryDark: '#E11D48',
        accent: '#22D3EE',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        muted: '#F3F4F6',
        border: '#E5E7EB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        text: {
          DEFAULT: '#111827',
          subtle: '#6B7280',
          inverted: '#FFFFFF',
        },
        dark: {
          background: '#1F2937',
          surface: '#374151',
          text: '#F9FAFB',
          muted: '#4B5563',
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      zIndex: {
        modal: 1000,
        dropdown: 900,
        toast: 1100,
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.05)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
