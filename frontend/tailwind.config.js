/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        base: "#05070d",
        surface: "#0f111a",
        elevated: "#161824",
        "border-subtle": "rgba(255, 255, 255, 0.1)",
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          dim: "#2563eb",
          light: "#22d3ee", // cyan-400
          tint: "rgba(59, 130, 246, 0.08)",
        },
        secondary: {
          DEFAULT: "#8b5cf6", // Violet (keeping just in case, but unused as per prompt constraint)
          dim: "#7c3aed",
          muted: "#4c1d95",
          tint: "rgba(139, 92, 246, 0.08)",
        },
        accent: {
          DEFAULT: "#3b82f6", // map accent to primary
          dim: "#2563eb",
          muted: "#1d4ed8",
          tint: "rgba(59, 130, 246, 0.08)",
        },
        text: {
          primary: "#f4f4f5",
          secondary: "#a1a1aa",
          muted: "#71717a",
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(59, 130, 246, 0.3)',
        'glow-hover': '0 0 25px rgba(59, 130, 246, 0.5)',
        'glow-focus': '0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.4)',
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.7" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
        "fade-up": "fade-up 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
