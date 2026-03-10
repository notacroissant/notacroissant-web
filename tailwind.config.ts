import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mahogany: '#490000',
        'mahogany-light': '#6b0000',
        champagne: '#f6ddbe',
        'champagne-dark': '#e8c99a',
        offwhite: '#faf8f5',
        dark: '#111110',
        'dark-2': '#1c1c1a',
        muted: '#666666',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
