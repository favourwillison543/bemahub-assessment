import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-soft": "var(--color-accent-soft)",
        "tag-blue-bg": "var(--color-tag-blue-bg)",
        "tag-blue-text": "var(--color-tag-blue-text)",
        "tag-orange-bg": "var(--color-tag-orange-bg)",
        "tag-orange-text": "var(--color-tag-orange-text)",
        "tag-green-bg": "var(--color-tag-green-bg)",
        "tag-green-text": "var(--color-tag-green-text)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        "error-bg": "var(--color-error-bg)",
        "error-border": "var(--color-error-border)",
        "error-text": "var(--color-error-text)",
      },
    },
  },
  plugins: [],
} satisfies Config;
