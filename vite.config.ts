import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../csongor1215.github.io',
    emptyOutDir: false, // ne törölje a .git mappát
  },
})