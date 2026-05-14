import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#E8A33D",
        brass: "#B8862F",
        "brass-light": "#D4A24A",
        "brass-dark": "#8B6420",
        terracotta: "#C84B31",
        maroon: "#7A2E2E",
        cream: "#F5EDD9",
        ivory: "#F8F1E4",
        coriander: "#4A7C3A",
        charcoal: "#2C2620",
        night: "#0A0A0A",
        "god-ray": "#FFB347",
        "rim-teal": "#2B5F75",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        cinematic: "1200ms",
      },
      backgroundImage: {
        "brass-gradient":
          "linear-gradient(135deg, #D4A24A 0%, #B8862F 45%, #8B6420 100%)",
        "saffron-gradient":
          "linear-gradient(135deg, #FFD27A 0%, #E8A33D 50%, #B8862F 100%)",
        "night-gradient":
          "radial-gradient(ellipse at top right, rgba(255,179,71,0.18) 0%, rgba(10,10,10,0) 55%), radial-gradient(ellipse at bottom left, rgba(43,95,117,0.25) 0%, rgba(10,10,10,0) 60%), #0A0A0A",
      },
      animation: {
        "steam-rise": "steamRise 6s ease-in-out infinite",
        "slow-spin": "spin 30s linear infinite",
        float: "float 8s ease-in-out infinite",
        "fade-up": "fadeUp 1.2s cubic-bezier(0.65,0,0.35,1) both",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        steamRise: {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-20px) scale(1.1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
