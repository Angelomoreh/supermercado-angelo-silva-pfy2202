/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        marca: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
        },
      },
      boxShadow: {
        suave: '0 8px 26px rgba(15, 23, 42, 0.05)',
      },
    },
  },
  plugins: [],
};
