/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Georama"],
        pixel: ["Pixelify Sans"],
        romans: ["Times New Roman", "Times", "serif"],
        fira: ["Fira Mono"],
      },
    },
  },
  plugins: [],
};
