const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background_1: "#041D37",
        background_2: "#083C70",
        foreground: "#2463A2",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
