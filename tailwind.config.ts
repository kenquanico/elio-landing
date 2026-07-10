import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-red": "#224D69",
        "brand-black": "#0A0A0A",
        "brand-white": "#FFFFFF",
        "brand-gray": "#F5F5F5",
        "text-muted": "#6B7280",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3rem, 6vw, 5rem)", { lineHeight: "0.94", letterSpacing: "-0.055em" }],
        "section-title": ["clamp(2.25rem, 4vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
      },
      borderRadius: {
        card: "20px",
        pill: "9999px",
        "phone-mockup": "40px",
      },
      boxShadow: {
        phone: "0 35px 80px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
