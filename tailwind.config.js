/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif']
      },
      colors: {
        brand: {
          blue: '#023d69',
          teal: '#15b1d7',
          orange: '#FA7204'
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #023d69, #15b1d7, #FA7204)'
      },
      boxShadow: {
        glass: '0 20px 45px -20px rgba(1, 38, 64, 0.5)'
      }
    }
  },
  plugins: []
}
