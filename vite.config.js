import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps to save memory
    chunkSizeWarningLimit: 2000,
    minify: 'esbuild', // Faster minification
    rollupOptions: {
      // Exclude AWS SDKs from frontend bundle - they belong in backend only!
      external: [
        /@aws-sdk\/.*/,
      ],
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'ui': ['framer-motion', 'lucide-react', 'react-intersection-observer']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['@aws-sdk/*']
  }
})

