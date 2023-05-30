/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '320px',
      'md': '768px',
      'lg': '1025px'
    },
    extend: {
      colors: {
        primary: "#AD8B73",
        second: "#CEAB93",
        acsent: "#E3CAA5",
        white: "#FFFBE9",
        black: "#1E2022",
      },
      fontFamily: {
        pop: "Poppins",
        lora: "Lora",
      },
    },
  },
  plugins: [],
};
