/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        viv: {
          bg: "#FAFAF7",
          surface: "#FFFFFF",
          surfaceAlt: "#F2EFE9",
          surfaceDeep: "#1A1F2E",
          border: "#E5E1D8",
          text: "#1A1F2E",
          secondary: "#5A5F6E",
          muted: "#9A9FAA",
          onDark: "#FAFAF7",
          accent: "#2D5F4F",
          accentHover: "#3D7F6A",
          accentSoft: "#E8F0EC",
          warm: "#C49A6C",
          warmSoft: "#F5EBE0",
        },
      },
      fontFamily: {
        display: ["var(--font-instrument)", "Georgia", "serif"],
        sans: ["var(--font-geist)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glass:
          "0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.4)",
        vivSm: "0 2px 8px rgba(0,0,0,0.04)",
        vivMd: "0 8px 32px rgba(0,0,0,0.06)",
        vivLg: "0 16px 48px rgba(0,0,0,0.08)",
      },
      transitionTimingFunction: {
        viv: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        glass: "24px",
        "glass-lg": "40px",
      },
    },
  },
  plugins: [],
};
