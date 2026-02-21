/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        primaryHover: "#1D4ED8",
        primaryLight: "#E0E7FF",
        background: "#F8FAFC",
        sidebar: "#111827",
        border: "#E5E7EB",
        success: "#16A34A",
        danger: "#DC2626",
        warning: "#F59E0B",
      },
    },
  },
  plugins: [],
};
