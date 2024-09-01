/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A6CF7",
          dark: "#3F51B5",
        },
        secondary: {
          DEFAULT: "#F5F5F5",
          dark: "#BDBDBD",
        },
        accent: {
          DEFAULT: "#8A6AFD",
        },
        text: {
          primary: "#212121",
          secondary: "#757575",
        },
        background: {
          DEFAULT: "#FFFFFF",
          card: "#FAFAFA",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        regular: 400,
        bold: 700,
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "12px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        button: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
