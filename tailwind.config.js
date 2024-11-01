/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Georama"],
        pixel: ["Pixelify Sans"],
      },
    },
  },
  plugins: [],
};
