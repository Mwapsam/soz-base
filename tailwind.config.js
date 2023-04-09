const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/views/**/*.{html,html.erb,erb}',
    './app/javascript/components/**/*.{vue,js,ts,jsx,tsx}',
    './app/javascript/**/*.{vue,js,ts,jsx,tsx}',
    './app/**/*.{vue,js,ts,jsx,tsx}',
    // './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    // './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      container: {
        center: true,
        padding: '2rem',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
    extend: {
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
})
