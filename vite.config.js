import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Rutas de recursos relativas para publicar en GitHub Pages.
  base: './',
});
