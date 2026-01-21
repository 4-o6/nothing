import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Allow process.env.API_KEY to be accessed if defined at build time
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-ui': ['lucide-react'],
            'vendor-ai': ['@google/genai'],
          }
        }
      }
    },
    server: {
      port: 3000
    }
  };
});