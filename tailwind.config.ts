import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bday: {
          bg: "#FFF9F5",
          surface: "#FFFFFF",
          primary: "#FF8FAB",
          "primary-hover": "#FA7296",
          secondary: "#FFC2D1",
          accent: "#FFD166",
          text: "#2B2730",
          muted: "#8A7F86",
          subtle: "#F5ECE5",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        handwriting: ["var(--font-handwriting)", "Caveat", "Alex Brush", "cursive"],
      },
      boxShadow: {
        polaroid: "0 10px 25px -5px rgba(43, 39, 48, 0.12), 0 8px 10px -6px rgba(43, 39, 48, 0.08)",
        "polaroid-hover": "0 20px 35px -5px rgba(43, 39, 48, 0.18), 0 10px 12px -5px rgba(43, 39, 48, 0.12)",
        glow: "0 0 25px rgba(255, 143, 171, 0.4)",
        "glow-gold": "0 0 30px rgba(255, 209, 102, 0.5)",
        envelope: "0 15px 35px rgba(43, 39, 48, 0.1), 0 5px 15px rgba(43, 39, 48, 0.05)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
        flicker: {
          "0%, 100%": { transform: "scale(1) rotate(-1deg)", opacity: "1" },
          "25%": { transform: "scale(1.08) rotate(1deg)", opacity: "0.9" },
          "50%": { transform: "scale(0.95) rotate(-2deg)", opacity: "0.95" },
          "75%": { transform: "scale(1.05) rotate(2deg)", opacity: "0.85" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        flicker: "flicker 1.8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
