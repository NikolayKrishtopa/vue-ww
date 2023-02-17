/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#1e3a8a',
        primary: '#fff',
      },
    },
    fontFamily: {
      Arial: ['Arial, sans-serif'],
    },
    container: {
      padding: '2rem',
      center: true,
    },
  },
  plugins: [],
}
