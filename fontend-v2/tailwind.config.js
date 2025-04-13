/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // hoặc điều chỉnh theo thư mục dự án của bạn
  ],
  theme: {
    extend: {
      animation: {
        fadeOut: "fadeOut 1s ease-out forwards",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
