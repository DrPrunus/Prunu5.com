import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

// 优先从 .env 文件读取（本地开发），否则从 process.env 读取（Vercel 构建）
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
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
