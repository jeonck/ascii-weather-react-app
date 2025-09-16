import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ascii-weather/',
  server: {
    proxy: {
      '/weather': {
        target: 'https://wttr.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('User-Agent', 'curl');
          });
        },
      },
    },
  },
})
