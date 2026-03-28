import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf6f0",
          100: "#fae8d8",
          200: "#f4ccab",
          300: "#eda97a",
          400: "#e58347",
          500: "#df6521",
          600: "#c84f18",
          700: "#a63c16",
          800: "#853119",
          900: "#6c2a18",
        },
      },
    },
  },
  plugins: [],
};
export default config;
