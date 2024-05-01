import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Mona Sans", "sans-serif"],
      },
      colors: {
        mint: {
          "50": "#f2fbf8",
          "100": "#d1f6ea",
          "200": "#9eead4",
          "300": "#6edabf",
          "400": "#40c1a5",
          "500": "#27a58b",
          "600": "#1d8471",
          "700": "#1b6a5c",
          "800": "#1a554b",
          "900": "#1a4740",
          "950": "#092a26",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
