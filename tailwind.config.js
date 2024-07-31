/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        mainColor: 'rgb(31, 113, 242)',
        theme: '#4C3D8F',
        themeGreen: '#4DB27B',
        themeYellow: '#F5A053',
        themeBlue: '#52B5C3',
        

      },
    },
  },
  plugins: [],
};
