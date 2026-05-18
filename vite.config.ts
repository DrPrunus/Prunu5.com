import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

const envPath = path.resolve(process.cwd(), '.env');
let steamApiKey = process.env.STEAM_API_KEY || '';
let geminiApiKey = process.env.GEMINI_API_KEY || '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (key.trim() === 'STEAM_API_KEY') steamApiKey = value;
      if (key.trim() === 'GEMINI_API_KEY') geminiApiKey = value;
    }
  });
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      minify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'three': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
            'vendor': ['react', 'react-dom', 'motion'],
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
