/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist : [
    {
        pattern:
            /(bg|text|border)-(red|amber|emerald|sky|neutral)-(|100|200|400|500|600)/,
        variants: ['hover'],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}