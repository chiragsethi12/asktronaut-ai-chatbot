/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        base: "#0b1120",
        surface: "#111827",
        elevated: "#1f2937",
        "border-subtle": "rgba(255, 255, 255, 0.1)",
        "border-strong": "rgba(255, 255, 255, 0.2)",
        primary: {
          DEFAULT: "#3b82f6", // pure blue
          dim: "#2563eb",
        },
        text: {
          primary: "#ffffff",
          secondary: "#d1d5db",
          muted: "#9ca3af",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(5px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        }
      },
      animation: {
        "fade-up": "fade-up 0.2s ease-out forwards",
        "fade-in": "fade-in 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
