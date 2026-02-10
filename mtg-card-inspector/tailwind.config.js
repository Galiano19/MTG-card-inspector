module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 200ms ease-out",
        "accordion-up": "accordion-up 200ms ease-out",
      },
      colors: {
        /* Base semantic colors */
        border: "var(--clr-surface-a30)",
        input: "var(--clr-surface-a20)",
        ring: "var(--clr-primary-a30)",
        background: "var(--clr-surface-a0)",
        foreground: "var(--clr-light-a0)",
        muted: "var(--clr-surface-tonal-a10)",
        accent: "var(--clr-surface-tonal-a20)",
        card: "var(--clr-surface-a10)",
        popover: "var(--clr-surface-a20)",

        primary: {
          DEFAULT: "var(--clr-primary-a0)",
          foreground: "var(--clr-surface-a0)",
        },

        secondary: {
          DEFAULT: "var(--clr-surface-tonal-a30)",
          foreground: "var(--clr-dark-a0)",
        },

        /* Destructive mapped to danger */
        destructive: {
          DEFAULT: "var(--clr-danger-a10)",
          foreground: "var(--clr-light-a0)",
        },

        success: {
          DEFAULT: "var(--clr-success-a10)",
          foreground: "var(--clr-dark-a0)",
        },
        warning: {
          DEFAULT: "var(--clr-warning-a10)",
          foreground: "var(--clr-dark-a0)",
        },
        info: {
          DEFAULT: "var(--clr-info-a10)",
          foreground: "var(--clr-light-a0)",
        },
        danger: {
          DEFAULT: "var(--clr-danger-a0)",
          foreground: "var(--clr-light-a0)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
