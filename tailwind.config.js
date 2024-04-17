// tailwind.config.ts
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
      },
      width: {
        90: "90%", //  90% width for clients page
      },
      height: {
        90: "90%", // 90% width for clients page
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
