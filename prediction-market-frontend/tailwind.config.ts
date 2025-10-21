import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/landing/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "2000px",
        "4xl": "2560px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#F3BA2F",
        secondary: "#1A1A1A",
        accent: "#2A2A2A",
        muted: "#6B7280",
        border: "#374151",
        card: "#1F2937",
        "card-hover": "#374151",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        "text-primary": "#FFFFFF",
        "text-secondary": "#9CA3AF",
        "text-muted": "#6B7280",
      },
      fontFamily: {
        anton: ["anton"],
        satoshi: ["satoshi"],
        rubik:["rubik"],
        interSemi:["interSemi"],
      },
    },
  },
  plugins: [],
} satisfies Config;
