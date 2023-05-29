/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{html,njk,md}',
    './src/**/*.{html,njk,md}',
  ],
  theme: {
    // override ----------------------------------------------------
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '400',
      bold: '500',
    },
    // extend ----------------------------------------------------
    extend: {
      gap: {
        gutter: '2rem',
        'gutter-half': '1rem',
      },
      container: {
        center: true,
        'max-width': {
          sm: '100%',
          md: '720px',
          lg: '720px',
          xl: '720px',
          '2xl': '720px',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Source Serif Pro', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    }
  },
  plugins: [],
}
