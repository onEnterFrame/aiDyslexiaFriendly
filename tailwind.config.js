/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dyslexic: ["OpenDyslexic", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#FFFDF0",
        brown: "#8B4513",
        brownLight: "#CD853F",
      },
    },
  },
  plugins: [],
};
