import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  base: '/', // Ensure base path is correct
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps to save memory
    chunkSizeWarningLimit: 2000,
    minify: 'esbuild', // Faster minification
    rollupOptions: {
      // Exclude AWS SDKs and service files from frontend bundle
      external: [
        /@aws-sdk\/.*/,
        'aws-sdk'
      ],
      input: {
        main: 'index.html'
      },
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
    exclude: ['@aws-sdk/*', 'aws-sdk']
  },
  define: {
    // Mock AWS SDK for frontend builds
    'process.env.AWS_REGION': JSON.stringify('us-east-1'),
    'process.env.AWS_ACCESS_KEY_ID': JSON.stringify('mock'),
    'process.env.AWS_SECRET_ACCESS_KEY': JSON.stringify('mock')
  }
})

