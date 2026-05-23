import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        card: "var(--card)", 
      },
      keyframes: {
        scroll: {
          "0%": {
            transform: "translateX(-5.2%)"
          },
          "100%": {
            transform: "translateX(-55.2%)"
          }
        }
      },
      animation: {
        scroll: "scroll 25s linear infinite"
      }
    },
  },
  plugins: [],
} satisfies Config;
