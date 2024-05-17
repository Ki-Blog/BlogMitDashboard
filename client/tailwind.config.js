const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      primary: {
        50: "#f5f3ff",
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ]
}