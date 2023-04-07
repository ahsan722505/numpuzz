/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: "#66b2ff",
      background: "#0a1929",
      grayWhite: "rgba(255, 255, 255, 0.5)",
      darkBlue: "#02203c",
      gray: "rgb(68, 93, 110)",
      purple: "#8d96eb",
      darkPurple: "#79589f",
    },
    extend: {},
  },
  plugins: [],
};
