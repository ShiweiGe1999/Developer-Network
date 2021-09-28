module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "landing-pattern": "url('/src/img/landing.jpg')",
      },
      keyframes: {
        textSplit: {
          "0%": {
            transform: "translateY(-25%)",
          },
          "50%": {
            transform: "translateY(25%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ["hover"],
      borderWidth: ["hover", "focus"],
      borderColor: ["hover", "focus"],
      borderStyle: ["hover", "focus"],
      animation: ["hover", "focus", "active"],
    },
  },
  plugins: [],
};
