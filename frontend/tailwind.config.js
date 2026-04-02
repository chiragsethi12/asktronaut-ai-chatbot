/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        base: "#060911", // rgb(6, 9, 17)
        surface: "#0B0F18", // rgb(11, 15, 24)
        elevated: "#0B0F18",
        "border-subtle": "rgba(255, 255, 255, 0.1)",
        "border-strong": "rgba(255, 255, 255, 0.2)",
        primary: {
          DEFAULT: "#013892", // rgb(1, 56, 146)
          dim: "#012b73",
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
