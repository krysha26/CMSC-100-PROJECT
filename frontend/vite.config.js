import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
],
theme: {
  extend:{
    fontFamily: {
      sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Body font
      mono: ['Ubuntu Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'], // Header font
      poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Poppins font
      'poppins-bold': ['PoppinsB', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Poppins Bold font
    },
    colors: {
      primary: '#303030', // To be changed
      secondary: '#BBBBBB',
      accent: '#D9D9D9', // Light gray
      background: '#FAFAFA', // Off-white
      text: '#303030', // Dark gray
    },
  },
}
})