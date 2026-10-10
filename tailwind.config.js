/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Charming Slate" design tokens
        surface: '#f8f9ff',
        'surface-dim': '#cbdbf5',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eff4ff',
        'surface-container': '#e5eeff',
        'surface-container-high': '#dce9ff',
        'surface-container-highest': '#d3e4fe',
        'on-surface': '#0b1c30',
        'on-surface-variant': '#464554',
        outline: '#777586',
        'outline-variant': '#c7c4d7',
        primary: '#4338ca',
        'primary-container': '#4338ca',
        'on-primary': '#ffffff',
        secondary: '#565e74',
        tertiary: '#059669',
        error: '#dc2626',
        'error-container': '#fef2f2',
        background: '#f8fafc',
        'on-background': '#0b1c30',
        success: '#059669',
        warning: '#d97706',
      },
      fontFamily: {
        sans: ['"Open Sans"', '"Century Gothic"', 'sans-serif'],
        serif: ['"Open Sans"', '"Century Gothic"', 'sans-serif'],
        mono: ['"Open Sans"', '"Century Gothic"', 'sans-serif'],
        display: ['"Open Sans"', '"Century Gothic"', 'sans-serif'],
        body: ['"Open Sans"', '"Century Gothic"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
