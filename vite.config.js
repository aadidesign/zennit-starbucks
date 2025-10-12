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
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'ui': ['framer-motion', 'lucide-react', 'react-intersection-observer'],
          'aws': ['aws-sdk', '@aws-sdk/client-dynamodb', '@aws-sdk/lib-dynamodb', '@aws-sdk/client-rds', '@aws-sdk/client-ec2', '@aws-sdk/client-iam', '@aws-sdk/client-cloudwatch', '@aws-sdk/client-auto-scaling']
        },
        // Force new chunk hashes
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})

