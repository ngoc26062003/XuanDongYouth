import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Adjusts the chunk size warning limit (in kB). Default is 500.
    chunkSizeWarningLimit: 1000,
  },
});