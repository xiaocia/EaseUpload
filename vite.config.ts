import { resolve } from 'path'
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'easeupload', // the proper extensions will be added
      fileName: 'easeupload',
    },
    outDir: 'scripts',
  },
})
