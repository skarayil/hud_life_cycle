import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    return {
      // 'repo-adi' kısmını GitHub'daki deponun tam adıyla değiştir (örn: /nexus-hud/)
      base: '/skarayil/hud_life_cycle/', 
      define: {
        'process.env.API_KEY' : JSON.stringify('api-key-ignore'),
      },
      server: {
        proxy: {
          '/api-proxy': 'http://localhost:5000',
          '/ws-proxy': {target: 'ws://localhost:5000', ws: true},
        },
      },
      plugins: react(),
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});