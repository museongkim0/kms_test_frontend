import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.0.2.46:8080',
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Original path:", path);
          const newPath = path.replace(/^\/api/, "");
          console.log("Rewritten path:", newPath);
          return newPath;
        }
      }
    }
  }
})
