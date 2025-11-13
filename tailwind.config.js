// eslint-disable-next-line
const colors = require("tailwindcss/colors");

const generateColorShades = (name) =>
  [50, ...Array.from({ length: 9 }).map((_, i) => (i + 1) * 100), 950].reduce(
    (acc, k) => ({
      ...acc,
      [k]: `var(--${name}-${k})`,
    }),
    {}
  );

const customColors = {
  foreground: "var(--foreground)",
  background: "var(--background)",
  secondaryBg: "var(--secondaryBg)",
  gray: generateColorShades("gray"),
  pink: generateColorShades("pink"),
  blue: generateColorShades("blue"),
  yellow: generateColorShades("yellow"),
  green: generateColorShades("green"),
  red: generateColorShades("red"),
};

const fontStack = [
  "Fricolage",
  "Inter",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen-Sans",
  "Ubuntu",
  "Cantarell",
  "Helvetica Neue",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
].join(",");

const monoStack = [
  "Fragment Mono",
  "ui-monospace",
  "SFMono-Regular",
  "SF Mono",
  "Consolas",
  "Liberation Mono",
  "Menlo",
  "monospace",
].join(",");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 'media' or 'class'
  theme: {
    fontFamily: {
      sans: fontStack,
      mono: monoStack,
      heading: ["Mackinac", "sans"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
      },
      backgroundImage: {
        post: "linear-gradient(290.44deg, rgb(182 206 235 / 6%) 27.03%, rgba(204, 219, 235, 0.420833) 59.53%, rgb(215 185 238 / 30%) 86.77%)",
      },
      fontSize: {
        // Headings
        huge: ["clamp(48px, 6vw, 64px)", "1.25"],
        jumbo: ["clamp(40px, 5vw, 48px)", "1.25"],
        large: ["clamp(32px, 4vw, 40px)", "1.25"],
        h1: ["clamp(28px, 2.5vw, 32px)", "1.375"],
        h2: ["clamp(24px, 3vw, 28px)", "1.375"],
        h3: ["clamp(22px, 2.5vw, 24px)", "1.375"],
        h4: ["20px", "1.375"],
        h5: ["18px", "1.5"],
        h6: ["16px", "1.5"],

        // Paragraphs
        xl: ["20px", "1.5"],
        lg: ["18px", "1.5"],
        base: ["16px", "1.5"],
        sm: ["14px", "21px"],
        xs: ["12px", "18px"],
      },
      typography: (theme) => ({}),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
