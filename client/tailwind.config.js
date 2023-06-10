/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    textFillColor: (theme) => theme("borderColor"),
    textStrokeColor: (theme) => theme("borderColor"),
    textStrokeWidth: (theme) => theme("borderWidth"),
    paintOrder: {
      fsm: {paintOrder: "fill stroke markers"},
      fms: {paintOrder: "fill markers stroke"},
      sfm: {paintOrder: "stroke fill markers"},
      smf: {paintOrder: "stroke markers fill"},
      mfs: {paintOrder: "markers fill stroke"},
      msf: {paintOrder: "markers stroke fill"},
    },
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1025px",
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
  plugins: [require("tailwindcss-text-fill-stroke")],
};
