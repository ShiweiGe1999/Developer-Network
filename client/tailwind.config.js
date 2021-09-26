module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "landing-pattern": "url('/src/img/landing.jpg')",
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ["hover"],
      borderWidth: ["hover", "focus"],
      borderColor: ["hover", "focus"],
      borderStyle: ["hover", "focus"],
    },
  },
  plugins: [],
};
