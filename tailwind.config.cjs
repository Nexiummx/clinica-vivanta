/** @type {import('tailwindcss').Config} */
const appleStack = [
  "-apple-system",
  "BlinkMacSystemFont",
  '"SF Pro Text"',
  '"Inter"',
  '"Segoe UI"',
  "system-ui",
  "sans-serif",
];

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        viv: {
          bg: "#FFFFFF",
          surface: "#FFFFFF",
          surfaceAlt: "#F5F5F7",
          surfaceDeep: "#1D1D1F",
          border: "#D2D2D7",
          text: "#1D1D1F",
          secondary: "#6E6E73",
          muted: "#6E6E73",
          onDark: "#F5F5F7",
          accent: "#0A7F5A",
          accentHover: "#086B4C",
          accentSoft: "#E8F5EF",
          warm: "#B8662F",
          warmSoft: "#F7EDE4",
        },
      },
      fontFamily: {
        display: appleStack,
        sans: appleStack,
        mono: appleStack,
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.06)",
        vivSm: "0 2px 8px rgba(0,0,0,0.04)",
        vivMd: "0 8px 32px rgba(0,0,0,0.06)",
        vivLg: "0 16px 48px rgba(0,0,0,0.08)",
      },
      transitionTimingFunction: {
        viv: "cubic-bezier(0.28, 0.11, 0.32, 1)",
      },
      backdropBlur: {
        glass: "20px",
        "glass-lg": "30px",
      },
    },
  },
  plugins: [],
};
