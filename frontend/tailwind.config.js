/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:{
      width: {
        '1/7': '14%',
        '2/7': '28%',
        '3/7': '42%',
        '4/7': '57%',
        '5/7': '71%',
        '6/7': '85%',
      },
    },
  },
  plugins: [],
}
