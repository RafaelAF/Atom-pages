import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary, #D89B9E)",
        primaryDark: "var(--color-primary-dark, #C48185)",
        bg: "var(--color-bg, #FAF6F0)",
        surface: "var(--color-surface, #F3E8DC)",
        text: "var(--color-text, #5C3A31)",
        accent: "var(--color-accent, #7C7859)",

        // Aliases temáticos do template Boho / Retrocompatibilidade
        bgOffWhite: "var(--color-bg, #FAF6F0)",
        warmSand: "var(--color-surface, #F3E8DC)",
        dustyRose: "var(--color-primary, #D89B9E)",
        dustyRoseDark: "var(--color-primary-dark, #C48185)",
        coffeeBrown: "var(--color-text, #5C3A31)",
        oliveGreen: "var(--color-accent, #7C7859)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        script: ["var(--font-script)", "Great Vibes", "cursive"],
        sans: ["var(--font-sans)", "Poppins", "sans-serif"],
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        float: "floatSlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

