module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require("tailwindcss/nesting"),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
