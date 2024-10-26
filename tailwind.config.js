/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',        
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-bg': "url('images/home.jpg')",
      },
      fontFamily: {
        custom: ['CustomFont', 'sans-serif'], // Add fallback fonts as needed
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Adjust the duration as needed
        'pulse-slow': 'pulse 3s linear infinite', // Adjust the duration as needed

      },
    },
  },
  daisyui: {
    themes: [{
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        primary: "#00b0c8",
        "primary-content": "#033744",
        secondary: "#78ec5f",
        neutral: "#333438",
        accent: "#005AD2",

      },
    }],
  },
  plugins: [require('daisyui'),],
}
