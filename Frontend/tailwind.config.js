/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefinSans: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        teal: {
          '600': '#380773',
          '700' : "#d41473",
          '300' : "#e2806a"

  
          // You can also update other shades if needed
        },
        gray:{
          "900" : "white",
        }
      },
    },
  },
  plugins: [],
};
