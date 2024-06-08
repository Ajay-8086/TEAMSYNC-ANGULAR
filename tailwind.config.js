/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#306bff', 
        customBgBlue:'#33bfff'
      },
      backgroundImage:{
        'formBg':"url('/assets/images/formbg.svg)"
      }
    },
  },
  plugins: [],
}

