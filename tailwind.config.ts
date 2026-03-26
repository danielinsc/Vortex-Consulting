import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-body': '#000000',
        'bg-card': '#080808',
        'bg-elevated': '#222222',
        'accent-blue': '#61aefa',
        'accent-coral': '#ff2244',
        'accent-navy': '#00111a',
      },
      fontFamily: {
        'geist': ['Geist', 'sans-serif'],
        'geist-mono': ['Geist Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'albert': ['Albert Sans', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
};
export default config;
