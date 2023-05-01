import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/REII414_WebApp_Practical",
  build: {
    outDir: "C:/xampp/htdocs/REII414_WebApp_Practical"
  }
})
