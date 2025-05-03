/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: '#121212',
        light: '#ffffff',
      },
      textColor: {
        dark: '#ffffff',
        light: '#000000',
      },
      borderColor: {
        dark: '#333333',
        light: '#e5e7eb',
      },
    },
  },
  plugins: [],
};
