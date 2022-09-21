const plugin = require("tailwindcss/plugin");
const { fontFamily } = require("tailwindcss/defaultTheme");

const global = {
  /**
   * These are global design system colors
   * that can be applied to tailwind class names.
   */
  primary: {
    50: "#ebe8fd",
    100: "#d6d1fa",
    200: "#aea3f5",
    300: "#8575f0",
    400: "#5c46ec",
    500: "#482FE9",
    600: "#2913b9",
    700: "#1f0f8a",
    800: "#150a5c",
    900: "#0a052e",
  },
  neutral: {
    0: "#ffffff",
    50: "#f7f7f8",
    100: "#e4e4e7",
    200: "#C8C8D0",
    300: "#ADADB8",
    400: "#9292A0",
    500: "#777788",
    600: "#5F5F6D",
    700: "#474752",
    800: "#2F2F37",
    900: "#18181B",
    1000: "#000000",
  },
  alert: {
    error: "#e34949",
    warning: "#f59b15",
    success: "#4caf50",
    info: "#31a0dc",
  },
};

/**
 * See: https://tailwindcss.com/docs/customizing-colors
 */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: global.primary[500],
          base: global.primary[500],
          targeted: global.primary[700],
          pressed: global.primary[500],
          weak: global.primary[50],
          hover: global.primary[50],
          on: global.neutral[0],
        },
        background: {
          canvas: global.neutral[0],
          accent: {
            DEFAULT: global.primary[50],
            base: global.neutral[50],
            primary: global.primary[50],
          },
        },
        text: {
          DEFAULT: global.neutral[900],
          base: global.neutral[900],
          weak: global.neutral[600],
          icon: global.neutral[700],
        },
        chip: {
          static: {
            DEFAULT: global.neutral[900],
            base: {
              DEFAULT: global.neutral[900],
              base: global.neutral[900],
              on: global.neutral[0],
            },
            interactive: {
              DEFAULT: global.neutral[100],
              base: global.neutral[100],
              on: global.neutral[900],
            },
          },
        },
        border: {
          DEFAULT: global.neutral[400],
          base: global.neutral[400],
          strong: global.neutral[700],
          weak: global.neutral[100],
          targeted: global.neutral[900],
        },
        alert: {
          error: global.alert.error,
          warning: global.alert.warning,
          success: global.alert.success,
          info: global.alert.info,
        },
        grey: {
          "dark-1": "#32393D",
          "dark-2": "#484B53",
          "light-1": "#F8F8FA",
          "light-2": "#F4F4FA",
          "light-3": "#E4E7F2",
          "light-4": "#BCC1D3",
        },
        link: {
          dark: "#000000",
          DEFAULT: "#482FE9",
        },
        // Additional Colors
        white: "#FFFFFF",
        black: "#000000",
        slate: "#232225",
        mint: "#B9D2C8",
        ocean: "#C4CED5",
        velvet: "#959EDE",
      },
      borderRadius: {
        button: "0px",
        card: "0px",
      },
      fontFamily: {
        ...fontFamily,
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1920px",
      "3xl": "2560px",
      "4xl": "3840px",
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".hide-webkit-cancel-button::-webkit-search-cancel-button": {
          appearance: "none",
        },
      });
    }),
  ],
};
